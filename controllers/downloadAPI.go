package controllers

import (
	"net/http"
	"stw/models"
)

//DownloadPrizes downloads prizes in form of CSV
func DownloadPrizes(w http.ResponseWriter, r *http.Request) error {
	var cs models.Customers
	//File name of downloaded File
	filename := "customers_list.csv"

	models.ConvertToCSV(cs, w, filename)

	return nil
}

//DownloadWinners dowloads winners in form of CSV
func DownloadWinners(w http.ResponseWriter, r *http.Request) error {
	var wn models.Winners
	//File Name of Downloaded File
	filename := "winners_list.csv"

	models.ConvertToCSV(wn, w, filename)

	return nil
}
