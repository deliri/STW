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
	var prizes models.Prizes
	//Get Data From Form
	data := r.PostFormValue("winners")

	if data != "" {
		err := json.Unmarshal([]byte(data), &prizes)
		if err != nil {
			log.Println("Error Getting Prize Data: ", err.Error())
			fmt.Fprintf(w, "Error Saving Prize")
			return fmt.Errorf("Error Saving Prize")
		}

		//Save Prizes
		if !models.SavePrizes(&prizes) { //Check for validation Error
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error Saving Prize")
			fmt.Fprintf(w, "Error Saving Prize")
			return fmt.Errorf("Error Saving Prize")
		}

		//Save Winners
		if !models.SaveWinners(&prizes) {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error Saving Winners")
			fmt.Fprintf(w, "Error Saving Winners")
			return fmt.Errorf("Error Saving Winners")
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Data Was Saved Successfully")
		return nil
	}
	w.WriteHeader(http.StatusForbidden)
	fmt.Fprintf(w, "No Data Was Submitted!")
	return nil
}
