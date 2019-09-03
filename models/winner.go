package models

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

//Winner is details of the User and Prize
type Winner struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone"`
	WheelID     string `json:"wheelId"`
	NumberSpins int    `json:"numSpins"`
	PrizeWon    string `json:"prizeWon"`
	EmailSent   string
	TimeStamp   int64 `json:"timestamp"`
}

//Winners is map of timestamp and Winner Struct
type Winners map[int64]Winner

var (
	//prizePath of File/Database
	prizePath = "database/winners/winners.json"
)

//GetHeader returns header to be used in CVS data
func (wn Winners) GetHeader() []string {
	s := []string{
		"S/N",
		"Name",
		"Email Address",
		"Phone Number",
		"Prize Won",
		"Wheel ID",
		"Number of Spins",
		"Date",
		"Notified",
	}
	return s
}

//GetBody return headeer to be used in CVS data
func (wn Winners) GetBody() [][]string {
	var body [][]string
	Winners := LoadWinners()
	i := 1
	for _, val := range Winners {
		s := []string{
			fmt.Sprintf("%d", i),
			val.Name,
			val.Email,
			val.PhoneNumber,
			val.PrizeWon,
			val.WheelID,
			fmt.Sprintf("%d", val.NumberSpins),
			fmt.Sprintf("%v", time.Unix(val.TimeStamp, 0).Format(time.RFC822)),
			val.EmailSent,
		}
		i++
		body = append(body, s)
	}
	return body
}

//SaveWinners used to Prize to a file database
func SaveWinners(winners *[]Winner) bool {
	//Load Stored Data
	wn := LoadWinners()

	//Append Prize to be stored
	// pr = append(cs, *Winners...)
	var isMailSent bool //Check If Mail is sent

	for _, val := range *winners {
		//check if map key exist
		if _, ok := wn[val.TimeStamp]; !ok {
			//Send Mail if prize is won
			if val.PrizeWon != "NO WIN" {
				isMailSent = SendMail("Congratulations", val.Email, val.Name, val.PrizeWon)
				//Update Email Sent Data
				if isMailSent {
					val.EmailSent = "YES" //Email Sent
				} else {
					val.EmailSent = "NO" //Email Failed
				}
			} else {
				val.EmailSent = "NO" //No prize won
			}
			//Update map
			wn[val.TimeStamp] = val
		}
	}
	//Convert to Byte
	data, err := json.Marshal(&wn)

	if err != nil {
		log.Println(err)
	}
	//Save back to file
	if saveToFile(prizePath, &data) {
		return true
	}
	return false
}

//LoadWinners Load winners from file
func LoadWinners() Winners {
	//Variable used to Store temporal winner array
	wn := make(Winners)

	//Load Stored Data from File
	data, err := loadFileData(prizePath)

	if err != nil {
		log.Println(err)
	}

	if len(data) > 0 {
		//Unmarshal Data to array of structs
		err = json.Unmarshal(data, &wn)
		if err != nil {
			log.Println("Error unmarshalling winner: ", data, err)
		}
	}

	return wn
}

//Validate Prize
func (wn Winner) Validate() error {
	return validation.ValidateStruct(&wn,
		// Name cannot be empty, and the length must between 2 and 4
		validation.Field(&wn.Name, validation.Required, validation.Length(2, 60)),
		//Email field is required and valid
		validation.Field(&wn.Email, validation.Required, is.Email),
		// Phone Number cannot be empty, and the length must between 2 and 4
		validation.Field(&wn.PhoneNumber, validation.Required, validation.Length(2, 40)),
		// Phone Number cannot be empty, and the length must between 2 and 200
		validation.Field(&wn.PrizeWon, validation.Length(2, 200)),
		// Wheel ID cannot be empty, and the length must between 2 and 200
		validation.Field(&wn.WheelID, validation.Length(2, 200)),
	)
}
