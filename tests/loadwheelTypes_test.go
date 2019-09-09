package test

import (
	"stw/models"
	"testing"
)

//TestLoadingWheelTypes test if Saving customer to a file and load caustomers from a file works
func TestLoadingWheelTypes(t *testing.T) {

	models.WheelDataPath = winnerPath

	testData := []struct {
		TestName     string //Name of TEst
		InputData    string //Time Stamp
		ExpectedName string //Expected Email
	}{
		{
			"Test for Taccom",
			"taccom",
			"taccom",
		},
		{
			"Test for Taccom 2",
			"taccom-002",
			"taccom-002",
		},
		{
			"Test for Taccom 3",
			"taccom-003",
			"taccom-003",
		},
	}

	//Laod wheel data from File
	whData := models.LoadWheelTypes()

	for _, td := range testData {
		//Check if Email Key Exist
		if wh, ok := whData[td.InputData]; ok {
			if wh != td.ExpectedName {
				t.Errorf(`"%v": TEST FAILED!!! Expects wheel name to be "%v" but got  "%v"`, td.TestName, td.ExpectedName, wh)
			}
		}
	}
}
