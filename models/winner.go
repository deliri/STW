package models

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
)

//Winner contains informationabout winners
type Winner struct {
	Email     string
	Name      string
	Prize     string
	EmailSent string
	TimeStamp int64
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
		"Prize",
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
			val.Prize,
			fmt.Sprintf("%v", time.Unix(val.TimeStamp, 0).Format(time.RFC822)),
			val.EmailSent,
		}

		body = append(body, s)
	}
	return body
}

//SaveWinner used to Winner to a file database
func SaveWinner(winner *Winner) bool {
	wn := LoadWinners()
	//Add Time Stamp
	winner.TimeStamp = time.Now().Unix()
	//Append Winer to be stored
	wn = append(wn, *winner)
	//Convert to Byte
	data, err := json.Marshal(wn)

	if err != nil {
		log.Println(err, data)
	}
	//Try Sending mail
	isMailSent := SendMail("Congratulations", winner.Email, winner.Name, winner.Prize)
	//Update Email Sent Data
	if isMailSent {
		winner.EmailSent = "YES"
	} else {
		winner.EmailSent = "NO"
	}
	//Save back to file
	if saveToFile(winPath, &data) {
		return true
	}
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

	return wn
}
