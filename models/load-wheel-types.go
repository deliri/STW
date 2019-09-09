package models

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

var (
	WheelDataPath = "assets/data/wheel-types/"
)

//LoadWheelTypes loads Wheel JS Data Files to be displayed in front
func LoadWheelTypes() map[string]string {
	//wheel data
	whData := make(map[string]string)
	//Get Files List from folder
	files, err := ioutil.ReadDir(WheelDataPath)
	if err != nil {
		log.Println(err)
		return whData
	}

	//List all The File names
	for _, f := range files {
		fmt.Println("Wheel: ", f.Name())
		if !f.IsDir() {
			names := strings.Split(f.Name(), ".")
			fmt.Println("Wheel: ", whData, names)
			if names[0] != "" {
				whData[fmt.Sprint(names[0])] = f.Name()
			}
		}
	}
	fmt.Println("Wheel: ", whData)
	return whData
}
