## Spin to Win :: Documentation 

> 


## API :: Wheel Functions 

**DeterminePrize()**  
Pulls prize data (`ParsePrizes()`), calculates a weighted random (`GetWeightedRandom()`), then determines the angle to land the wheel on. This function is called by `startSpin()`, before every spin.  

**`ParsePrizes()`**  
Looks for the `segments` object in the current wheel (found in the `_RawData["myWheelId"]["segments"]`).  
Updates the 


# API :: Backend 


## Save Winners and Customer
To save winner's data, POST to "save-prize-winners" with the folllowing post data:


## Download Winners in CSV Format
To download winners in CSV format, Visit "api/download-winners"

## Download Prizes/Users in CSV Format
To download winners in CSV format, Visit "api/download-prizes"


# Selecting and Editing Wheel Types

## Editing Wheel Type
The wheel type is saved in the directory "assets/data/wheel-types".
You can create and save custom wheel types in this directory using the examples in the same directory.

## Selecting Wheel Type
The available wheel types will be loaded on page load. These are pushed into the home(taccom) template. You can change the current wheel type on page by selecting the dropdown menu (Select Wheel Type).

A new javascript function,"AseChangeWheelType()" is created to handle the change events in the dropdown button. this function accepts a parameter which defines the selected wheel type.