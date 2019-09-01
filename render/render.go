package render

import (
	"net/http"

	"github.com/unrolled/render"
)

// RR takes templates and sets appropriate headers/content type and renders them with buffers
// RR stands render response
var RR = render.New(render.Options{
	Directory:                 "html",
	Extensions:                []string{".html", ".tmpl"},
	Charset:                   "UTF-8",
	DisableCharset:            false,
	IndentJSON:                true,
	IndentXML:                 false,
	PrefixJSON:                []byte(""),
	PrefixXML:                 []byte(""),
	BinaryContentType:         "application/octet-stream",
	HTMLContentType:           "text/html",
	JSONContentType:           "application/json",
	JSONPContentType:          "application/javascript",
	TextContentType:           "text/plain",
	XMLContentType:            "application/xhtml+xml",
	IsDevelopment:             false,
	UnEscapeHTML:              false,
	StreamingJSON:             false,
	RequirePartials:           false,
	DisableHTTPErrorRendering: false,
})

// Push the given resource to the client.
func Push(w http.ResponseWriter, resource string) {
	Pusher, ok := w.(http.Pusher)
	if ok {
		if err := Pusher.Push(resource, nil); err == nil {
			return
		}
	}
}
