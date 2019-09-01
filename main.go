package main

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
	"text/template"
	"time"

	"github.com/deliri/STW_0001_GO_Prototype/router"
)

// tpl is a global variable holding all the compiled HTML templates for rendering
var tpl *template.Template

// router is your global router var
var r = router.RegisterRoutes()

// maximizes the number of CPUs avail on the server
func init() {
	runtime.GOMAXPROCS(runtime.NumCPU())
}

// main is where the app starts
func main() {
	// tpl gets all the templates parsed and ready to serve
	tpl = template.Must(template.ParseGlob("html/*.html"))
	addr := ":" + "8080"
	server := http.Server{
		Addr:         addr,
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	url := "www.localhost:8080"
	fmt.Println("now serving at the following location", url)
	log.Fatal(server.ListenAndServe())

}
