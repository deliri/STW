package controllers

import (
	"fmt"
	"net/http"
	"stw/models"
)

// SaveWinner Prizes
func SaveWinner(w http.ResponseWriter, r *http.Request) error {
	wn := &models.Winner{
		Email:     "mm@gm.com",
		Name:      "Arinze",
		EmailSent: "NO",
		Prize:     "Motor",
	}

	fmt.Println(models.SaveWinner(wn))

	return nil
}

// SavePrize Winners
func SavePrize(w http.ResponseWriter, r *http.Request) error {
	pr := &models.Prize{
		Email:       "mm@gm.com",
		Name:        "Arinze",
		PhoneNumber: "080233333333",
		Prize:       "Nothing",
	}

	fmt.Println(models.SavePrize(pr))
	return nil
}
