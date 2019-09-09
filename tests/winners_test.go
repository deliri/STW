package test

import (
	"stw/models"
	"testing"
)

//TestSaveAndLoadCustomer test if Saving customer to a file and load caustomers from a file works
func TestSaveAndLoadWinners(t *testing.T) {

	models.WinnersPath = winnerPath

	testData := []struct {
		TestName      string //Name of TEst
		InputData     int64  //Time Stamp
		ExpectedEmail string //Expected Email
	}{
		{
			"Test Email Key " + testWin1.Email,
			testWin1.TimeStamp,
			testWin1.Email,
		},
		{
			"Test Email Key " + testWin2.Email,
			testWin2.TimeStamp,
			testWin2.Email,
		},
		{
			"Test Email Key " + testWin2.Email,
			testWin3.TimeStamp,
			testWin3.Email,
		},
	}

	//Try Saving Winners to Path
	if !models.SaveWinners(&testWinners) {
		t.Fatalf(`Error: Error Saving Winners to file path "%s"`, winnerPath)
	}

	//Laod Winners from File
	winners := models.LoadWinners()

	for _, td := range testData {
		//Check if Email Key Exist
		if wn, ok := winners[td.InputData]; ok {
			if wn.Email != td.ExpectedEmail {
				t.Errorf(`"%v": TEST FAILED!!! Expects Email to be "%v" but got  "%v"`, td.TestName, td.ExpectedEmail, wn.Email)
			}
			//Check if Email sent is marked correctly
			if wn.PrizeWon != "NO WIN" && wn.EmailSent != "YES" {
				t.Errorf(`"Email Sent": TEST FAILED!!! Expects Email Sent when no price won to be "%v" but got "%v"`, "Yes", wn.EmailSent)
			}
		}
	}
}
