_rawData["custom"] = {
    "_meta" : {
        "wheelId" : 123,
        "company" : "McMasterr-McNally Continental Shipping",
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
    "responsive"   : true,  
    "numSegments"  : 8,     
    "outerRadius"  : 212,   
    "textFontSize" : 28,    
    "segments"     :        
    [
       {"fillStyle" : "#eae56f", "text" : "Headphones 1"}, 
       {"fillStyle" : "#89f26e", "text" : "Pillow Design 2"}, 
       {"fillStyle" : "#7de6ef", "text" : "Pillow Design 3"}, 
       {"fillStyle" : "#e7706f", "text" : "Pillow Design 4"}, 
       {"fillStyle" : "#eae56f", "text" : "Pillow Design 5"}, 
       {"fillStyle" : "#89f26e", "text" : "Pillow Design 6"}, 
       {"fillStyle" : "#7de6ef", "text" : "Prize 7"},
       {"fillStyle" : "#e7706f", "text" : "Prize 8"}
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
        "number" : 16   
    }
};
