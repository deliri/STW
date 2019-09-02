package controllers

import (
	"net/http"
	"stw/models"
)

//DownloadPrizes downloads prizes in form of CSV
func DownloadPrizes(w http.ResponseWriter, r *http.Request) error {
	var pr models.Prizes
	//File name of downloaded File
	filename := "prizes.csv"

	models.ConvertToCSV(pr, w, filename)

	return nil
}

//DownloadWinners dowloads winners in form of CSV
func DownloadWinners(w http.ResponseWriter, r *http.Request) error {
	var wn models.Winners
	//File Name of Downloaded File
	filename := "winners.csv"

	models.ConvertToCSV(wn, w, filename)

	return nil
}
