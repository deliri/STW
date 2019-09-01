package router

import (
	"net/http"
	"time"

	"github.com/deliri/STW_0001_GO_Prototype/controllers"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

// CustomChi is a configuration for Chi router with some nice defaults
func CustomChi() *chi.Mux {
	r := chi.NewRouter()

	// Middlewares
	r.Use(MethodOverride)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.RedirectSlashes)
	r.Use(Recoverer)
	r.Use(WebLogger)
	r.Use(middleware.DefaultCompress)
	r.Use(middleware.Timeout(60 * time.Second))

	// Base
	r.NotFound(controllers.NotFoundHandler)
	// Serving assets with GET requests
	r.Get("/assets/*", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Vary", "Accept-Encoding")
		w.Header().Set("Cache-Control", "public, max-age=604800")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		fs := http.StripPrefix("/assets",
			http.FileServer(http.Dir("assets")))

		fs.ServeHTTP(w, r)
	})
	// serving single for search engine crawlers robots.txt files
	serveSingle(r, "/robots.txt", "assets/robots.txt")
	// serving single requests for favicon.ico file
	serveSingle(r, "/favicon.ico", "assets/favicon.ico")
	// return the chi router pre-configred with all the goodies set up and attached
	return r
}

// h is just a convienvence helper function to clean up presentations for controllers
// in routes
func h(fn controllers.Handler) http.HandlerFunc {
	return controllers.Handler(fn).ServeHTTP
}

// serveSingle is to serve one off requests for favicons or robots.txt
func serveSingle(mux *chi.Mux, pattern, filename string) {
	mux.Get(pattern, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	})
}
