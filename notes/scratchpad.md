# Scratchpad 

> Complete and Delete! 


### Current 

> Push updates, tell Ase, and rest!  


### NEXT 

- admin section to UPDATE the values (e.g. new items added)


### Nice to Haves 

- [ ] admin button for require registration
- [ ] update without refreshing the page (initLayers() with the new settings)

- option to ask for phone number, or not 
    - add it to wheel data 
    - add it to the admin 

- IDEA :: Add a `mute` mode 

- rename `User` to `Player` as it makes more sense
    - distinguishes `Admins` (as both Players and Admins could be "Users" of the application)

- [ ] draw a diagram to map out this system 

- keyboard bug 
    - if you delete on your "normal" keyboard, the on-screen keyboard needs to update 
    - also, see if we can affect the cursor... otherwise we do an auto-clear to be safe 
        - **or** include a `clear` button on the side 
        - **Could have a "current position" array index, and insert text at that position**
:: 

- Merge the old fireworks code into the congratulations – do you think this is necessary? I think confetti is good enough
- bring in the old fireworks 
    - open the old code page
    - extract fireworks code into fireworks-helper.js 
    - make the fireworks work on an empty page
    - integrate fireworks on current page
    - only show fireworks when the player wins (start/stop function)


### Rigo Notes 

- `enter` button on the on-screen keyboard should submit the form 
    - can't get form validation from an on-screen button press
    - so I hid the `enter` buttons, and improved the keyboard layout 

- new custom messages 

- ASK ::
    - what do we want the odds to be? 
    - what are the quantities of prizes? 


### Future Thoughts 

Get a testing framework, and write tests for this library. The wheel I've created is very impressive! 
I can write tests to make it maintainable :) 

ALT :: Hire somebody, and have them write tests for me. 
