package test

import (
	"stw/models"
	"testing"
)

//TestSaveAndLoadCustomer test if Saving customer to a file and load caustomers from a file works
//go test -v -run TestSaveAndLoadCustomer ./tests
func TestSaveAndLoadCustomer(t *testing.T) {

	models.CustomerPath = customerPath

	testData := []struct {
		TestName      string //Name of TEst
		InputData     string //Input Email used as key
		ExpectedEmail string //Expected Email
	}{
		{
			"Test Email Key " + testWin1.Email,
			testWin1.Email,
			testWin1.Email,
		},
		{
			"Test Email Key " + testWin2.Email,
			testWin2.Email,
			testWin2.Email,
		},
		{
			"Test Email Key " + testWin2.Email,
			testWin3.Email,
			testWin3.Email,
		},
	}

	//Try Saving Customer to Path
	if !models.SaveCustomers(&testWinners) {
		t.Fatalf(`Error: Error Saving Customer to file path "%s"`, customerPath)
	}

	//Laod Customers from File
	customers := models.LoadCustomers()

	for _, td := range testData {
		//Check if Email Key Exist
		if cs, ok := customers[td.InputData]; ok {
			if cs.Email != td.ExpectedEmail {
				t.Errorf(`"%v": TEST FAILED!!! Expects Email to be "%v" but got  "%v"`, td.TestName, td.ExpectedEmail, cs.Email)
			}
		}
	}
}
