package api

import "net/http"

// Devices returns the pain points for btswireless
func Devices(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	devices := `[{
        "9": "Samsung",
        "48": "Apple",
        "62": "ZTE",
        "107": "Google"
    },
    [
        [48, 8573, "iPhone 8", "A1863 A1905 A1906 iphone 10,4 iphone10,4 iphone8 iphoe", "apple-iphone-8-new.jpg"],
        [9, 9177, "Galaxy S9", "sgs9a SM-G893 SMG 889", "samsung-galaxy-s9-.jpg"],
        [107, 8720, "Pixel 2 XL", "Pixel XL2 pixel2 xl", "google-pixel-xl2-.jpg"],
        [62, 9610, "MF279T Rocket Hub", "zte mf279 hub", "zte-mf279.jpg"]
    ]
]`

	w.Write([]byte(devices))
	return nil
}
