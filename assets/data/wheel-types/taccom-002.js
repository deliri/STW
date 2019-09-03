//This is a custome wheel config, you are freee to change as desired
_rawData["taccom-002"] = {
    "_meta" : {
        "wheelId" : "Taccom-002",
        "company" : "Taccom",
        "requireFormToSpin" : true, 
        "maxSpinsPerUser" : 3, 
        "prizeCountdownTimer" : 20000, // duration, in ms, before a prize is auto-picked for the user  
        "arrayOfWinners" : [],
        "admins" : [{
            "name" : "Harold Palmer", 
            "email" : "harry-pal@yahuu.com",
            "phone" : "(657)-280-1027"
        }, {
            "name" : "Josephine Snickett",
            "email" : "hearts-37@emzen.com", 
            "phone" : "(243)-129-0890"
        }],
        "location" : "65 Belfort Blvd.",
        "notes" : "Jenny is in charge on the premises. If she is unavailable, ask for Carl instead, room 409 on the 8th floor of the Prescott building."
    }, 
    "responsive"        : true,  
    "numSegments"       : 8,         // Specify number of segments.
    "outerRadius"       : 420,       // Set outer radius so wheel fits inside the background.
    "drawMode"          : "image",   // drawMode must be set to image.
    "drawText"          : false,      // Need to set this true if want code-drawn text on image wheels.
    "textFontSize"      : 12,        // Set text options as desired.
    "textOrientation"   : "curved",
    "textDirection"     : "reversed",
    "textAlignment"     : "outer",
    "textMargin"        : 5,
    "textFontFamily"    : "monospace",
    "textStrokeStyle"   : "black",
    "textLineWidth"     : 2,
    "textFillStyle"     : "white",
    "segments"     :                // Define segments :: THEY MUST BE IN THE SAME ORDER AS THEY APPEAR ON THE WHEEL, CLOCKWISE 
    [
       {"text" : "2x Big Prize Draw" ,  "odds" : 1 ,    "quantity" : 3   ,    "lose": false ,    "timesWon" : 0 ,    },
       {"text" : "50-inch TV" ,         "odds" : 2 ,    "quantity" : 0   ,    "lose": false ,    "timesWon" : 0 ,    },
       {"text" : "NO WIN" ,             "odds" : 15 ,   "quantity" : 3   ,    "lose": true  ,    "timesWon" : 0 ,   },
       {"text" : "BBQ Prize" ,          "odds" : 5 ,    "quantity" : 3   ,    "lose": false ,    "timesWon" : 0 ,    },
       {"text" : "2x Gun Contest" ,     "odds" : 2 ,    "quantity" : 3   ,    "lose": false ,    "timesWon" : 0 ,    },
       {"text" : "Small Prize" ,        "odds" : 55 ,   "quantity" : 30  ,    "lose": false ,    "timesWon" : 0 ,    },
       {"text" : "NO WIN" ,             "odds" : 15 ,   "quantity" : 3   ,    "lose": true  ,    "timesWon" : 0 ,   },
       {"text" : "XBOX Prize" ,         "odds" : 5 ,    "quantity" : 0   ,    "lose": false ,    "timesWon" : 0 ,    },
    ],
    "animation" :           
    {
        "type"     : "spinToStop",
        "duration" : 5,
        "spins"    : 8,
        "callbackFinished" : alertPrize,
        "callbackSound"    : playSound,   
        "soundTrigger"     : "pin"        
    },
    "pins" :
    {
        "responsive" : true, 
        "number" : 32,   
        "outerRadius": 5,
        "strokeStyle": "rgba(0,0,0,0)",
        "fillStyle": "rgba(44,44,44,0.9)",
    }
}

