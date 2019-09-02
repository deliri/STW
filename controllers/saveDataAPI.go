package controllers

import (
	"fmt"
	"net/http"
	"stw/models"
)

// SaveWinner Prizes
func SaveWinner(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		wn := &models.Winner{
			Email: r.PostFormValue("email"),
			Name:  r.PostFormValue("fullname"),
			Prize: r.PostFormValue("prize"),
		}
		//Validate Data
		err := wn.Validate()
		if err != nil { //Check for validation Error
			w.WriteHeader(http.StatusUnprocessableEntity)
			fmt.Fprintf(w, "%s", err.Error())
			return err
		}

		if models.SaveWinner(wn) { //Check for validation Error
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "%s", "Error Saving Winner")
			return err
		}

	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "%s", "Invalid Request")

	}
	return nil
}

// SavePrize Winners
func SavePrize(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		pr := &models.Prize{
			Email:       r.PostFormValue("email"),
			Name:        r.PostFormValue("fullname"),
			PhoneNumber: r.PostFormValue("phone_number"),
			Prize:       r.PostFormValue("prize"),
		}
		//Validate Data
		err := pr.Validate()
		if err != nil { //Check for validation Error
			w.WriteHeader(http.StatusUnprocessableEntity)
			fmt.Fprintf(w, "%s", err.Error())
			return err
		}

		if !models.SavePrize(pr) { //Check for validation Error
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "%s", "Error Saving Prize")
			return err
		}

	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "%s", "Invalid Request")
	}
	return nil
}
