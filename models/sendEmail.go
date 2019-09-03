package models

import (
	"fmt"
	"log"

	"gopkg.in/gomail.v2"
)

var (
	//SMTP Config Data
	smtpConfig = struct {
		//SMTP Server
		server string
		//Port
		port int
		//User Name
		username string
		password string
		//Password
	}{
		server:   "smtp.gmail.com",
		port:     465,
		username: "adelirigoapps@gmail.com",
		password: "C1nk1n3rs!",
	}
	//adminEmail Copy Admin
	fromEmail  = "info@stw.com"            //From header in Email
	adminEmail = "adelirigoapps@gmail.com" //Admin Email to be Copied blindling
	adminName  = "STW Admin"               //Admin NAme to be used
)

//SendMail Sends Mail to  if there is internet connection
func SendMail(subject string, to string, name string, price string) bool {
	log.Println("Trying to Send Mail....")
	//Use Gomail Package
	m := gomail.NewMessage()
	m.SetHeader("From", fromEmail)
	m.SetHeader("To", to)
	m.SetAddressHeader("BCc", adminEmail, adminName)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", fmt.Sprintf(WinnerMailTPL, name, price))

	d := gomail.NewDialer(smtpConfig.server, smtpConfig.port, smtpConfig.username, smtpConfig.password)

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(m); err != nil {
		log.Println("Error Sending Mail: ", err)
		return false
	}
	return true
}

//WinnerMailTPL is a Mail Template For Winners
const WinnerMailTPL = `

Dear %s,

<h5>Congratulatons!!!</h5>

<p>You have won "%s" on our STW Spin and Win Promo!</p>

<p>Please contact us for details on how to redeem your prize.</p>

<br>
<br>
STW Team

`
