package controllers

import (
	"log"
	"net/http"

	"stw/render"
)

// Error is used to convey problems during the rendering of any pages.
type Error interface {
	error
	Status() int
}

// StatusError gives you a code and the error in string form
type StatusError struct {
	Code int
	Err  error
}

func (se StatusError) Error() string {
	return se.Err.Error()
}

func (se StatusError) Status() int {
	return se.Code
}

type Handler func(w http.ResponseWriter, r *http.Request) error

func (h Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if err := h(w, r); err != nil {
		switch e := err.(type) {
		case StatusError:
			log.Printf("HTTP %d - %+v\n", e.Status(), e.Err)
			// v := views.New(r)
			// v.RenderError(w, e.Status())
		default:
			log.Printf("%+v\n", err)
			// v := views.New(r)
			// v.RenderError(w, http.StatusInternalServerError)
		}
	}
}

func ErrorHandler(w http.ResponseWriter, r *http.Request) {
	// v := views.New(r)
	// v.RenderError(w, http.StatusInternalServerError)
}

// NotFoundHandler takes care of any of the 404 pages when a user requests a resource that doesn't
// exist.
func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	// Push sends the assets through faster if HTTP/2 is detected
	render.Push(w, "/assets/**/*.css")
	render.Push(w, "/assets/**/*.js")
	// data is what we can send with the page.
	data := map[string]string{"headerTitle": "Spark | Error"}
	render.RR.HTML(w, http.StatusOK, "404.min", data)
}
