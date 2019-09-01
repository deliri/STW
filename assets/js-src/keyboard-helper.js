// Working with SimpleKeyboard
// August 22, 2019


// -----------------------------------------------------------------
// Theory
// -----------------------------------------------------------------

// on-screen keyboard

// input element, on select, will become the new target
    // is given a class on select
    // when another input is selected, it becomes the new target

// input text of keyboard stored in a variable
    // when focusing on a new input, clear the keyboard variable
    // when focused on an input that has text in it, load the input into the variable
    // can be done with a check against "" or null

// later, can experiment with different keyboard types



// -----------------------------------------------------------------
// Variables
// -----------------------------------------------------------------

let Keyboard = window.SimpleKeyboard.default;   // used by all keyboards

_screenKeyboard = null; // the keyboard we use for registering users
_screenKeyboardText = "";


// -----------------------------------------------------------------
// Functions
// -----------------------------------------------------------------

function SetupRegistrationKeyboard()
{
    _screenKeyboard = new Keyboard( ".keyboard-wrapper-registration" , {

        theme: "simple-keyboard hg-theme-default hg-layout-default",

    	onChange: input => onChange( input ),
        onKeyPress: button => onKeyPress( button ),

        layout: {
            default: [
                "{shift} {alt} {phone} {bksp}",
                "1 2 3 4 5 6 7 8 9 0",
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "z x c v b n m . - _",
                "@ .com {space} .com @"
            ],
            shift: [
                "{shiftactivated} {alt} {phone} {bksp}",
                "1 2 3 4 5 6 7 8 9 0",
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M . - _",
                "@ .com {space} .com @"
            ],
            alt: [
                "{shiftactivated}",
                "% ! ? {bksp}",
                `@ # $ & * ( ) ' "`,
                "@gmail.com @yahoo.com @outlook.com live.com",
                "@hotmail.com @icloud.com @mail.com mail.com",
                "{space}"
            ],
            phone: [
                "{shift}",
                "1 2 3", 
                "4 5 6", 
                "7 8 9", 
                "# 0 {bksp}", 
                "( - )",
            ],
        },

        display: {
            "{alt}": "<i class='fa fa-fw fa-envelope'></i>",
            "{phone}": "<i class='fa fa-fw fa-phone'></i>",
            "{shift}": "ABC",
            "{shiftactivated}": "abc",
            "{enter}": "ENTAR",
            "{bksp}": "<i class='fa fa-fw fa-long-arrow-left'></i>",
            "{space}": " ",
            "{default}": "DE FAULT"
        }

	});

    function onChange( input )
    {
        // don't do anything if there is no input selected
        var focusedInput = $('.focused-input')[0];
        if( !focusedInput ){ return; }

        focusedInput.value = input; // update the selected input 
	}

    function onKeyPress( button ) 
    {    
        // Special Buttons 
        if (button.includes("{") && button.includes("}")) {
            handleLayoutChange(button);
        }

        UpdateRegisterButtonStyle(); // check the form (wheel-helper.js)
            // console.log("Button pressed", button);

        TriggerKeptPlaying(); // Increase the amount of time before the game resets from inactivity. 
    }
    
    function handleLayoutChange( button ) 
    {
        let currentLayout = _screenKeyboard.options.layoutName;
        let layoutName;
        
        switch (button) 
        {
            case "{shift}":
            case "{shiftactivated}":
            case "{default}":
                layoutName = currentLayout === "default" ? "shift" : "default";
                break;

            case "{alt}":
            case "{altright}":
                layoutName = currentLayout === "alt" ? "default" : "alt";
                break;

            case "{phone}":
                layoutName = currentLayout === "phone" ? "default" : "phone";
                break;

            default:
                break;
        }
    
        if (layoutName) {
            _screenKeyboard.setOptions({
                layoutName: layoutName
            });
        }
    }

    // hide the keyboard, to start
    $('.keyboard-wrapper-registration').hide(); 
}

function SetupInputElements()
{
    // What to do when an input element enters focus 
    $( 'input.screen-keyboard' ).on( 'focus' , function() 
    {
        // show keyboard, if it's NOT visible 
        // MARCUS :: TODO - turn this into an actual if statement... I must have been out of it! 
        $('.keyboard-wrapper-registration').is(":hidden");
        $('.keyboard-wrapper-registration').show(); 

        ClearFocusedInput(); // de-select previous input element

        // Update keyboard input, based on contents of input file 
        var inputValue = $( this ).val(); 
        if( inputValue !== "" || inputValue !== null ){
            _screenKeyboard.setInput( inputValue ); // clear previous text
        } else {
            _screenKeyboard.setInput(""); // clear previous text
        }

        // indicate to the user that this is the focused element 
        $( this ).addClass( "focused-input" );

        // Start the game ticker, if it has not already started
        // This is when the timer officially starts 
        StartGameTicker(); 
    });
}

function ClearFocusedInput()
{
    $('.focused-input').removeClass( "focused-input" );
    $('input').blur(); // un-focus input areas - if the form resets while inputs are focused, the game timer will start again, resulting in an endless cycle 
}

function HideKeyboardOnGameRestart()
{
    $('.keyboard-wrapper-registration').hide(); 
    ClearFocusedInput(); // de-select previous input element
}


// -------------------------------------------------------------

$(document).ready(function()
{
    SetupInputElements();
    SetupRegistrationKeyboard();
});

// -------------------------------------------------------------

function StandardKeyboard()
{
	let Keyboard = window.SimpleKeyboard.default;

	let myKeyboard = new Keyboard({
    	onChange: input => onChange(input),
    	onKeyPress: button => onKeyPress(button)
	});

	function onChange(input) {
	    document.querySelector(".input").value = input;
	    console.log("Input changed", input);
	}

	function onKeyPress(button) {
	    console.log("Button pressed", button);
	}
}


function MobileKeyboard()
{
    let Keyboard = window.SimpleKeyboard.default;

    let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp}"],
        shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
        },
        theme: "hg-theme-default hg-layout-numeric numeric-theme"
    });

    // Update simple-keyboard when input is changed directly
    document.querySelector(".input").addEventListener("input", event => {
        keyboard.setInput(event.target.value);
    });

    console.log(keyboard);

    function onChange(input) {
        document.querySelector(".input").value = input;
        console.log("Input changed", input);
    }

    function onKeyPress(button) {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
    }

    function handleShift() {
        let currentLayout = keyboard.options.layoutName;
        let shiftToggle = currentLayout === "default" ? "shift" : "default";

        keyboard.setOptions({
            layoutName: shiftToggle
        });
    }

} // END -- Mobile Keyboard


function TabletKeyboard()
{

    let Keyboard = window.SimpleKeyboard.default;

    let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    theme: "hg-theme-default hg-theme-ios",
    layout: {
        default: [
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {enter}",
        "{shift} z x c v b n m , . {shift}",
        "{alt} {smileys} {space} {altright} {downkeyboard}"
        ],
        shift: [
        "Q W E R T Y U I O P {bksp}",
        "A S D F G H J K L {enter}",
        "{shiftactivated} Z X C V B N M , . {shiftactivated}",
        "{alt} {smileys} {space} {altright} {downkeyboard}"
        ],
        alt: [
        "1 2 3 4 5 6 7 8 9 0 {bksp}",
        `@ # $ & * ( ) ' " {enter}`,
        "{shift} % - + = / ; : ! ? {shift}",
        "{default} {smileys} {space} {back} {downkeyboard}"
        ],
        smileys: [
        "😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}",
        `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
        "😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {shift}",
        "{default} {smileys} {space} {altright} {downkeyboard}"
        ]
    },
    display: {
        "{alt}": ".?123",
        "{smileys}": "\uD83D\uDE03",
        "{shift}": "⇧",
        "{shiftactivated}": "⇧",
        "{enter}": "return",
        "{bksp}": "⌫",
        "{altright}": ".?123",
        "{downkeyboard}": "🞃",
        "{space}": " ",
        "{default}": "ABC",
        "{back}": "⇦"
    }
    });

    /**
     * Update simple-keyboard when input is changed directly
     */
    document.querySelector(".input").addEventListener("input", event => {
    keyboard.setInput(event.target.value);
    });

    console.log(keyboard);

    function onChange(input) {
        document.querySelector("#keyboard-output").value = input;
        console.log("Input changed", input);
    }

    function onKeyPress(button) {
        console.log("Button pressed", button);

        /**
         * Handle toggles
         */
        if (button.includes("{") && button.includes("}")) {
            handleLayoutChange(button);
        }
    }

    function handleLayoutChange(button) 
    {
        let currentLayout = keyboard.options.layoutName;
        let layoutName;

        switch (button) {
            case "{shift}":
            case "{shiftactivated}":
            case "{default}":
            layoutName = currentLayout === "default" ? "shift" : "default";
            break;

            case "{alt}":
            case "{altright}":
            layoutName = currentLayout === "alt" ? "default" : "alt";
            break;

            case "{smileys}":
            layoutName = currentLayout === "smileys" ? "default" : "smileys";
            break;

            default:
            break;
        }

        if (layoutName) {
            keyboard.setOptions({
            layoutName: layoutName
            });
        }
    }

}
