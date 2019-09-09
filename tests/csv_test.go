package test

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"strings"
	"stw/models"
	"testing"
)

//TestCSVFormatCoversion Test converting Data to CSV
func TestCSVFormatCoversion(t *testing.T) {
	stringWriter := new(bytes.Buffer)
	//Declare New Writter
	csvWriter := csv.NewWriter(stringWriter)
	//Intantiate CSV Model
	csvModel := testCsvModel{
		Header: "Header",
		Body:   "Body",
	}

	//Try Converting
	if !models.ConvertToCSV(csvModel, csvWriter) {
		t.Errorf("Error Converting File to CSV format")
	}

	csvWriter.Flush()
	//Covert Byets to string
	stringVal := stringWriter.String()

	fmt.Println(stringVal)

	expectedString := "1,Body 1\n2,Body 2\n3,Body 3"

	//Test for expected string
	if !strings.Contains(stringVal, expectedString) {
		t.Errorf(`"CSV Format ": TEST FAILED!!! Expects coverted string to contain "%v" but got  "%s"`, expectedString, stringVal)
	}

}
