package models

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

//Customer contains informationabout Customers
type Customer struct {
	Email       string
	Name        string
	PhoneNumber string
	TimeStamp   int64
}

//Customers Used to store array of Customers
type Customers map[string]Customer

var (
	//winPath of File/Database
	winPath = "database/customer/customers.json"
)

//GetHeader returns headeer to be used in CVS data
func (cs Customers) GetHeader() []string {
	s := []string{
		"S/N",
		"Name",
		"Email Address",
		"Phone Number",
		"Date",
	}
	return s
}

//GetBody returns body  to be used in CVS data
func (cs Customers) GetBody() [][]string {
	var body [][]string
	Customers := LoadCustomers()
	i := 1
	for _, val := range Customers {
		s := []string{
			fmt.Sprintf("%d", i),
			val.Name,
			val.Email,
			val.PhoneNumber,
			fmt.Sprintf("%v", time.Unix(val.TimeStamp, 0).Format(time.RFC822)),
		}
		i++
		body = append(body, s)
	}
	return body
}

//SaveCustomers used to Customer to a file database
func SaveCustomers(customers *[]Winner) bool {
	//Load Customers From Files
	cs := LoadCustomers()

	for _, val := range *customers {
		c := Customer{
			Email:       val.Email,
			Name:        val.Name,
			PhoneNumber: val.PhoneNumber,
			TimeStamp:   val.TimeStamp,
		}
		cs[val.Email] = c
		//Append To Arrya
		// wn = append(wn, w)
	}

	//Convert to Byte
	data, err := json.Marshal(cs)

	if err != nil {
		log.Println(err, data)
	}

	//Save back to file
	if saveToFile(winPath, &data) {
		return true
	}

	log.Println("Error Saving Customers")
	return false
}

//LoadCustomers Load Customers from file
func LoadCustomers() Customers {
	//Variable used to Store temporal Customer array
	cs := make(Customers)

	//Load Stored Data from File
	data, err := loadFileData(winPath)

	if err != nil {
		log.Println(err)
	}

	if len(data) > 0 {
		//Unmarshal Data to array of structs
		err = json.Unmarshal(data, &cs)
		if err != nil {
			log.Println("Error unmarshalling Customer: ", data, err)
		}
	}

	return cs //return Customers
}

//Validate Customer
func (p Customer) Validate() error {
	return validation.ValidateStruct(&p,
		// Name cannot be empty, and the length must between 2 and 4
		validation.Field(&p.Name, validation.Required, validation.Length(2, 60)),
		//Email field is required and valid
		validation.Field(&p.Email, validation.Required, is.Email),
	)
}
