package controllers

import (
	"net/http"

	"github.com/deliri/STW_0001_GO_Prototype/render"
)

// Home loads the login page to sign up or login
func Home(w http.ResponseWriter, r *http.Request) error {
	// Push sends the assets through faster if HTTP/2 is detected
	render.Push(w, "/assets/**/*.css")
	render.Push(w, "/assets/**/*.js")
	// data is what we can send with the page.
	data := map[string]string{"headerTitle": "Spin To Win"}
	render.RR.HTML(w, http.StatusOK, "taccom", data)
	return nil
}
