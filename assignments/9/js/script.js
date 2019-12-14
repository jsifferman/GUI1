var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

var tileDistribution = [
    "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "B", "B",
    "C", "C",
    "D", "D", "D", "D",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "F", "F",
    "G", "G", "G",
    "H", "H",
    "I", "I", "I", "I", "I", "I", "I", "I", "I",
    "J",
    "K",
    "L", "L", "L", "L",
    "M", "M",
    "N", "N", "N", "N", "N", "N",
    "O", "O", "O", "O", "O", "O", "O", "O",
    "P", "P",
    "Q",
    "R", "R", "R", "R", "R", "R",
    "S", "S", "S", "S",
    "T", "T", "T", "T", "T", "T",
    "U", "U", "U", "U",
    "V", "V",
    "W", "W",
    "X",
    "Y", "Y",
    "Z",
    "_", "_",
];

var tileFile = {
    "A" : "Scrabble_Tile_A.jpg",
    "B" : "Scrabble_Tile_B.jpg",
    "C" : "Scrabble_Tile_C.jpg",
    "D" : "Scrabble_Tile_D.jpg",
    "E" : "Scrabble_Tile_E.jpg",
    "F" : "Scrabble_Tile_F.jpg",
    "G" : "Scrabble_Tile_G.jpg",
    "H" : "Scrabble_Tile_H.jpg",
    "I" : "Scrabble_Tile_I.jpg",
    "J" : "Scrabble_Tile_J.jpg",
    "K" : "Scrabble_Tile_K.jpg",
    "L" : "Scrabble_Tile_L.jpg",
    "M" : "Scrabble_Tile_M.jpg",
    "N" : "Scrabble_Tile_N.jpg",
    "O" : "Scrabble_Tile_O.jpg",
    "P" : "Scrabble_Tile_P.jpg",
    "Q" : "Scrabble_Tile_Q.jpg",
    "R" : "Scrabble_Tile_R.jpg",
    "S" : "Scrabble_Tile_S.jpg",
    "T" : "Scrabble_Tile_T.jpg",
    "U" : "Scrabble_Tile_U.jpg",
    "V" : "Scrabble_Tile_V.jpg",
    "W" : "Scrabble_Tile_W.jpg",
    "X" : "Scrabble_Tile_X.jpg",
    "Y" : "Scrabble_Tile_Y.jpg",
    "Z" : "Scrabble_Tile_Z.jpg",
    "_" : "Scrabble_Tile_Blank.jpg",
}

// var TileFilenames = [
//     "Scrabble_Tile_A.jpg", "Scrabble_Tile_B.jpg", "Scrabble_Tile_C.jpg", "Scrabble_Tile_D.jpg",
//     "Scrabble_Tile_E.jpg", "Scrabble_Tile_F.jpg", "Scrabble_Tile_G.jpg", "Scrabble_Tile_H.jpg",
//     "Scrabble_Tile_I.jpg", "Scrabble_Tile_J.jpg", "Scrabble_Tile_K.jpg", "Scrabble_Tile_L.jpg",
//     "Scrabble_Tile_M.jpg", "Scrabble_Tile_N.jpg", "Scrabble_Tile_O.jpg", "Scrabble_Tile_P.jpg",
//     "Scrabble_Tile_Q.jpg", "Scrabble_Tile_R.jpg", "Scrabble_Tile_S.jpg", "Scrabble_Tile_T.jpg",
//     "Scrabble_Tile_U.jpg", "Scrabble_Tile_V.jpg", "Scrabble_Tile_W.jpg", "Scrabble_Tile_X.jpg",
//     "Scrabble_Tile_Y.jpg", "Scrabble_Tile_Z.jpg", "Scrabble_Tile_Blank.jpg",
// ];

// TO-DO: Need to adjust number of tiles per letter. A-9, B-2, C-2, D-4, etc 

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
        // revert: true,
        // disabled: true,
        connectWith: "#rack",
        grid: [60, 70],
        drop: function(event, ui) {
            console.log(`sortable(): dropped ${this.id}`);
        },
        receive: function(event, ui) {
            console.log(`received: ${this.id}`);
        },
    }).droppable({});
    // $(".tile").droppable({
    //     accept: ".piece",
    //     tolerance: "touch",
    //     over: function(event, ui) {
    //         console.log(`over(): You are over item with id ${this.id}`);
    //     },
    //     drop: function(event, ui) {
    //         // $(event.target).closest( "div" ).toggleClass( "YAY");
    //         let sib = $(this).prev();
    //         console.log(`drop(): prev = ${sib.attr('id')}`);
    //         console.log(`drop(): You have dropped onto ${this.id}`);
    //     },
    //     // drop: function(event, ui) {
    //     //     alert('dropped');
    //     // }
    // });
    // $(".piece").draggable({
    //     snap: ".snappable",
    //     snapMode: "inner",
    //     snapTolerance: 30,
    //     start: function(event, ui) {
    //         $(event.target).css("background-color", "blue");
    //     },
    //     stop: function(event, ui) {
    //         $(event.target).css("background-color", "");
            
    //         let snapped = $(this).data('ui-draggable').snapElements;

    //         var snappedTo = $.map(snapped, function(element) {
    //             return element.snapping ? element.item : null;
    //         });

    //         var result = '';
    //         $.each(snappedTo, function(idx, item) {
    //             result += $(item).text() + ",";
    //         })

    //         $("#results").html("Snapped to: " + (result === '' ? "Nothing!" : result));

    //         console.log(`snapped: ${Object.getOwnPropertyNames(snapped)}, to: ${Object.getOwnPropertyNames(snappedTo)}`);
    //     },
    // });
    getNewTiles();
});

// Borrowed the following code which resets position of elements from user "Explosion Pills":
// https://stackoverflow.com/a/15193712

$(".piece").data({
    'originalLeft': $(".piece").css('left'),
    'origionalTop': $(".piece").css('top')
});

$("#reset").click(function() {
    // $(".piece").css({
    //     'left': $(".piece").data('originalLeft'),
    //     'top': $(".piece").data('origionalTop')
    // });
    console.log(`Board was reset`);
    for ( let i = 1; i <= 7; i++ ) {
        $("#rack").append($("#piece" + i));
    }
});

// Randomly select 7 tiles
function getNewTiles() {
    for ( let i = 1; i <= 7; i++ ) {
        // Select a random number between 0 and 99
        let randNum = Math.round(Math.random() * 100 % 99);
        let letter = tileDistribution[randNum];
        let fileName = tileFile[letter];

        let className = $("#piece" + i).attr('class');
        let classLetter = className[className.length - 1];

        console.log(`Random num: ${randNum}, letter: ${letter}, file: ${fileName}, curr class: ${className}, letter class: ${classLetter}`);
        // console.log(`obj: ${TileFilenames[randNum]}`);
        // console.log(`#piece${i}, Random #: ${randNum}, file: ${TileFilenames[randNum]}`);

        // Assign each div representing the tile space an image corresponding to the
        // random number, and  resize it to fit inside the container.
        let id = "#piece" + i;

        $(id).removeClass( classLetter );
        $(id).css("background", `url(img/${fileName})`);
        $(id).css("background-size", "contain");
        $(id).css("background-repeat", "no-repeat");
        $(id).addClass( letter );
        // $(id).prop('id', letter);
    }
    // Reset to default position upon getting new tiles.
    // $(".piece").css({
    //     'left': $(".piece").data('originalLeft'),
    //     'top': $(".piece").data('origionalTop')
    // });
    for ( let i = 1; i <= 7; i++ ) {
        $("#rack").append($("#piece" + i));
    }
}

function getScore() {
    
    var sortedIds = $("#board").sortable( "toArray" );
    console.log(`sortedIds: ${sortedIds}`);

    // Position keeps track of where the current piece is on the board.
    let score = 0, position = 0;
    for ( let i of sortedIds ) {

        let classNames = $("#" + i).attr('class');
        let classLetter = classNames[classNames.length - 1];
        let tileValue = ScrabbleTiles[classLetter].value;

        if ( position == 2 ) {
            score += tileValue * 2;
        } else if ( position == 5 ) {
            score += tileValue;
            score *= 2;
        } else {
            score += tileValue;
        }
        position++;

        console.log(`getScore(): i: ${i}, className: ${classLetter}, score: ${score}`);
    }
    $("#scoreVal").text(`${score}`);
}

$("#newTiles").click(getNewTiles);
$("#submit").click(getScore);

// Set up our miniature Scrabble board with images

// $("#tile1").css("background", 'url(img/start.png)');
// $("#tile1").css("background-size", "contain");
// $("#tile1").css("background-repeat", "no-repeat");

// $("#tile2").css("background", 'url(img/plain.png)');
// $("#tile2").css("background-size", "contain");
// $("#tile2").css("background-repeat", "no-repeat");

// $("#tile3").css("background", 'url(img/double_letter_light.png)');
// $("#tile3").css("background-size", "contain");
// $("#tile3").css("background-repeat", "no-repeat");

// $("#tile4").css("background", 'url(img/plain.png)');
// $("#tile4").css("background-size", "contain");
// $("#tile4").css("background-repeat", "no-repeat");

// $("#tile5").css("background", 'url(img/plain.png)');
// $("#tile5").css("background-size", "contain");
// $("#tile5").css("background-repeat", "no-repeat");

// $("#tile6").css("background", 'url(img/double_word.png)');
// $("#tile6").css("background-size", "contain");
// $("#tile6").css("background-repeat", "no-repeat");

// $("#tile7").css("background", 'url(img/plain.png)');
// $("#tile7").css("background-size", "contain");
// $("#tile7").css("background-repeat", "no-repeat");

// $(".tile").css("background-color", "");