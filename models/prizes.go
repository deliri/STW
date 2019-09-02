package models

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
)

//Prize is details of the User and Prize
type Prize struct {
	Name        string
	Email       string
	PhoneNumber string
	Prize       string
	TimeStamp   int64
}

//Prizes is slices/arrays of Price Struct
type Prizes []Prize

var (
	//prizePath of File/Database
	prizePath = "database/prizes/prizes.json"
)

//GetHeader returns headeer to be used in CVS data
func (p Prizes) GetHeader() []string {
	s := []string{
		"S/N",
		"Name",
		"Email Address",
		"Phone Number",
		"Prize",
		"Date",
	}
	return s
}

//GetBody return headeer to be used in CVS data
func (p Prizes) GetBody() [][]string {
	var body [][]string
	prizes := LoadPrizes()

	for i, val := range prizes {
		s := []string{
			fmt.Sprintf("%d", i+1),
			val.Name,
			val.Email,
			val.PhoneNumber,
			val.Prize,
			fmt.Sprintf("%v", time.Unix(val.TimeStamp, 0).Format(time.RFC822)),
		}

		body = append(body, s)
	}
	return body
}

//SavePrize used to Prize to a file database
func SavePrize(prize *Prize) bool {
	//Load Stored Data
	pr := LoadPrizes()

	//Add Time Stamp
	prize.TimeStamp = time.Now().Unix()
	//Append Prize to be stored
	pr = append(pr, *prize)
	//Convert to Byte
	data, err := json.Marshal(&pr)

	if err != nil {
		log.Println(err)
	}
	//Save back to file
	if saveToFile(prizePath, &data) {
		return true
	}
	return false
}

//LoadPrizes Load winners from file
func LoadPrizes() Prizes {
	//Variable used to Store temporal winner array
	var pr Prizes

	//Load Stored Data from File
	data, err := loadFileData(prizePath)

	if err != nil {
		log.Println(err)
	}

	if len(data) > 0 {
		//Unmarshal Data to array of structs
		err = json.Unmarshal(data, &pr)
		if err != nil {
			log.Println("Error unmarshalling winner: ", data, err)
		}
	}

	return pr
}
