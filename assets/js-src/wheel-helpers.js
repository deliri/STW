/* Wheel Helpers */
/* Reusable functions related to the wheel */

// -----------------------------------------------------------------
// Variables
// -----------------------------------------------------------------

_timeAtLoad = GetTimeStampNow();

_rawData = [];                  // global parent of all raw data
_currentWheelType = "taccom";   // name of the wheel to load ( can be a Go Global Variable :: ASE )
_currentWheel = null;           // clone the wheel data, once parsed. this is the object we work with, and what is sent to the server
_currentWheelBackup = null;     // redundancy, if anything goes wrong

_arrayOfPrizes = [];            // names of the prizes
_arrayOfPrizeOdds = [];         // odds for each prize (same order as the names)
_arrayOfPrizeIndex = [];        // shorthand, to calculate wheel position >> used most frequently

_indexOfLosingTile = null;      // the "main" losing tile. if prizes go out of stock, this tile will have its odds increased 
_surplusPrizeOdds = 0;          // if a prize is out of stock, add its probability to "NO WIN" (or another losing tile)
_spinsLeft = null;              // number of spins a user has left, in the current game  

_stopAngle = null;              // angle for the wheel to stop at ( using weighted probability )
_selectedPrizeIndex = null;     // index array, corresponds to `segments`

_currentUser = CreateNewUser(); // generates a "clean" user object 

_isFormRequired = false;
_isFormComplete = false;
var userFormId = "user-form";

// let audio = new Audio('../assets/audio/tick.mp3');  // Create audio object and load tick.mp3 file.
let sfx = {
    'boing' : new Audio('../assets/audio/boing.mp3'),
    'laugh' : new Audio('../assets/audio/laugh-track.mp3'),
    'drumroll' : new Audio('../assets/audio/drumroll.mp3'),
    'ta-da' : new Audio('../assets/audio/ta-da.wav'),
    'tick' : new Audio('../assets/audio/tick.mp3'),
    'tick-old' : new Audio('../assets/audio/tick-old.mp3')
}

let _wheelOptions = {};         // wheel options are empty by default
let wheelSpinning = false;
let theWheel = new Winwheel( _wheelOptions ); // Actual Wheel



// -----------------------------------------------------------------
// Wheel + User/Player Data :: Set up the wheel from page variables
// -----------------------------------------------------------------

function CreateNewUser()
{
    return { 
        name: "unset",
        email: "unset",
        phone: "unset",
        wheelId: "default-wheel-id",
        prizeWon: null,
        numSpins: 0,
        "timestamp" : GetTimeStampNow()
    }
};

function SetupWheelData()
{
    // create a **duplicate**, non-pointer copy, of the _rawData["wheelName"] object
    _currentWheel = jQuery.extend( true , {} , _rawData[ _currentWheelType ] );
    _currentWheelBackup = jQuery.extend( true , {} , _rawData[ _currentWheelType ] );

    // verify 
        // console.log( "_currentWheel :: " + PrettyPrint( _currentWheel ) );
}

function UpdateUIFromWheelData()
{
    _isFormRequired = _currentWheel["_meta"]["requireFormToSpin"]; 
}

function RestoreWheelDataFromBackup()
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will revert your wheel to a previous version. You will <em>not</em> be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            // console.log( "reset ");
            _currentWheel = jQuery.extend( true , {} , _currentWheelBackup );
            UpdateStatDisplays();

            swalWithBootstrapButtons.fire(
                'Restored!',
                'We have restored your <strong>_currentWheel</strong> from <strong>_currentWheelBackup</strong>.',
                'success'
            )

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Never Mind!',
                'Your <strong>_currentWheel</strong> data remains unchanged :)',
                'info'
            )
        }
    })
}



// -----------------------------------------------------------------
// Draw / create the wheel
// -----------------------------------------------------------------

function SetWheelBackground()
{
    // pull a background from the input screen, or default if no value is provided
    var userUrl = document.getElementById("wheel-background-input").value;
    var bgUrl = userUrl ? userUrl : "../assets/img/wheel_back.png";
    document.getElementsByClassName("wheel-background")[0].style.backgroundImage = 'url("' + bgUrl + '")';
}

function UpdateWheelTypeFromInput()
{
    // Determine the type of wheel to load 
    var wheelType = document.getElementById("raw-data-input").value;
    if ( wheelType == "" ){
        console.log( 'Gotta set a name! Setting to Default :: "taccom" ::' );
        wheelType = "taccom";
    }

    // Update the global variable 
    _currentWheelType = wheelType;
    SetupWheelData(); 
    UpdateWheelFromRawData(); 
    UpdateStatDisplays();
}

function UpdateWheelFromRawData()
{
    // Prepare for incoming data 
    resetWheel();
    UpdateUIFromWheelData(); 

    // Pull data from the current wheel type
    console.log( "wheelData : " + _currentWheel );
    console.log( "Pull Content from Data: " + _currentWheel.segments[ 3 ].text );

    // Create a new wheel
    theWheel = new Winwheel( _currentWheel ); // targets "let theWheel" below

    // Try using image, after the wheel has been initialized 
    UseImageOnWheel();

    UpdatePageAfterResize(); // scale down, in case wheel is too large for the screen
        // NOTE :: this is not working too well. Will have to investigate, later 
}

function UseImageOnWheel()
{
    let loadedImg = new Image();    // Create new image object in memory.

    // Create callback to execute once the image has finished loading.
    loadedImg.onload = function()
    {
        theWheel.wheelImage = loadedImg;    // Make wheelImage equal the loaded image object.
        theWheel.draw();                    // Also call draw function to render the wheel.
    }

    // Set the image source, once complete this will trigger the onLoad callback (above).
    loadedImg.src = "../assets/img/taccom/wheel.png";
}

function UpdatePageAfterResize()
{
	var canvas = document.getElementById('canvas');

    var canvasWidth = canvas.width;
        // console.log( "canvasWidth :: " + canvasWidth );

    canvas.height = canvasWidth;

    // OPTIONAL :: Re-Center the Wheel
    // In order to keep the wheel in the center of the canvas the centerX and
    // centerY need to be set to the middle point of the canvas.
        // theWheel.centerX = (canvas.width / 2);
        // theWheel.centerY = (canvas.height / 2);
}



// -------------------------------------------------------
// Random Number Generation
// -------------------------------------------------------

function GetWeightedRandom( items , chances )
{
    // https://stackoverflow.com/a/55671924
    var sum = chances.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    chances = chances.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    return items[chances.filter(el => el <= rand).length];
}

function ParsePrizes()
{
    var segments = _currentWheel["segments"];     // TODO :: Make this the "_currentWheel"
        // console.log( "Segments Data :: " , segments );

    // reset prize arrays
    _arrayOfPrizes.length = 0;
    _arrayOfPrizeOdds.length = 0;
    _arrayOfPrizeIndex.length = 0;

    // reset odds
    _indexOfLosingTile = null;
    _surplusPrizeOdds = 0;

    // populate the array of prizes, and prize odds ( used by GetWeightedRandom() )
    var numberOfSegments = segments.length;
    for( var i = 0 ; i < numberOfSegments ; i++ )
    {
        // create an entry for each prize listed
        _arrayOfPrizes.push( segments[i]["text"] );
        _arrayOfPrizeIndex.push( i );
        
        // fast access 
        var odds = parseInt( segments[i]["odds"] );

        // THEORY :: 
        // If a prize quantity reaches 0, set the odds of winning it to 0, and add its odds to _surplusPrizeOdds
        // If a tile is a LOSING TILE, add _surplusPrizeOdds to its odds 
        if( segments[i]["lose"] === true )
        {
            _arrayOfPrizeOdds.push( odds + _surplusPrizeOdds ); 
            _indexOfLosingTile = i;         // Update the new losing tile 
            _surplusPrizeOdds = 0;          // Reset surplus odds 
        }
        else if( segments[i]["quantity"] > parseInt( 0 ) ) 
        {
            _arrayOfPrizeOdds.push( odds ); // The prize is in stock. Assign default odds. 
        } 
        else {
            _arrayOfPrizeOdds.push( 0 );    // Set the odds of winning this prize to 0
            _surplusPrizeOdds += odds;      // Increase the odds of losing, proportionate to the prize 

            // Edge Case
            // The last item in the array is NOT a losing tile, and is ALSO out of stock
            if( i + 1 === numberOfSegments ) {
                if( _indexOfLosingTile !== null ){
                    _arrayOfPrizeOdds[ _indexOfLosingTile ] += _surplusPrizeOdds; 
                    console.log( "The final prize in the array is out of stock. Adding its value to the last known losing tile." );
                } else {
                    console.log( "The final prize in the array is out of stock, and no tiles have been designated as 'losing tiles'. Odds for other prizes will increase uniformly." );
                }
            }

            console.log( _arrayOfPrizes );
            console.log( _arrayOfPrizeOdds );
        }
    }

    // testing
        // console.log( "_arrayOfPrizes :: " + _arrayOfPrizes );
        // console.log( "_arrayOfPrizeOdds :: " + _arrayOfPrizeOdds );
}

function DeterminePrize()
{
    // get updated values from the data array ( in case a prize was won in the meantime )
    ParsePrizes();

    // Determine a prize ( weighted probability )
    _selectedPrizeIndex = GetWeightedRandom( _arrayOfPrizeIndex , _arrayOfPrizeOdds )
        // var selectedPrize = GetWeightedRandom( _arrayOfPrizes , _arrayOfPrizeOdds )
        console.log( "Selected Prize Index :: " + _selectedPrizeIndex );
        console.log( "Selected Prize :: " + _currentWheel["segments"][_selectedPrizeIndex].text );

    // update the user object with the prize
    _currentUser.prizeWon = _arrayOfPrizes[ _selectedPrizeIndex ];

    // get the segment range for the selected prize
    var angleRange = GetAngleForSegment( _selectedPrizeIndex );
        // console.log( "angleRange :: " + angleRange.minAngle + " to " + angleRange.maxAngle );

    // use the segment range to calculate a random angle within the prize range
    _stopAngle = ( Math.floor(Math.random() * angleRange.safeRange ) + angleRange.minAngle )

    // Important thing is to set the stopAngle of the animation before stating the spin.
    theWheel.animation.stopAngle = _stopAngle;

    // Test the spin
        // startSpin();
}

function ResetPrize()
{
    _selectedPrizeIndex = null;
}

function GetAngleForSegment( selectedIndex )
{
    var numSegments = _currentWheel["segments"].length;
    var degreesPerSegment = 360 / numSegments;
        // console.log( "segments : " + numSegments + " || degrees per : " + degreesPerSegment );

    return {
        "safeRange" : degreesPerSegment -2,
        "minAngle" : ( selectedIndex * degreesPerSegment ) + 1,   // avoid segment seams :: http://dougtesting.net/winwheel/docs/tut14_setting_the_prize
        "maxAngle" : ( selectedIndex * degreesPerSegment ) + degreesPerSegment - 1    // upper range of a segment
    }
}



// -----------------------------------------------------------------
// Stat Management ( Prize + Winner )
// -----------------------------------------------------------------

function ParsePrizePool()
{
    // get prize array
    // count through each one
}

function UpdatePrizePool()
{
    var obj = _currentWheel["segments"];

    // Testing 
        // console.log( obj );
        // console.log( _selectedPrizeIndex );
        // console.log( obj[_selectedPrizeIndex] );

    // Quantity should not matter for losing tiles.  
    if( obj[_selectedPrizeIndex]["lose"] === true ){ return; }

    // Remove the prize from the pool (presumably, it has been given out)
    // IMPORTANT :: if "quantity" hits 0, that prize will no longer be served 
    // The probability of winning is added to the nearest "lose tile" - refer to : ParsePrizes()

    obj[_selectedPrizeIndex]["quantity"]--;
    obj[_selectedPrizeIndex]["timesWon"]++;
    
    // Testing
        // console.log( "Removing prize from pool" );
        // var str = JSON.stringify(obj);
        // str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
        // console.log(str); // Logs output to dev tools console.
}

function UpdateWinners()
{
    _currentWheel["_meta"]["arrayOfWinners"].push( GetUserFormData() );
}

function CanSpinAgain()
{
    if( _currentUser.numSpins < _currentWheel._meta.maxSpinsPerUser ){
        return true;
    }
}



// -----------------------------------------------------------------
// Data Presentation
// -----------------------------------------------------------------

function PrettyPrint( input )
{
    var str = JSON.stringify( input );
    str = JSON.stringify( input , null , 4 ); // (Optional) beautiful indented output.
        // VERIFY :: console.log( str ); 
    return str;
}

function UpdateStatDisplays()
{
    // check that all statistics are up-to-date
        // TODO - call relevant update functions

    // display them inside the right fields
        // TODO - merge from form-helpers :: starting to get lots of overlap // common variables
    $('#stat-prizes').text( PrettyPrint( _currentWheel["segments"] ) );
    $('#stat-winners').text( PrettyPrint( _currentWheel["_meta"]["arrayOfWinners"] ) );
}



// -----------------------------------------------------------------
// Animations + Sounds + Effects
// -----------------------------------------------------------------

function AnimateTicker()
{
    TweenMax.to( "#ticker" , 0.3 , { rotation: -25 } );
    TweenMax.to( "#ticker" , 0.6 , { rotation:0, delay: 0.5 } );
}

function PlaySfx( fx ) // only works on mouse DOWN events
{
    sfx[fx].pause();
    sfx[fx].currentTime = 0;
    sfx[fx].play();
}

function playSound()
{
    // This function is called when the segment under the prize pointer changes

    PlaySfx( "tick" );      // play a sound with every tick 
    AnimateTicker();        // tick the ticker
}

function EffectScrambleTitle( data )
{
    // There seems to be a bug with this garbage. If the revealDelay is greater than 1 second, it just shows XXOOXOXOXO 
    // 100 bucks not well spent. Fucking clown. 
    
    setTimeout(function()
    { 
        TweenLite.to( "#scramble-title" , 1, { 
            scrambleText: {
                text: data , 
                chars: "PYFGCRLAOEUIDHTNSQJKXBMWVZ" , 
                revealDelay:0.5, 
                speed:0.3
                // newClass:"myClass"
            }
        });
        
    }, 2200);
}



// -------------------------------------------------------
// User Interaction
// -------------------------------------------------------

function startSpin()
{
    TriggerKeptPlaying(); // Increase the amount of time before the game resets from inactivity. 

    if( !CheckFormValidity() ){ return; } // go no further if data is incomplete

    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        _currentUser.numSpins++; // the user has "officially" spun the wheel 

        DeterminePrize(); // determine the prize (using weighted probability)

        // Play Sounds 
        PlaySfx( "boing" ); // fun stuff on button press
        setTimeout( function(){
            PlaySfx( "drumroll" )
        }, 1250 );
        
        // Set wheelSpinning to true so that power can't be changed and spin button re-enabled during the current animation.
        // IMPORTANT :: The user will have to reset before spinning again.
        theWheel.startAnimation();
        wheelSpinning = true;
    }
}

function resetWheel()
{
    console.log( "resetting the wheel"); 

    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

function ToggleConfetti()
{
    confetti.toggle();
}

function RestartGame()
{
    // Get the wheel and data ready for a new user. 
    
    ClearGameTicker();                  // Stop checking to see if the player walked away 
    resetWheel();                       // Return the wheel to its upright position 
    _currentUser = CreateNewUser();     // Clear the player object 
    ResetForm();                        // Return the form elements to their original state
    $('#layer-input').show();           // Display the form layer 
    ResumeGame();                       // Restore to original state 

    ClearFocusedInput();                // keyboard-helpers.js 

    // IMPORTANT :: Do -NOT- reset the wheel DATA, as it contains the winners list!   
}

function ClaimPrize() 
{
    // Once the user CLAIMS their prize, the result is final 

    UpdateWinners();        // Adds the current user to the array of winners 
    UpdatePrizePool();      // Remove chosen prize from the prize pool (if applicable). 
    UpdateStatDisplays();   // Populate arrays in the admin panel ( IMPORTANT - do this AFTER updating winners and prizes! )
    SubmitForm();           // Send a message te the server.
    ResetPrize();           // We no longer need the _selectedPrizeIndex variable. Reset it. // marcus 
    RestartGame();          // On to the next! 
}



// -----------------------------------------------------------------
// UX Event Handlers
// -----------------------------------------------------------------

function alertPrize( indicatedSegment )
{
    // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
    // note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
    
    PauseGame();            // Pause game while reading this modal 

    _spinsLeft = _currentWheel._meta.maxSpinsPerUser - _currentUser.numSpins;

    var prizeTitle = "";    // Title that is initially shown at the top of the alert modal
    var revealTitle = "";   // Title that is revealed after it is unscrambled 
    var prizeIcon = "";     // e.g. success, error, info - see SweetAlert2 for more options 
    var htmlContent = "";   // The meat of the alert message  

    // Determine the post-spin message 

    if( indicatedSegment.lose === true ) 
    {    
        PlaySfx( "laugh" ); 
        
        prizeTitle = "<strong><span id='scramble-title'>OH NO!</span></strong>"; 
        revealTitle = "BETTER LUCK NEXT TIME!";
        prizeIcon = "error";
        
        if( CanSpinAgain() ){ 
            htmlContent = 
                '<img src="../assets/img/taccom/logo.png"/>' + 
                '<br>You landed on <b>' + indicatedSegment.text + '</b>.' + 
                '<div class="spacer_10"></div>' + 
                '<br>Do you want to <b class="uppercase">try again</b>?' +
                '<div class="spacer_10"></div>' + 
                '<br><h3 class="giant-faded-data">Spins Left: <span id="spins-left">' + _spinsLeft + '</span></h3>' + 
                '<br><strong>You have <timer></timer> seconds to choose!</strong>';
            } else {
                htmlContent = 
                '<img src="../assets/img/taccom/logo.png"/>' + 
                '<br>Looks like you ran out of spins...' +
                '<div class="spacer_10"></div>' + 
                '<br><b>Keep your chin up!</b>' +
                '<br>There\'s always next year!' + 
                '<div class="spacer_10"></div>' + 
                '<br><strong>This message will self-destruct in <timer></timer> seconds!</strong>';
        }
    } 
    else 
    {
        confetti.start();
        PlaySfx( "ta-da" ); 
        
        prizeTitle = "<strong><span id='scramble-title'>YOU WIN!</span></strong>"; 
        revealTitle = "CONGRATULATIONS!";
        prizeIcon = "success";

        if( CanSpinAgain() ){ 
            htmlContent = 
                '<img src="../assets/img/taccom/logo.png"/>' + 
                '<br>You scored the <b>' + indicatedSegment.text + '</b>!' + 
                '<div class="spacer_10"></div>' + 
                '<br><b class="uppercase">Claim your prize</b> or risk it to <b class="uppercase">spin again</b>?' +
                '<div class="spacer_10"></div>' + 
                '<br><h3 class="giant-faded-data">Spins Left: <span id="spins-left">' + _spinsLeft + '</span></h3>' + 
                '<br><strong>You have <timer></timer> seconds to choose!</strong>';
            } else {
                htmlContent = 
                '<img src="../assets/img/taccom/logo.png"/>' + 
                '<br>Looks like you ran out of spins...' +
                '<div class="spacer_10"></div>' + 
                '<br>Your final prize is the <b>' + indicatedSegment.text + '</b>!' + 
                '<div class="spacer_10"></div>' + 
                '<br><strong>This message will self-destruct in <timer></timer> seconds!</strong>';
        }
    }
    
    // Sweet Alert Modal 
    Swal.fire({

        // Animation Effects
        animation: false,
        customClass: {
            popup: 'animated tada'
        },

        // Content
        title: prizeTitle, // '<strong>CONGRATULATIONS!</strong>
        type: prizeIcon, // 'success'
        html: htmlContent,

        // Interaction
        showCloseButton: true,
        showCancelButton: CanSpinAgain(), // true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Claim Prize!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Spin Again',
        cancelButtonAriaLabel: 'Thumbs down',

        timer: parseInt( _currentWheel._meta.prizeCountdownTimer ),

        onBeforeOpen: () => {
            // Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('timer')
                .textContent = parseInt( Swal.getTimerLeft() / 1000 )
            }, 100)
        },
        onOpen: () => {
            EffectScrambleTitle( revealTitle );
        },
        onClose: () => {

            clearInterval( timerInterval );
            confetti.stop();

            if ( _spinsLeft > 0 ) 
            {
                TriggerKeptPlaying(); // Increase the amount of time before the game resets from inactivity. 
                resetWheel(); // Return the wheel to its default position, ready to spin. 
                ResumeGame(); // Un-pause the game 
            }
            else {
                console.log( 'Closed the window with the X button, with no spins left!' );
                Swal.fire(
                    'DEFAULT!',
                    '<strong>Nice try!</strong> You ended up with: ' + indicatedSegment.text + '.',
                    'info'
                )
                ClaimPrize();  
            }
        }

        }).then((result) => {

            if (result.value) 
            {
                console.log( "You have CLAIMED the prize!" );
                Swal.fire(
                    'Hurray!',
                    'Please head over to the counter, and <strong>claim your prize!</strong>',
                    'success'
                )
                ClaimPrize(); 
            }
            
            else if ( result.dismiss === Swal.DismissReason.cancel ) 
            {
                console.log( "The player was able (and has chosen) to spin again." )
                resetWheel(); 
            }

            else if ( result.dismiss === Swal.DismissReason.timer) 
            {
                console.log( 'Win alert was closed by the timer. Auto-choice was made!' );
                Swal.fire(
                    'DEFAULT!',
                    '<strong>Too slow!</strong> You ended up with: ' + indicatedSegment.text + '.',
                    'info'
                )
                ClaimPrize();  
            }

    }); // Ends Swal.fire

}



// -----------------------------------------------------------------
// Layer Control
// -----------------------------------------------------------------

function InitLayers()
{
    if( _isFormRequired === false ){
        document.getElementById( 'layer-input' ).style.display = 'none'; // https://stackoverflow.com/a/13688269
    }
}

function ToggleAdmin()
{
    var $adminLayer = $('#layer-admin');
    
    if( $adminLayer.is(":visible") )
    {
        $adminLayer.hide();
        ResumeGame();
    } 
    else {
        $adminLayer.show();
        PauseGame();
    }
}



// -----------------------------------------------------------------
// User Registration Form
// -----------------------------------------------------------------

function ResetForm()
{
    // Wipe form Inputs 
    $('#user-name').val("");
    $('#user-phone').val("");
    $('#user-email').val("");
    
    // Hide form elements 
    HideKeyboardOnGameRestart(); // keyboard-helper.js 
    $('#register-user').hide(); // hide the mega-button (until the form is re-validated)
}

function CheckFormCompletion()
{
    // Both Completion() and Validity() are required 
    // Validity() uses native HTML form validation; completion doesn't require submit
    // If we use Validity() to check the form on keyup events, the form cannot be completed
    // Because a fake Submit() action will remove the input element from focus 
    // SOURCE :: https://stackoverflow.com/a/11867013

    if( _isFormRequired === false ){ return true; }

    if( $('#user-name').val() === "" ||
    $('#user-phone').val() === "" ||
    $('#user-email').val() === "" ) {
        return false;
    }

    return true;
}

function CheckFormValidity()
{
    // SOURCE :: https://stackoverflow.com/a/11867013

    // If the form is invalid, submit it. The form won't actually submit;
    // this will just cause the browser to display the native HTML5 error messages.
        // NOTE :: This will ONLY work if there is a submit button somewhere on the form ( even if its CSS is "display: none;" )
    
    var $myForm = $('#user-form'); // TODO - bump this to an external variable 
    
    if( ! $myForm[0].checkValidity() ) {
        $myForm.find(':submit').click(); 
        return false;
    } else {
        return true; 
    }
}

function UpdateRegisterButtonStyle()
{
    // Use CheckFormCompletion() because it doesn't require the form to be submitted
        // Submitting the form causes the focus() to shift from the input element, causing trouble 

    if( CheckFormCompletion() === true ){
        $('#register-user').delay(2200).fadeIn(2200);
            // console.log( "FORM COMPLETION is TRUE");
    } else {
        $('#register-user').hide(); 
            // console.log( "FORM COMPLETION is FALSE");
    }
}

function RegisterUser()
{
    if( !CheckFormValidity() ){ return; } // go no further form is not valid 

    // create an entry for the current user
    _currentUser.name = $('#user-name').val();
    _currentUser.phone = $('#user-phone').val();
    _currentUser.email = $('#user-email').val();

    // display the wheel
    $('#layer-input').hide();
}

function GetUserFormData()
{
    return _currentUser;
}

function SubmitForm()
{
    if( _isFormRequired === false ){
        console.log( "Form is NOT required. NOT submitting anything to the server." );
        return;
    }
    
    if( !CheckFormValidity() ){ return; } // go no further if data is incomplete :: safety check 

    var userData = GetUserFormData();
        console.log( "collecting form data : " , userData );

    // Simulate server
    StoreOnServer();

    // call the server to save the data
    AsePostWheelData();
        console.log( "Submitting the form" );
}



// -----------------------------------------------------------------
// Timer Functions
// -----------------------------------------------------------------

// When the player touches the screen, a timer starts. Each time the player touches the screen, the timer continues to reset. 
// If the player has not touched the screen in X seconds, the game will reset, and present an alert message. 

// TODO :: Move these into the wheel data.js file 

_isGamePaused = false;      // Obvious variable is obvious 
_gameTicker = null;         // Handle for the timer that starts when the user touches the form 
_tickInterval = 1000;       // One tick is 1000 ms ( 1 second )
_ticksUntilReset = 0;       // Amount of ticks a player starts with (usually measured in seconds). 
_maximumTicks = 60;         // We don't want to give the player *too* much time 
_tickTouchBoost = 5;        // How many ticks does each touch of the screen add? 


// Each "tick" is a cycle in the game loop 

function StartGameTicker()
{
    if( !_gameTicker ){
        _ticksUntilReset += _tickTouchBoost * 2;            // Initial amount of time 
        _gameTicker = setInterval( Tick , _tickInterval );   // Start the timer 
        console.log( "Assigning setInterval to _gameTicker" ); 
    } else {
        console.log( "_gameTicker already exists!" ); 
    }
}

function ClearGameTicker()
{
    clearInterval( _gameTicker ); 
    _ticksUntilReset = 0;
    _gameTicker = null; 
}

function Tick()
{
    if( _isGamePaused ){ return; } // don't do anything if the game is paused. 

    // Every 1000 ms, remove 1 tick 
    _ticksUntilReset --; 
    if( _ticksUntilReset < 1 ){
        TriggerPlayerWalkedAway(); 
    }
    console.log( "_ticksUntilReset :: " + _ticksUntilReset );
}

function PauseGame() { 
    _isGamePaused = true;
}
function ResumeGame() {
    _isGamePaused = false; 
}


// These functions are trigger responses to a user action 

function TriggerKeptPlaying()
{
    // Each time the player touches the screen, add to the ticker 
    _ticksUntilReset += _tickTouchBoost;

    // ensure we never get too high a number 
    if( _ticksUntilReset > _maximumTicks ){
        _ticksUntilReset = _maximumTicks;
    }
}

function TriggerPlayerWalkedAway()
{
    console.log( 'Player walked away from the game!' );
    PauseGame(); // only want the alert to fire once 

    Swal.fire({

        // Content
        title: 'TIME-OUT RESET' , 
        type: 'info' , 
        html: 'The player took too long to fill the form, or waited too long between spins. The game has reset.' ,

        // Interaction
        showCloseButton: true,
        onClose: () => {
            console.log( "called RestartGame() from the info box! it SHOULD restart" );
            RestartGame();  
        }

    });
}



// -----------------------------------------------------------------
// Server Functions
// -----------------------------------------------------------------

function GetTimeStampNow()
{
    return Math.floor(Date.now() / 1000);
}

function SendMessageToServer( message )
{
    // will have jquery form submit
}



// -----------------------------------------------------------------
// Mock Server Functions
// -----------------------------------------------------------------

function StoreOnServer()
{

    const person = {
        name: "Obaseki Nosa",
        location: "Lagos",
    }

    window.localStorage.setItem('user', JSON.stringify( _currentUser ));

}

function ReadFromServer()
{
    console.log( JSON.parse(window.localStorage.getItem('user')) );
}



// -----------------------------------------------------------------
// Ase area
// -----------------------------------------------------------------

function AsePostWheelData()
{
    // Ase
    // Have a look here ::
    // https://api.jquery.com/jQuery.post/

    console.log( "Calling :: AsePostWheelData()" );
    return;

    $.ajax({
        type: "POST",
        url: "https://some-url.com/",
        data: _currentWheel,
        success: function( data )
        {
            console.log( data );
            Swal.fire({
                title: 'You got a response!',
                type: 'success',
                html: '<p>' + PrettyPrint( data ) + '</p>', // 'success'
            });
        },
        dataType: dataType
    });

}

function AseGetWinners()
{
    console.log( "Calling :: AseGetWinners()" );
    return;

    $.ajax({
        type: "GET",
        url: "https://some-url.com/download-winners-as-csv",
        data: _currentWheel,
        success: function( data )
        {
            console.log( data );
            Swal.fire({
                title: 'You got a response!',
                type: 'success',
                html: '<p>' + PrettyPrint( data ) + '</p>', // 'success'
            });
        },
        dataType: dataType
    });
}

function AseGetPrizes()
{
    console.log( "Calling :: AseGetPrizes()" );
    return;

    $.ajax({
        type: "GET",
        url: "https://some-url.com/download-prizes-as-csv",
        data: _currentWheel,
        success: function( data )
        {
            console.log( data );
            Swal.fire({
                title: 'You got a response!',
                type: 'success',
                html: '<p>' + PrettyPrint( data ) + '</p>', // 'success'
            });
        },
        dataType: dataType
    });
}



// -----------------------------------------------------------------
// Initialization - Set Everything Up
// -----------------------------------------------------------------

$(document).ready(function()
{
    // Wheel Data
    SetupWheelData(); // This must be done ONCE, the first time the page loads. Afterward, UpdateWheelTypeFromInput() takes over. 
    UpdateWheelFromRawData();
    ParsePrizes();

    // DOM Event Handlers 
    $('#click-to-test-sound').mousedown(function(){
        PlaySfx( "boing" );
    });

    // UI / UX 
    confetti.stop(); // pause confetti by default!
    InitLayers();

});
