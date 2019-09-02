package models

import (
	"bufio"
	"log"
	"os"
)

//Save Data To File
func saveToFile(path string, data *[]byte) bool {
	// Open file for writing
	file, err := os.OpenFile(path, os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
		return false
	}
	defer file.Close()

	// Create a buffered writer from the file
	bufferedWriter := bufio.NewWriter(file)

	// Write bytes to buffer
	_, err = bufferedWriter.Write(*data)

	if err != nil {
		log.Fatal(err)
		return false
	}

	err = bufferedWriter.Flush()
	if err != nil {
		log.Fatal(err)
		return false
	}

	return true
}

//Load Data From File
func loadFileData(path string) ([]byte, error) {

	//Open File
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	byteSlice := make([]byte, fileInfo.Size())
	bytesRead, err := file.Read(byteSlice)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	log.Printf("Number of bytes read: %d\n", bytesRead)
	log.Printf("Data read: %s\n", byteSlice)

	return byteSlice, nil
}
