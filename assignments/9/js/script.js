/*
    File: /usr/cs/undergrad/2020/jsiffer1/public_html/assignments/6/js/script.css
    Course: COMP.4610 GUI Programming I
    Assignment: 9 - Implementing a Bit of Scrabble with Drag and Drop

    James Sifferman, UML Computer Science, james_sifferman@student.uml.edu
    Copyright (c) 2019 by James Sifferman. All rights reserved. May be
    freely copied or excerpted for educational purposes with credit to
    the author.
    Updated by JS on December 16, 2019 at 12:00 AM
*/

// TO-DO: X Allow player to play as many words as they'd like.
//        X Keep a running score.
//        X Implement Blank Tiles.
//        X Gracefully deal with situation when active pool is empty and game attempts to fetch new tiles.
//        Fix spacing issues inside parentheses, etc.
//        Add comments.
//        Test thoroughly.

let highScore = 0;

// Scale the page by 85% to achieve a better fit
// Technique borrowed from user "Firat Deniz" at:
// https://stackoverflow.com/a/21094279
var scale = 'scale(0.85)';
$("body").css("webkitTransform", scale);

$( function() {
    $("#rack").sortable({
        revert: true,
        connectWith: "#board",
        drop: function(event, ui) {
            console.log(`sortable(): dropped ${this.id}`);
        },
        receive: function(event, ui) {
            console.log(`received: ${this.id}`);
        },
    }).droppable({
        drop: function (event, ui) {
            console.log(`rack dropped: ${this.id}`);
        },
    });
    $("#board").sortable({
        revert: true,
        connectWith: "#rack",
        drop: function(event, ui) {
            console.log(`sortable(): dropped ${this.id}`);
        },
        receive: function(event, ui) {
            console.log(`received: ${ui.item.parent().attr('id')}, targetList: ${$(this).attr('id')}`);
            
            var obj = ui.item.parent();
            console.log(`${obj.attr('id')}`)
        },
        update: function(event, ui) {
            // Get the id of the tile that was added to this list
            var id = ui.item.attr('id');

            // Check if the tile is the blank tile
            let classLetter = getLetterFromClassArray( "#" + id );
            console.log(`update: id = ${id}, letter = ${classLetter}`);
            if ( classLetter === "_" ) { handleBlankTile( id ); }
        }
    }).droppable({
        drop: function (event, ui) {
            console.log(`board dropped: ${this.id}`);
        },
    });
    startNewGame();
});

// Checks if the argument can be found in the dictionary array.
function isValidWord( word ) {

    console.log(`isValidWord(): word = ${word}, toLower = ${word.toLowerCase()}`);

    word = word.toLowerCase();

    if ( dict.includes( word ) ) {
        return true;
    }
    return false;
}

// Generate the HTML for the tiles that will appear when
// a blank tile is played by the user.
function handleBlankTile( id ) {
    $("#blank").show();
    console.log(`handleBlankTile():`)

    let htmlString = "";
    for ( let letter of alpha ) {

        if ( letter === "_" ) { continue; }

        if ( activeTileDistribution.includes( letter ) ) {
            let fileName = tileFile[ letter ];
            htmlString += `<img class="popup" src="img/` + fileName + `"` + 
                          ` id="tile${letter}"` + ">";
        }
    }
    $("#blank").html( htmlString );
    console.log(`handleBlankTile(): htmlString = ${htmlString}`);
}

// After the user plays a blank tile and the element containing the
// playable tiles appears, this function is fired when one of the
// images is clicked. It removes the blank tile, and replaces it with
// the tile that was selected in the pop-up.
function selectedBlank() {
    console.log(`selectedBlank(): ${this.id}`);

    let boardElements = $("#board").sortable( "toArray" );
    console.log(`selectedBlank(): boardElements: ${boardElements}`);

    for ( let elem of boardElements ) {
        let oldLetter = getLetterFromClassArray( "#" + elem );

        if ( oldLetter !== "_" ) { continue; }
        console.log(`selectedBlank(): Found blank element ${elem}`);

        removeImageAndClassName( "#" + elem );

        let newLetter = (this.id).replace("tile", "");

        getSpecificLetter( newLetter );
        addImageAndClassName( "#" + elem, newLetter );
        break;

    }
    $("#blank").hide();
}

// Removes a specific letter from the active pool. Don't have to validate
// because the letter that is passed has already been confirmed to exist
// in the active pool.
function getSpecificLetter( letter ) {
    console.log(`getSpecificLetter(): ${letter}`);

    console.log(`getSpecificLetter(): BEFORE: ${activeTileDistribution.length} ${activeTileDistribution}`);
    var index = activeTileDistribution.indexOf( letter );
    if ( index > -1 ) {
        activeTileDistribution.splice(index, 1);
    }
    console.log(`getSpecificLetter(): AFTER: ${activeTileDistribution.length} ${activeTileDistribution}`);
}

function hideElement( elem ) {
    console.log(`hideElement(): Hiding ${elem}`);

    $("#" + elem).hide();
}

function showElement( elem ) {
    console.log(`showElement(): Showing ${elem}`);

    $("#" + elem).show();
}

// When the player clicks the "Submit" button, addd up the tile values
// and check that the word is valid before updating the score.
function submitWord() {
    console.log(`submitWord():`);

    let boardElements = $("#board").sortable( "toArray" );

    // position: holds the position on the board.
    // score: holds the total word score.
    // word: holds the word that was submitted by the player.
    let position = 0, score = 0;
    let word = "";
    for ( elem of boardElements ) {

        let letter = getLetterFromClassArray( "#" + elem );
        word += letter;

        let letterValue = ScrabbleTiles[ letter ][ "value" ];
        console.log(`submitWord(): letter = ${letter}, value = ${letterValue}`);

        // Tally points based on whether the tile is sitting on a mutliplier.
        if      ( position == 2 ) { score += letterValue * 2; }
        else if ( position == 5 ) { score = ( (score + letterValue) * 2 ); }
        else                      { score += letterValue; }
        position = position + 1;
    }
    console.log(`submitWord(): word = ${word}, score = ${score}`);
    if ( checkSubmittedWord( word, score ) ) { 
        replaceSubmittedTiles( boardElements ); 
    }
}

// If we have a valid word, exchange the tiles on the board with new
// ones from our active pool.
function replaceSubmittedTiles( boardElements ) {
    console.log(`replaceSubmittedTiles(): ${boardElements}`);

    for ( elem of boardElements ) {

        removeImageAndClassName( "#" + elem );

        let letter = generateRandomLetter();
        if ( typeof letter === "undefined" ) { 
            hideElement( elem );
            continue;
        }
        
        console.log(`replaceSubmittedTiles(): elem = ${elem}, letter = ${letter}`);
        addImageAndClassName("#" + elem, letter);
    }
    moveTilesToRack();
}

// Checks if a given word is valid, if it is, update the high score displayed
// to the user, otherwise display an error to the user.
function checkSubmittedWord( word, score ) {

    console.log(`checkSubmittedWord(): word = ${word}, score = ${score}`);
    // Check if the player's word is found in our dictionary
    if ( word && isValidWord( word ) ) {

        console.log(`checkSubmittedWord(): FOUND ${word} in the dictionary.`);
        // Update the high score with the word score
        highScore += score;
        $("#score").text(`${highScore}`);
        clearErrorText();
        return true;
    } else {
        console.log(`checkSubmittedWord(): DID NOT FIND ${word} in the dictionary.`);
        $("#error").text(`Couldn't find any matching word in the dictionary. Try something else.`);
        return false;
    }
}

// Given an id of an element that has already been associated with a letter,
// find the class name corresponding to that letter and return it.
function getLetterFromClassArray( id ) {
    console.log(`getLetterFromClassArray(): ${id}`);

    let arrclassNames = $( id ).attr( 'class' );
    let classLetter = arrclassNames[ arrclassNames.length - 1 ];

    console.log(`getLetterFromClassArray(): arrClassNames = ${arrclassNames}, classLetter = ${classLetter}`);

    return classLetter;
}

// Given an element id (string) and a letter (string), assign a class name
// to that element equal to the letter. Find the image file corresponding
// to the letter and use CSS to apply the image as the background of the
// element.
function addImageAndClassName( id, letter ) {

    console.log(`addImageAndClassName(): id = ${id}, letter = ${letter}`);
    const fileName = tileFile[letter];

    $(id).css("background", `url(img/${fileName})`);
    $(id).css("background-size", "contain");
    $(id).css("background-repeat", "no-repeat");
    $(id).addClass( letter );
}

// Given an element id (string) which has already been assigned a class name
// corresponding to a letter, delete the background image and remove the
// class name. 
function removeImageAndClassName( id ) {

    console.log(`removeImageAndClassName(): id = ${id}`);
    const arrClasses = $(id).attr('class');
    const classLetter = arrClasses[ arrClasses.length - 1 ];

    // If we don't recognize the class letter as an alphabet character, return.
    if ( !alpha.includes( classLetter ) ) { return; }

    console.log(`removeImageAndClassName(): Removing ${classLetter} from ${id}`);
    $(id).removeClass( classLetter );
    $(id).css("background", 'none');
    $(id).css("background-size", "none");
    $(id).css("background-repeat", "none");

}

// Goes through variables and arrays that are modified by the program
// and restores them to their default states.
function resetValuesToDefaults() {

    console.log(`resetValuesToDefaults():`);

    highScore = 0;

    // Reset the active pool to the original distribution.
    activeTileDistribution = tileDistribution.slice(0);
    clearErrorText();
    clearScore();

    let rackElements  = $("#rack").sortable( "toArray" );
    let boardElements = $("#board").sortable( "toArray" );

    let allElements = boardElements.concat(rackElements).sort();

    console.log(`resetValuesToDefaults(): allElements = ${allElements}`);

    for ( let elem of allElements ) {
        removeImageAndClassName( "#" + elem );
        showElement( elem );
    }
}

function startNewGame() {

    console.log(`startNewGame(): `);
    moveTilesToRack();

    resetValuesToDefaults();

    // Store all the elements that are sitting on the rack in an array.
    let rackElements = $("#rack").sortable( "toArray" );

    // For as many rack elements, generate a random letter, and add
    // the corresponding image & class to that element.
    for ( let elem of rackElements ) {
        let letter = generateRandomLetter();

        if ( typeof letter === "undefined" ) { 
            hideElement( elem );
            continue; 
        }
        
        console.log(`startNewGame(): elem = ${elem}, letter = ${letter}`);
        addImageAndClassName("#" + elem, letter);
    }
}

// Randomly selects a letter from the available letter pool.
// And subsequently removes the selected letter from the active pool.
// TO-DO: test if this works when pool is size 1 (i.e., arr = [ "A" ])
function generateRandomLetter() {

    const len = activeTileDistribution.length;

    // Check if any letters are available.
    if ( len === 0 ) {
        console.log(`generateRandomLetter(): No letters to choose from!`);
        return undefined;
    }
    // Randomly select a letter from the active pool.
    let letter = activeTileDistribution[ Math.floor( Math.random() * len ) ];

    console.log(`generateRandomLetter(): ${len} letters available. Selected ${letter}`);
    console.log(`generateRandomLetter(): BEFORE: ${activeTileDistribution.length} ${activeTileDistribution}`);

    // Remove the first occurrence of the selected letter from the active pool.
    var index = activeTileDistribution.indexOf( letter );
    if ( index > -1 ) {
        activeTileDistribution.splice(index, 1);
    }

    console.log(`generateRandomLetter(): AFTER: ${activeTileDistribution.length} ${activeTileDistribution}`);
    return letter;
}

// Moves all tiles back to their starting position on the rack.
function moveTilesToRack() {

    console.log(`moveTilesToRack():`);

    clearErrorText();

    let rackElements  = $("#rack").sortable( "toArray" );
    let boardElements = $("#board").sortable( "toArray" );

    let allElements = boardElements.concat(rackElements).sort();

    console.log(`moveTilesToRack(): allElements = ${allElements}`);

    for ( let elem of allElements ) {
        $("#rack").append( $("#" + elem) )
    }
}

// Exchanges the tiles on the rack for new tiles. Re-inserts the old tiles
// back into the active pool before selecting a new tile.
function shuffleTiles() {
    console.log(`shuffleTiles(): `);
    clearErrorText();

    let rackElements  = $("#rack").sortable( "toArray" );

    for ( let elem of rackElements ) {

        let oldLetter = getLetterFromClassArray( "#" + elem );

        console.log(`shuffleTiles(): BEFORE: ${activeTileDistribution.length} ${activeTileDistribution}`);

        activeTileDistribution.push(oldLetter);

        console.log(`shuffleTiles(): BEFORE SORTING: ${activeTileDistribution.length} ${activeTileDistribution}`);

        activeTileDistribution.sort();

        console.log(`shuffleTiles(): AFTER: ${activeTileDistribution.length} ${activeTileDistribution}`);  

        removeImageAndClassName("#" + elem);

        let letter = generateRandomLetter();
        if ( typeof letter === "undefined" ) { 
            hideElement( elem );
            continue; 
        }
        
        console.log(`shuffleTiles(): elem = ${elem}, letter = ${letter}`);
        addImageAndClassName("#" + elem, letter);
    }
}

function clearErrorText() {
    console.log(`clearErrorText()`);
    $("#error").text('');
}

function clearScore() {
    console.log(`clearScore()`);
    $("#score").text('');
}

// Event Handling

$("#new-game").click(startNewGame);
$("#submit").click(submitWord);
$("#reset").click(moveTilesToRack);
$("#shuffle").click(shuffleTiles);
$(document).on('click', '.popup', selectedBlank);