# Scratchpad :: Rough Notes 

- set backgrounds 
    - set wheel background 
    - set **page** background, as well 

- on-screen keyboard 
    - https://mottie.github.io/Keyboard/ 
    - implement :: numbers for phone number 
    - email keyboard for email 
    - text keyboard for name 

- **investigate bugs** 
    - seems to submit the form the first time I fill in the values! 

- bring in design elements from the old wheel 
    - get the `.wav` file from the plugin that rigo had 
    - pull the fireworks from the old design 

- **page background must be editable, too!**
    - it can be an image, or a solid color (use css later)  

- **tell Ase we need the ability to append custom css to these wheels**
    - and custom elements, at some point 

- add special CSS to the button 
    - the button should be unique 

- **add documentation** 
    - where is the form CSS ? 
    - where is the button CSS ? 
    - describe the API
    - describe the functions 
    - (include a manual for everything (can be written in markdown))
        - include as part of the GitHub repo 

- get a favicon (little wheel or something) 


### Admin Page 

- make admin page for every setting on the wheel
    - includes emergency contacts
    - etc. 

- save a list of winners, and this list can be downloaded as a CSV file 
    - record of past 

- wants the data to be saved (winners) 
    - I'll append winners to the list of winners 
    - "current winner" counter. 
    - "latest winner" easy to get (function) 
    - append to array
    - can save the array locally 
 
- list of winners 
    - including the prizes 

- `Download CSV` button 
    - name, email, phone, date, also what they won 


### Collect Prize Data 

- this is part of list of winners 


### Users Must Register to Spin 

- this has to be a toggle
- sometimes we don't want/need user data


### Maximum Spins Per Email 

- You have used 3/3 spins
- get to spin the wheel 3x or more 

- **wants to hide the user form after spins** 
    1. enter your info
    2. info disappears
    3. you have X/X spins 
        - you have to press "spin again" (which brings up the form, and clears the old winner)
        - if you walk away, there is a global timeout for the wheel
        - this can be somewhere in settings 

- **remove the user info**


### Layout 

- vertical or horizontal layout to the screen 
- if (vertical) 
    - wheel on left or right 
- form is on the other side 
    - CSS (flexbox) 


### Data We Want to Keep 

- number of segments
- color of each
- this will be image or not 
- text that's gonna show 
- font size
- text color 
- text orientation 


- save user settings to CSV
    - user settings are edited by the form 
    - can copy/paste them between projects 
    - point is, the wheel itself is the data object 


### Maximum wins and Win Percent 

Marcus Requirements 
- the latest design of the wheel, as good as you can get it 
- any information you want to tell me about the wheel 


- Rigo found the fireworks on CodeCanyon (or something else) 
    - want something sharp :: a winning effect 
    - pick javascript fireworks effect 


---------------------------------------------------------
## Rigo Requirements :: Static Go Pages 

- wants to convert Wordpress pages to static pages 
- host them on go 

- rev slider to `GoLang` 
- revolution slider can be used without wordpress as well 




---------------------------------------------------------
## Rigo Concerns 

- wants to keep as much of the work done as possible
- has many wordpress sites already on the kiosks 
    - download static pages 
    - make them work on go 

- Ase :: Questions 
    - bring Rigo up to speed with what is possible
    - provide a list of requirements for Rigo ( what Ase needs to host a page on Go ) 


---------------------------------------------------



DIFFERENT WHEEL TYPES 
- single image :: easiest to make; 
- hate this overlay in the middle; 
    - will have to be a single-image wheel 
    - extra work to make the segments 

:: 

- there should be a **section** background
- wheel background aligns with the wheel itself. 
    - can have the white border a part of the wheel
    - wheel background can be something else (or just a white circle; or the logo) 

- the section has its own height, and width, and all that shit 
    - looks good on 1080 x 1920 layout 

:: 

