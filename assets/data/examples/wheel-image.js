_rawData["image"] = {
    'responsive'        : true, 
    'numSegments'       : 8,                 // Specify number of segments.
    'outerRadius'       : 200,               // Set outer radius so wheel fits inside the background.
    'drawText'          : true,              // Code drawn text can be used with segment images.
    'textFontSize'      : 16,
    'textOrientation'   : 'curved',
    'textAlignment'     : 'inner',
    'textMargin'        : 90,
    'textFontFamily'    : 'monospace',
    'textStrokeStyle'   : 'black',
    'textLineWidth'     : 3,
    'textFillStyle'     : 'white',
    'drawMode'          : 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
    'segments'          :                    // Define segments including image and text.
    [
       {'image' : '../assets/img/segments-00/jane.png',  'text' : 'Jane'},
       {'image' : '../assets/img/segments-00/tom.png',   'text' : 'Tom'},
       {'image' : '../assets/img/segments-00/mary.png',  'text' : 'Mary'},
       {'image' : '../assets/img/segments-00/alex.png',  'text' : 'Alex'},
       {'image' : '../assets/img/segments-00/sarah.png', 'text' : 'Sarah'},
       {'image' : '../assets/img/segments-00/bruce.png', 'text' : 'Bruce'},
       {'image' : '../assets/img/segments-00/rose.png',  'text' : 'Rose'},
       {'image' : '../assets/img/segments-00/steve.png', 'text' : 'Steve'}
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 5,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : alertPrize,
        "callbackSound"    : playSound,   
        "soundTrigger"     : "pin"     
    },
    "pins" :
    {
        "responsive" : true, 
        "number" : 16   
    }
};
