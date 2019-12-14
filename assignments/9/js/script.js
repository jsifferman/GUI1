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
    }).droppable({});
    $("#board").sortable({
        revert: true,
        connectWith: "#rack",
        grid: [60, 70],
        drop: function(event, ui) {
            console.log(`sortable(): dropped ${this.id}`);
        },
        receive: function(event, ui) {
            console.log(`received: ${this.id}`);
        },
    }).droppable({});

    getNewTiles();
});

function resetTilesToDefault() {

    for ( let i = 1; i <= 7; i++ ) {
        $("#rack").append($("#piece" + i));
    }
    console.log(`Board was reset`);
}

$("#reset").click(resetTilesToDefault);

// Randomly select 7 tiles
function getNewTiles() {

    for ( let i = 1; i <= 7; i++ ) {
        // Select a random number between 0 and 99
        let randNum = Math.round(Math.random() * 100 % 99);
        let letter = tileDistribution[randNum];
        let fileName = tileFile[letter];

        let className = $("#piece" + i).attr('class');
        let classLetter = className[className.length - 1];

        console.log(`Random num: ${randNum}, letter: ${letter}, 
file: ${fileName}, curr class: ${className}, letter class: ${classLetter}`);

        // Assign each div representing the tile space an image corresponding to the
        // random number, and  resize it to fit inside the container.
        let id = "#piece" + i;

        $(id).removeClass( classLetter );
        $(id).css("background", `url(img/${fileName})`);
        $(id).css("background-size", "contain");
        $(id).css("background-repeat", "no-repeat");
        $(id).addClass( letter );
    }
    // Reset to default position upon getting new tiles.
    resetTilesToDefault();
}

function isEnglishWord( word ) {

    word = word.toLocaleLowerCase();

    if ( dict.includes( word ) ) {
        return true;
    }
    return false;
}

function getScore() {
    
    var sortedIds = $("#board").sortable( "toArray" );
    console.log(`sortedIds: ${sortedIds}`);

    // Position keeps track of where the current piece is on the board.
    let score = 0, position = 0, word = "";
    for ( let i of sortedIds ) {

        let classNames = $("#" + i).attr('class');
        let classLetter = classNames[classNames.length - 1];
        let tileValue = ScrabbleTiles[classLetter].value;

        /* position == 2: double letter score
         * position == 5: double word score */
        if ( position == 2 ) {
            score += tileValue * 2;
        } else if ( position == 5 ) {
            score += tileValue;
            score *= 2;
        } else {
            score += tileValue;
        }
        position++;
        word += classLetter;

        console.log(`getScore(): i: ${i}, className: ${classLetter}, score: ${score}, word: ${word}`);
    }
    console.log(`word: ${word}`);

    if ( isEnglishWord( word ) ) {
        console.log(`Found ${word} in the dictionary`);
        $("#scoreVal").text(`${score}`);
    } else {
        console.log(`Could not find ${word} in the dictionary`);
        $("#scoreVal").text(`Couldn't find that word in the dictionary. Try something else.`);
    }
    
}

$("#newTiles").click(getNewTiles);
$("#submit").click(getScore);