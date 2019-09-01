## Spin to Win :: Documentation 

> 


## API :: Wheel Functions 

**DeterminePrize()**  
Pulls prize data (`ParsePrizes()`), calculates a weighted random (`GetWeightedRandom()`), then determines the angle to land the wheel on. This function is called by `startSpin()`, before every spin.  

**`ParsePrizes()`**  
Looks for the `segments` object in the current wheel (found in the `_RawData["myWheelId"]["segments"]`).  
Updates the 



