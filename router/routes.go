package router

import (
	"github.com/deliri/STW_0001_GO_Prototype/controllers"
	"github.com/go-chi/chi"
)

// RegisterRoutes is where we attach all the routes for the application
// ! It can house both web requests and APIs
func RegisterRoutes() *chi.Mux {
	r := CustomChi()

	r.Route("/", func(r chi.Router) {
		r.NotFound(controllers.NotFoundHandler)

		// csrfKey := []byte(envy.Get("CSRF_KEY", "g4k827b582367a77cb27d1e5dc268912"))

		// if env != "test" {
		// 	r.Use(csrf.Protect(
		// 		csrfKey,
		// 		csrf.Secure(true), // change to true after switching to https
		// 	))
		// }

		// !Web Routes
		// Home page takes you to the login
		r.Get("/", h(controllers.Home))

		// logout redirects to the home page
		// ! implement cookie and session clearance

		// r.Get("/logout",
		// 	h(controllers.Logout))

		// !Admin Routes
		// admin loads admin page
		// r.Get("/admin",
		// 	h(controllers.Admin))

		// !Api Routes
		// r.Get("/api/mir/btswireless/measuresofsuccess",
		// 	h(api.MIRMeasuresOfChange))

		// r.Get("/api/mir/creditops/painpoints",
		// 	h(api.MIRPainPointsCreditOps))

		// r.Get("/api/mir/btswireless/painpoints",
		// 	h(api.MIRPainPointsBTSWireless))

		// r.Get("/api/devices",
		// 	h(api.Devices))

		// Special routes
		// FileUpload
		// r.Post("/fileUpload", h(controllers.UploadFitnessBootCampData))

	})

	return r

}
