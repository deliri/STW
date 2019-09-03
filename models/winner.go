package models

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

//Winner contains informationabout winners
type Winner struct {
	Email       string
	Name        string
	PhoneNumber string
	PrizeWon    string
	EmailSent   string
	TimeStamp   int64
}

//Winners Used to store array of winners
type Winners []Winner

var (
	//winPath of File/Database
	winPath = "database/winners/allwinners/all_winners.json"
)

//GetHeader returns headeer to be used in CVS data
func (wn Winners) GetHeader() []string {
	s := []string{
		"S/N",
		"Name",
		"Email Address",
		"Phone Number",
		"Prize Won",
		"Date",
		"Notified",
	}
	return s
}

//GetBody returns body  to be used in CVS data
func (wn Winners) GetBody() [][]string {
	var body [][]string
	winners := LoadWinners()

	for i, val := range winners {
		s := []string{
			fmt.Sprintf("%d", i+1),
			val.Name,
			val.Email,
			val.PhoneNumber,
			val.PrizeWon,
			fmt.Sprintf("%v", time.Unix(val.TimeStamp, 0).Format(time.RFC822)),
			val.EmailSent,
		}

		body = append(body, s)
	}
	return body
}

//SaveWinner used to Winner to a file database
func SaveWinners(prizes *Prizes) bool {
	//Load Winners From Files
	wn := LoadWinners()

	var isMailSent bool //Check If Mail is sent

	for _, val := range *prizes {
		//Extract Winner
		if val.PrizeWon != "NO WIN" {
			w := Winner{
				Email:       val.Email,
				PrizeWon:    val.PrizeWon,
				Name:        val.Name,
				PhoneNumber: val.PhoneNumber,
				TimeStamp:   val.TimeStamp,
			}
			//Send Mail
			isMailSent = SendMail("Congratulations", w.Email, w.Name, w.PrizeWon)

			//Update Email Sent Data
			if isMailSent {
				w.EmailSent = "YES"
			} else {
				w.EmailSent = "NO"
			}

			//Append To Arrya
			wn = append(wn, w)
		}
	}

	//Convert to Byte
	data, err := json.Marshal(wn)

	if err != nil {
		log.Println(err, data)
	}

	//Save back to file
	if saveToFile(winPath, &data) {
		return true
	}

	log.Println("Error Saving Winners")
	return false
}

//LoadWinners Load winners from file
func LoadWinners() Winners {
	//Variable used to Store temporal winner array
	var wn Winners

	//Load Stored Data from File
	data, err := loadFileData(winPath)

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

	return wn //return winners
}

//Validate Winner
func (p Winner) Validate() error {
	return validation.ValidateStruct(&p,
		// Name cannot be empty, and the length must between 2 and 4
		validation.Field(&p.Name, validation.Required, validation.Length(2, 60)),
		//Email field is required and valid
		validation.Field(&p.Email, validation.Required, is.Email),
		// Prize cannot be empty, and the length must between 2 and 200
		validation.Field(&p.PrizeWon, validation.Required, validation.Length(2, 200)),
	)
}
