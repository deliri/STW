package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"stw/models"
)

// SavePrize Winners
func SavePrize(w http.ResponseWriter, r *http.Request) error {
	//Prize Array
	var winners []models.Winner
	//Get Data From Form
	data := r.PostFormValue("winners")

	if data != "" {
		err := json.Unmarshal([]byte(data), &winners)
		//Error Getting Submited Data
		if err != nil {
			log.Println("Error Getting Winners Data: ", err.Error())
			fmt.Fprintf(w, "Error Saving Winners")
			return fmt.Errorf("Error Saving Winners")
		}

		//Save Prizes
		if !models.SaveCustomers(&winners) { //Check for validation Error
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error Saving Customers")
			fmt.Fprintf(w, "Error Saving Customers")
			return fmt.Errorf("Error Saving Customers")
		}

		//Save Winners
		if !models.SaveWinners(&winners) {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error Saving Winners")
			fmt.Fprintf(w, "Error Saving Winners")
			return fmt.Errorf("Error Saving Winners")
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Congratulations!!! Your data was received.")
		return nil
	}
	w.WriteHeader(http.StatusForbidden)
	fmt.Fprintf(w, "No Data Was Submitted!")
	return nil
}
