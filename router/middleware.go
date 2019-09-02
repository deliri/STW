package router

import (
	"log"
	"net/http"
	"runtime/debug"
	"strings"
	"time"

	"stw/controllers"
	logg "github.com/sirupsen/logrus"
)

// MethodOverride is used to ensure the post method is corrected set up for deletes
func MethodOverride(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			override := r.FormValue("_method")
			if override != "" {
				r.Method = strings.ToUpper(override)
				r.Form.Del("_method")
				r.PostForm.Del("_method")
			}
		}
		next.ServeHTTP(w, r)
	})
}

//Recoverer is used to recover from bad requests
func Recoverer(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rvr := recover(); rvr != nil {
				log.Println(rvr)
				log.Println(string(debug.Stack()))
				controllers.ErrorHandler(w, r)
			}
		}()
		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

// WebLogger traces the requests and logs the output
func WebLogger(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		// next(w, r)
		// res := rw.(negroni.ResponseWriter)
		defer func() {
			elapsed := time.Since(start)
			logg.WithFields(logg.Fields{
				"elapsed": elapsed,
				"method":  r.Method,
				"host":    r.URL.Host,
				"path":    r.URL.Path,
				"query":   r.URL.RawQuery,
			}).Info(r.Method + " " + r.URL.Path)
		}()
		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}
