# Meta Data Notes 


----------------------------------------------------------
## Business Needs 

- list of people who spun the wheel ( total )
    - no repeat names, emails, etc. 
    - used by sales to collect leads 

- number of winners ( total )

- number of prizes won 
    - list of total prizes won 
    - tally prizes 
    - go down the list of wins, and increase the number 


----------------------------------------------------------
## Remaining Front End Work

NICE TO HAVE 

- popup keyboard 
    - they'll be using touchscreens 

- front-end, list of winners 
    - if the machine is idle, then it can overlay the current winners (from a file) 
    - display from the list of winners, on a timer 

- weighted percent of wins
    - I'm pretty sure this is done in the `.js` file
    - will include and test it 

- introduce maximum number of wins 
    - track : number of spins from that person ( I think they get 3 spins with the original ) 

- improved ticker 
    - ticker comes down
    - if it reaches rotation X, and the wheel is still spinning, then it pops back up! 
    - should look more natural :) 


----------------------------------------------------------
## Ase Work 

- two github / go repos 
    - one is the `pure marcus version` to demo 
    - one is the `enhanced ase version` working file 

- **admin page**
    - ul > li > name + description of route
    - each link takes us to a different wheel 
    - data saved will tell us which wheel, which user, etc. 

- generate pages based on the wheel data
    - the timestamp when page is loaded 

- **analytics page**
    - list of winners, based on data from the site 
    - count the number of winners 
    - tally up the number of prizes 

- email the admins / contacts found in the wheel data 
    - connect to button on front-end 
    - up to them what they do with it ( e.g. email individual winners )
    - email them a nice template 
    - *if the admin wants to email the winners, they can pay us to make a system* 
    - SEE BELOW :: EMAIL SYSTEM 

::  

### EMAIL SYSTEM 

- **propose** a generic email system, that will email the winners 
    - when/if there is an internet connection 
    - can be done from a remote computer, using the list
    - lets you re-email the winners 

- *sends an HTML email template informing the winner of their prize* 
    - can accept email templates 
    - the email that is sent to the customer 
    - **here is our system; you can use it to email clients; OR here is the list; email them yourself!** 

::  

- after the wheel is spun, the form is submitted, and this data goes to the server 

- GET requests for Analytics 
    - total number of winners 
    - total prizes won 
    - counter for prizes (if possible) 

- a way to create / upload new wheels easily 
    - execute however you want
    - we should be able to quickly create new wheels 
    - IDEA :: make a POST form, that accepts text area, which will convert to a `.js` file 
    - used to make new wheels 
    - accepts one big dump of text, will save as a `.js` file, that we can pull with the GET request above 


NICE TO HAVE ::  

- UPLOAD wheel background image ()



----------------------------------------------------------
## Example Documentation ( Will do this for the rest )

How Custom Wheels Work 
> Save this to GitHub, so Ase can review 
- write the docs :: 

1. Create a `.js` file in `assets/data/js` (e.g. `wheel-16527.js`)

2. Copy/paste a javascript data object into the file, e.g.
```
_rawData["16527"] = {
    'responsive'        : true, 
    'numSegments'       : 8,                 // Specify number of segments.
    'outerRadius'       : 200,               // Set outer radius so wheel fits inside the background.
    'drawText'          : true,              // Code drawn text can be used with segment images.
    'textFontSize'      : 16,
    'textOrientation'  
    ...
```

3. **MAKE SURE** that the _rawData["16527"] is the shortcode that you want. 
    You can set the shortcode to be anything that you want

4. Load the `.js` file into your `index.html`
```
<script type="text/javascript" src="../assets/data/vanilla-js/wheel-16527.js"></script> 
```
