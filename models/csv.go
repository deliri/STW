package models

import (
	"encoding/csv"
	"log"
	"net/http"
)

type csvModel interface {
	GetHeader() []string
	GetBody() [][]string
}

//ConvertToCSV Converts Model To CSV
func ConvertToCSV(model csvModel, w http.ResponseWriter, filename string) bool {
	//Declare New Writter
	csvWriter := csv.NewWriter(w)

	err := csvWriter.Write(model.GetHeader())

	if err != nil {
		log.Println("Error Writing CVS header: ", err)
	}

	body := model.GetBody()

	for _, record := range body {
		if err := csvWriter.Write(record); err != nil {
			log.Fatalln("error writing record to csv:", err)
			return false
		}
	}

	w.Header().Set("Content-Disposition", "attachment; filename="+filename)
	w.Header().Set("Content-Type", "text/csv")

	csvWriter.Flush()

	return true
}
