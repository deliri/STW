## Spin to Win :: Documentation 

> 


## API :: Wheel Functions 

**DeterminePrize()**  
Pulls prize data (`ParsePrizes()`), calculates a weighted random (`GetWeightedRandom()`), then determines the angle to land the wheel on. This function is called by `startSpin()`, before every spin.  

**`ParsePrizes()`**  
Looks for the `segments` object in the current wheel (found in the `_RawData["myWheelId"]["segments"]`).  
Updates the 


# API :: Backend 

## SavePrize
To save user/prize data, POST to "api/save-prize" with the folllowing post data:
```
-email, fullname, phone_number, prize(optional)
```

Remember to handle frontend errors including validation errors.
Validation errors will be separated by semi-colon. eg.:
    ```
    "email: must be a valid email address; name: cannot be blank"
    ```


## Save Winner
To save winner's data, POST to "api/save-winner" with the folllowing post data:
```
-email, fullname, prize
```

Remember to handle frontend errors including validation errors.
Validation errors will be separated by semi-colon. eg.:
    ```
    "email: must be a valid email address; name: cannot be blank"
    ```


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