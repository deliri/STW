package models

import (
	"encoding/csv"
	"log"
)

type csvModel interface {
	GetHeader() []string
	GetBody() [][]string
}

//ConvertToCSV Converts Model To CSV
func ConvertToCSV(model csvModel, csvWriter *csv.Writer) bool {

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

	return true
}
