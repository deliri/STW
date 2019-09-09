package test

import (
	"fmt"
	"stw/models"
)

var (
	//Customer file data path
	customerPath = "testsDatabase/customers.json"
	//Winner Path
	winnerPath = "testsDatabase/winners.json"
	// Wheel File path
	wheelFilePath = "testAssets/"
	//Test Winner 1
	testWin1 = models.Winner{
		Name:        "John Doe",
		Email:       "jd@gm.com",
		PhoneNumber: "080222222",
		WheelID:     "wheel-1",
		NumberSpins: 2,
		PrizeWon:    "LED TV",
		TimeStamp:   1568039468, //Test Time Stamp
	}
	//Test Winner 2
	testWin2 = models.Winner{
		Name:        "Jane Dow",
		Email:       "jane@gm.com",
		PhoneNumber: "080333333",
		WheelID:     "wheel-1",
		NumberSpins: 2,
		PrizeWon:    "iPhone 6",
		TimeStamp:   1568039668, //Test Time Stamp
	}
	//Test Winner 3
	testWin3 = models.Winner{
		Name:        "Luke Shaw",
		Email:       "luke@gm.com",
		PhoneNumber: "080444444",
		WheelID:     "wheel-1",
		NumberSpins: 2,
		PrizeWon:    "No Win",
		TimeStamp:   1568039768, //Test Time Stamp
	}
	//Test Winners, slice of winners
	testWinners = []models.Winner{testWin1, testWin2, testWin3}
)

//Mock Model to test CSV conversion
type testCsvModel struct {
	Header string
	Body   string
}

//GetHeader returns CSV Model Header
func (t testCsvModel) GetHeader() []string {
	return []string{
		"S/N",
		t.Header,
	}
}

//GetBody returns CSV Model Body
func (t testCsvModel) GetBody() [][]string {
	var body [][]string

	for i := 1; i <= 3; i++ {
		b := []string{
			fmt.Sprintf("%d", i),
			fmt.Sprintf("%s %d", t.Body, i),
		}
		body = append(body, b)
	}
	return body
}
