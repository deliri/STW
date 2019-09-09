package controllers

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"stw/models"
)

//DownloadPrizes downloads prizes in form of CSV
func DownloadPrizes(w http.ResponseWriter, r *http.Request) error {
	var cs models.Customers
	//File name of downloaded File
	filename := "customers_list.csv"

	//Declare New Writter
	csvWriter := csv.NewWriter(w)

	//Write CSV File
	if !models.ConvertToCSV(cs, csvWriter) {
		return fmt.Errorf("Error Converting customers to CSV format")
	}

	// Add Download Headers
	w.Header().Set("Content-Disposition", "attachment; filename="+filename)
	w.Header().Set("Content-Type", "text/csv")

	// Flush To Response writter
	csvWriter.Flush()

	return nil
}

//DownloadWinners dowloads winners in form of CSV
func DownloadWinners(w http.ResponseWriter, r *http.Request) error {
	var wn models.Winners
	//Declare New Writter
	csvWriter := csv.NewWriter(w)
	//filename
	filename := "winners_list.csv"

	//Write CSV File
	if !models.ConvertToCSV(wn, csvWriter) {
		return fmt.Errorf("Error Converting winners to CSV format")
	}

	// Add Download Headers
	w.Header().Set("Content-Disposition", "attachment; filename="+filename)
	w.Header().Set("Content-Type", "text/csv")

	// Flush To Response writter
	csvWriter.Flush()

	return nil
}
