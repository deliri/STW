_rawData["basic"] = {
    "numSegments"  : 8,    
    "outerRadius"  : 212,  
    "textFontSize" : 28,   
    "segments"     :       
    [
        {"fillStyle" : "#eae56f", "text" : "Prize 1"},
        {"fillStyle" : "#89f26e", "text" : "Prize 2"},
        {"fillStyle" : "#7de6ef", "text" : "Prize 3"},
        {"fillStyle" : "#e7706f", "text" : "Prize 4"},
        {"fillStyle" : "#eae56f", "text" : "Prize 5"},
        {"fillStyle" : "#89f26e", "text" : "Prize 6"},
        {"fillStyle" : "#7de6ef", "text" : "Prize 7"},
        {"fillStyle" : "#e7706f", "text" : "Prize 8"}
    ],
    "animation" :          
    {
        "type"     : "spinToStop",
        "duration" : 5,    
        "spins"    : 8,    
        "callbackFinished" : alertPrize
    }
};
