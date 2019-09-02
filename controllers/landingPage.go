package controllers

import (
	"net/http"
	"stw/models"
	"stw/render"
)

// Home loads the login page to sign up or login
func Home(w http.ResponseWriter, r *http.Request) error {
	// Push sends the assets through faster if HTTP/2 is detected
	render.Push(w, "/assets/**/*.css")
	render.Push(w, "/assets/**/*.js")
	// data is what we can send with the page.
	// data := map[string]string{"headerTitle": "Spin To Win"}

	//Construct Data
	data := &struct {
		HeaderTitle    string
		WheelDataFiles map[string]string
	}{
		HeaderTitle:    "Spin To Win",           //Title
		WheelDataFiles: models.LoadWheelTypes(), //Map of AVaialble Wheel Types
	}

	render.RR.HTML(w, http.StatusOK, "taccom", data)
	return nil
}
