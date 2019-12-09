/*
    File: /usr/cs/undergrad/2020/jsiffer1/public_html/assignments/6/js/script.css
    Course: COMP.4610 GUI Programming I
    Assignment: 7 - Using the jQuery Validation Plugin with Your Dynamic Table

    James Sifferman, UML Computer Science, james_sifferman@student.uml.edu
    Copyright (c) 2019 by James Sifferman. All rights reserved. May be
    freely copied or excerpted for educational purposes with credit to
    the author.
    Updated by JS on December 8, 2019 at 9:00 PM
*/
const INT_MAX = 50;
const INT_MIN = -50;

var tabArray = new Array; // Will contain the HTML for each generated tab.

// Generated divs will be assigned a letter id that corresponds to the
// length of the tabArray, i.e., alphabet[tabArray.length].
var alphabet = {
     1 : 'a',  2 : 'b',  3 : 'c',  4 : 'd',  5 : 'e',  6 : 'f',  7 : 'g',
     8 : 'h',  9 : 'i', 10 : 'j', 11 : 'k', 12 : 'l', 13 : 'm', 14 : 'n',
    15 : 'o', 16 : 'p', 17 : 'q', 18 : 'r', 19 : 's', 20 : 't', 21 : 'u',
    22 : 'v', 23 : 'w', 24 : 'x', 25 : 'y', 26 : 'z',
};

/* TO-DO: 12/8/2019
   - Add comments for functions added as of this version.
   - When tabs are individually closed, update tab count.
   - Hide tab div while no generated tables are present.
   - Add additional unit tests for isValueInRange and other funcs.
   - Add link to assignment from homepage.
   - Comment out debug code.
   - Optional: Include ability to have more than 26 tabs.
*/

// Run a series of unit tests (for debug only)
// button.addEventListener("click", runTests);

function rmSliderFromId(strInputId) {

    strInputId = strInputId.replace("slider", "");

    if (strInputId.includes("X")) {
        strInputId = strInputId.replace("X", "x");
    } else {
        strInputId = strInputId.replace("Y", "y");
    }
    return strInputId;
}

// If form entries pass validation, display table, otherwise display an error.
$(document).ready( function() {
    var sliderOpts = {
        min : -50 ,
        max : 50 ,
        slide : function ( e, ui ) {

            let strInputId = rmSliderFromId(this.id);

            // Set the input field's value equal to that of the slider's
            $("#" + strInputId).val( String(ui.value) );
            console.log(`sliding ${this.id}, ${strInputId}, ${ui.value}, event = ${e}`);
        },
        stop : function( e, ui ) {
            
            // When the slider has stopped moving, attempt to make the table.

            let strInputId = rmSliderFromId(this.id);
            
            handleErrorMessage(strInputId, String(ui.value));
            validateFormOnSubmit(e);
        },
    }
    var tabs = $("#tabs").tabs();
 
    $("#button").click(validateFormOnSubmit);
    $("input").on('input', validateEntryOnInput);

    $("#close-all-tabs").click( function (e) {

        e.preventDefault();
        
        // Generated tabs will contain this class name.
        $(".ui-tabs-tab").remove();

        // Remove the generated divs.
        for ( let i = 0; i < tabArray.length; i++ ) {
            let id = alphabet[i + 1];
            $("#" + id).remove();
            // console.log(`close-all-tabs: ${id}`);
        }
        tabArray.length = 0;
    })

    // Initialize the jQuery sliders.
    $("#sliderXBegin").slider( sliderOpts );
    $("#sliderXEnd").slider( sliderOpts );
    $("#sliderYBegin").slider( sliderOpts );
    $("#sliderYEnd").slider( sliderOpts );

    // This code used for closing individual tabs was borrowed from:
    // https://jqueryui.com/tabs/#manipulation
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      });
});

/* Description: This function is called while the 'input' event is firing.
 *              Its purpose is only to then call a handler function with
 *              properties of the specific element that is responsible for
 *              firing the event.
 * 
 * Parameters : None
 * Return     : Void
 */
function validateEntryOnInput() {

    console.log(`validateEntryOnInput(): A user is typing.`);

    handleErrorMessage(this.id, this.value, isValidNumber(this.value));
}

/* Description: Auxilliary function used to determine the nature of specific
 *              invalid inputs. 
 * 
 * Parameters : value (string - the value entered by the user).
 * Return     : string containing a description of the error.
 */
function returnTypeOfError( value ) {

    console.log(`returnTypeOfError(): value = ${value}, type = ${typeof(value)}`);
    console.log(`value includes e? ${String(value).includes('e')}`);

    if ( isNaN(Number(value)) ) { 
        return "The value you've entered is not a number.";
    } else if ( parseInt(value) > INT_MAX) {
        return "Too large. Enter a value ≤ 50";
    } else if ( parseInt(value) < INT_MIN ) {
        return "Too small. Enter a value ≥ -50";
    } else if ( !Number.isSafeInteger(Number(value)) ) { 
        return "You have entered a floating point number. Please enter an integer.";
    } else if ( value === "" ) {
        return "Unrecognized entry. Please enter an integer.";
    } else if ( value.includes('e') ) {
        return "Scientific notation is not allowed. Only integers.";
    } else {
        return "";
    }
}

/* Description: While the 'input' event is firing, this func is called to
 *              check that the user is entering valid input. Depending on 
 *              whether the input is valid or not, a message will appear
 *              alongside the form text box indicating as much.
 * 
 * Parameters : id (string - the element id),
 *              value (string - the value entered by the user),
 *              isValid (boolean - whether the input is valid or not).
 * Return     : Void
 */
function handleErrorMessage(id, value, isValid=false) {
    
    console.log(`handleErrorMessage(): id = ${id}, value = ${value}, isValid = ${isValid}`);
    
    let errMessage, className, icon;
    
    // The following line is needed because isValidNumber() cannot be
    // called from inside $(document).ready( function() {} );
    if ( isValid === false ) { isValid = isValidNumber( value ); }

    if ( isValid ) {
        errMessage = "";
        className = "validField";
        icon = "  ✓ ";
    } else {
        errMessage = returnTypeOfError(value);
        className = "errorField";
        icon = "  ❌ ";
    }

    console.log(`handleErrorMessage(): icon = ${icon}, className = ${className}, errMessage = ${errMessage}`);
    if (id.includes("x")) {
        console.log(`true, contains x`);
        id = id.replace("x", "X");
    } else {
        console.log(`false, contains y`);
        id = id.replace("y", "Y");
    }
    id = "span" + id;
    $("#" + id).text(icon + errMessage);
    $("#" + id).attr('class', className);
    console.log(`handleErrorMessage(): id = ${id}`);
}

/* Description: validateFormOnSubmit() is called when the "Submit" button is
 *              clicked. It checks that all the values entered by the user are
 *              valid, and if not, displays an error message and returns void.
 *              On success, calls main() and proceeds with program execution.
 * 
 * Parameters : none
 * Return     : Void
 */
function validateFormOnSubmit(event) {

    // Prevent the form from submitting the entries
    if (event.type == "click") { event.preventDefault(); }
    console.log(`validateFormOnSubmit(): target = ${event.target}, type = ${event.type}`);

    clearErrorAndTable();

    let values = getValues(); // Values entered by the user.
    let error = document.querySelector('#error'); // Resides on bottom of div.

    // If any of the values are outside the acceptable range, do not submit.
    let validRange = true;
    for ( let i of values ) {
        if ( isValueInRange(i) === false ) {
            validRange = false;
            break;
        }
    }

    console.log(`validateFormOnSubmit(): validRange = ${validRange}`);

    // Check that the input values are valid integers.
    if ( !validEntries(values) ) {
        error.innerHTML = `One or more invalid entries.
                           Please enter only integers.`;
        return;
    // Check that the integers are within the range: [INT_MIN, INT_MAX].
    } else if ( !validRange ) {
        error.innerHTML = `You have entered one or more values that is too 
                        large.<br>Please enter integers between -50 and 50.`;
        return;
    } else {
        main(values);
    }
}

/* Description: Called after form entries pass validation. Creates a
 *              multidimensional array based on the input values, then
 *              generates an HTML table based on this array.
 * 
 * Parameters : values (array of values that will be used to create the table)
 * Return     : Void
 */
function main( values ) {

    clearErrorAndTable();

    let [ colStart, colEnd, rowStart, rowEnd ] = values;
    
    // Sort the endpoints in ascending order. 
    [ colStart, colEnd ] = returnMinMax(colStart, colEnd);
    [ rowStart, rowEnd ] = returnMinMax(rowStart, rowEnd);

    // In order to build multi-dimensional array, we need to calculate all
    // the values contained within our ranges.
    let columnVals = makeRange(colStart, colEnd);
    let rowVals = makeRange(rowStart, rowEnd);

    // Multi-dimensional array will hold the products of the multiplication.
    let table = makeTwoDimensionalArray(columnVals, rowVals);

    // HTML will be inserted to generate a tab, which will later be
    // filled with the multiplication table in the call to makeTable().
    createTab(colStart, colEnd, rowStart, rowEnd);
    makeTable(table);
}

function createTab(xStart, xEnd, yStart, yEnd) {

    if (tabArray.length >= Object.keys(alphabet).length) {
        // console.log(`Max number of tabs reached.`);
        return;
    }
    // console.log(`num entries = ${tabArray.length}, length of alphabet = ${Object.keys(alphabet).length}`)

    let curr = tabArray.length + 1;

    tabArray.push(`<li><a href="#${alphabet[curr]}">[${xStart}, ${xEnd}] x [${yStart}, ${yEnd}]</a>
<span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>`);
    
    $("#tabs-list").append(tabArray[tabArray.length - 1]);

    // console.log(`createTab(): peek = ${tabArray[tabArray.length - 1]}, count = ${tabArray.length},
    //              letter = ${alphabet[curr]}`);

    $("#tabs").append(`<div id="${alphabet[curr]}"><div id="table-container">
<div id="table-wrapper"><table id="dyn-table-${alphabet[curr]}">
</table></div></div></div>`);

    $("#tabs").tabs("refresh");
}

/* Description: Given two lists of numbers, generate a multidimensional array
 *              that contains the products of the values in each list.
 *
 * Parameters : columnVals (list of numbers, horizontal axis),
 *              rowVals    (list of numbers, vertical axis)
 * Return     : table (multidimensional array)
 */
function makeTwoDimensionalArray( columnVals, rowVals ) {

    let row = [];
    let table = [];

    // Insert the column values as our top-most row in our table.
    table.push(columnVals);
    for ( let i = 0; i < rowVals.length; i++ ) {
        // Insert the vertical multipliers (i.e., left-most in rows).
        row.push(rowVals[i]);
        for ( let j = 0; j < columnVals.length; j++ ) {
            row.push(columnVals[j] * rowVals[i]);
        }
        table.push(row);
        row = [];
    }
    // Insert the "blank cell" that forms the top left corner of the table.
    table[0].unshift("");

    return table;
}

/* Description: Generates the HTML code for a single <td> element and appends
 *              it to the <tr> element that is passed as an argument.
 *
 * Parameters : tr (the <tr> element), val (number to be added to the row)
 * Return     : Void
 */
function addCell( tr, val ) {
    
    let td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td);
}

/* Description: Generates the HTML code for a single <th> element and appends
 *              it to the <tr> element that is passed as an argument.
 *              If addClass is specified, add the corresponding class name to
 *              the <th> element.
 *
 * Parameters : tr (the <tr> element), val (number to be added to the row),
 *              addClass (a valid string)
 * Return     : Void
 */
function addHeaderCell( tr, val, addClass=undefined ) {
    
    let th = document.createElement('th');

    th.innerHTML = val;
    if ( addClass === "column" ) {
        th.className = "column-head";
    }
    if ( addClass === "row" ) {
        th.className = "row-head";
    }
    tr.appendChild(th);
}

/* Description: Generates the HTML code for a row of <td> elements where the
 *              first element is <th>, and appends the row to the table element
 *              that is passed in as an argument.
 *
 * Parameters : tbl (the <table> element),
 *              vals (numbers to be added to the row)
 * Return     : Void
 */
function addRow( tbl, vals ) {

    let tr = document.createElement('tr');
    
    for ( let i = 0; i < vals.length; i++ ) {
        if ( i == 0 ) {
            addHeaderCell(tr, vals[i], "row");
            continue;
        }
        addCell(tr, vals[i]);
    }
    tbl.appendChild(tr);
}

/* Description: Generates the HTML code for a row of <th> elements and appends
 *              it to the table element that is passed in as an argument.
 *
 * Parameters : tbl (the <table> element),
 *              vals (numbers to be added to the row)
 * Return     : Void
 */
function addHeaderRow( tbl, vals ) {

    let tr = document.createElement('tr');

    for ( let i = 0; i < vals.length; i++ ) {
        addHeaderCell(tr, vals[i], "column");
    }
    tbl.appendChild(tr);
}

/* Description: Generates the HTML table code given a multi-dimensional
 *              array that contains all the table entries.
 *
 * Parameters : table (multi-dimensional array)
 * Return     : Void
 */
function makeTable( table ) {

    console.assert( !(table === undefined) || table.length > 0 );

    // The following id was generated during the call to createTab()
    tabId = "#dyn-table-" + alphabet[tabArray.length];
    tbl = document.querySelector(tabId);
    
    // console.log(`makeTable(): tabId = ${tabId}, tabArray len = ${tabArray.length}`);
    
    // Top row, at array[0], should be comprised entirely of <th> elements.
    addHeaderRow(tbl, table[0], "column");
    for (let i = 1; i < table.length; i++) {
        addRow(tbl, table[i], "row");
    }

    // console.log(`HTML table = ${tbl.innerHTML}`);
}

/* Description: Given two values that form a range i.e., [3, 7],
 *              create an array of all integers within this range.
 *
 * Parameters : a, b (numbers)
 * Return     : An array of all integers beween a and b.
 */
function makeRange( a, b ) {

    const start = parseInt(a);
    const end = parseInt(b);
    const length = end - start + 1;

    let range = [];

    for ( let i = start; i <= end; i++ ) {
        range.push(i);
    }
    return range;
}

/* Description: Verifies that the values entered into the form are valid.
 *
 * Parameters : entries (a list of values entered by the user)
 * Return     : Boolean - True if the values are valid integers, 
 *                        and False otherwise.
 */
function validEntries( entries ) {
    
    if ( entries.length != 4 ) {
        return false;
    }
    for ( let entry of entries ) {
        if ( !isValidNumber(entry) ) {
            return false;
        }
    }
    return true;
}

/* Description: Verifies that the input is an integer within a range.
 *
 * Parameters : value (any type).
 * Return     : Boolean - True if value is a number, and False otherwise.
 */
function isValidNumber( value ) {
    
    console.log(`isValidNumber(): value = ${value}, type = ${typeof(value)}`)

    if ( value &&
         !isNaN(Number(value)) &&
         Number.isSafeInteger(Number(value)) &&
         !value.includes('e') &&
         isValueInRange(value) ) { return true; }
    return false;
}

/* Description: Verifies that the argument is in the range [INT_MIN, INT_MAX].
 *
 * Parameters : value (string - the value entered by the user)
 * Return     : boolean (true if in range, otherwise false)
 */
function isValueInRange( value ) {

    // console.log(`isValueInRange(): value = ${value}, type = ${typeof(value)}`);

    if ( parseInt(value) < INT_MIN || parseInt(value) > INT_MAX ) {
        return false;
    }
    return true;

}

/* Description: Captures the values entered into the form by the user which
 *              form the start and end points for the ranges of column and row
 *              values.
 *
 * Parameters : none
 * Return     : a sorted array of the form:
 *                       [ columnBegin, columnEnd, rowBegin, rowEnd ]
 */
function getValues() {

    let colStart = document.querySelector('#xBegin').value;
    let colEnd = document.querySelector('#xEnd').value;
    let rowStart = document.querySelector('#yBegin').value;
    let rowEnd = document.querySelector('#yEnd').value;

    return [ colStart, colEnd, rowStart, rowEnd ];
}

/* Description: Sorts two given values in ascending order.
 *
 * Parameters : first, second (integers).
 * Return     : a sorted array containing the two arguments.
 */
function returnMinMax( first, second ) {
    first = parseInt(first);
    second = parseInt(second);

    if ( first > second ) {
        return [ second, first ];
    } else {
        return [ first, second ];
    }
}

/* Description: Clears the error text and table HTML.
 *
 * Parameters : none
 * Return     : Void
 */
function clearErrorAndTable() {

    // document.querySelector('#dyn-table').innerHTML = "";
    document.querySelector('#error').innerHTML = "";
}


/* Testing */

function runTests() {

    console.log(`********************************`);
    console.log(`Begin output of unit tests.`);
    console.log(`********************************`);
    testValidEntries();
    testReturnMinMax();
    testMakeRange();
    testInRange();
    console.log(`********************************`);
    console.log(`End output of unit tests.`);
    console.log(`********************************`);
}

function testValidEntries() {

    let testVals;
    // Case 1
    // All positive integers.
    testVals = [ 1, 2, 3, 4 ];
    console.assert(validEntries(testVals),
                   'Case 1 failed with %s.', testVals.toString());

    // Case 2
    // Negative mixed with positive integers.
    testVals = [ -1, 2, 9, 10 ];
    console.assert(validEntries(testVals),
                   'Case 2 failed with %s.', testVals.toString());

    // Case 3
    // All negative integers.
    testVals = [ -55, -45, -2, -1 ];
    console.assert(validEntries(testVals),
                   'Case 3 failed with %s.', testVals.toString());

    // Case 4
    // Missing values.
    testVals = [ 1, 2, 3, ];
    console.assert(!validEntries(testVals),
                   'Case 4 failed with %s.', testVals.toString());

    // Case 5
    // One valid integer that is of type string.
    testVals = [ 1, 2, "3", 4 ];
    console.assert(validEntries(testVals),
                   'Case 5 failed with %s.', testVals.toString());

    // Case 6
    // One invalid input that is of type string.
    testVals = [ 1, 2, "foo", 4 ];
    console.assert(!validEntries(testVals),
                   'Case 6 failed with %s.', testVals.toString());

    // Case 7
    // One invalid input that is the empty string.
    testVals = [ 1, 2, "", 4 ];
    console.assert(!validEntries(testVals),
                   'Case 7 failed with %s.', testVals.toString());

    // Case 8
    // One invalid input that is a floating point number.
    testVals = [ 1, 3.14, 8, 4 ];
    console.assert(!validEntries(testVals), 
                   'Case 8 failed with %s.', testVals.toString());
}

function testReturnMinMax() {

    let a = 1, b = 2;
    // Case 1
    // Pass in  (1, 2), should return [1, 2]
    console.assert(testArraysAreEqual(returnMinMax(a, b), [a, b]),
                    'Case 1 failed with [%s]', [a, b].toString());

    // Case 2
    // Pass in  (2, 1), should return [1, 2]
    console.assert(testArraysAreEqual(returnMinMax(b, a), [a, b]),
                    'Case 2 failed with [%s]', [a, b].toString());
}

function testMakeRange() {

    let testVals;

    // Case 1
    // All positive integers.
    a = 1, b = 4;
    console.assert(testArraysAreEqual(makeRange(a, b), [1, 2, 3, 4]),
                    'Case 1 failed with [%s]', makeRange(a, b).toString());
}

function testisValueInRange() {

    let testVals;

    // Case 1
    // Invalid value which is less than INT_MIN.
    console.assert(!isValueInRange(-51),
                   'Case 1 failed with [%s]', -51);

    // Case 2
    // Invalid value which is greater than INT_MAX.
    console.assert(!isValueInRange(1000),
                   'Case 2 failed with [%s]', 1000);

    // Case 3
    // Valid value which is in [INT_MIN, INT_MAX]
    console.assert(isValueInRange(1),
                   'Case 3 failed with [%s]', 1);
}

// Checks whether two arrays contain identical elements.
function testArraysAreEqual( a, b ) {

    if ( a === b ) { return true; }
    if ( a.length != b.length ) { return false; }
    for ( let i = 0; i < a.length; i++ ) {
        if ( !(a[i] === b[i]) ) { return false; }
    }
    return true;
}

/* Polyfill */

/* Borrowed from 'Number.isInteger()' page on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 */
 Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
      isFinite(value) && 
      Math.floor(value) === value;
  };

/* Borrowed from 'Number.isSafeInteger()' page on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger 
 */
  Number.isSafeInteger = Number.isSafeInteger || function (value) {
    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
 };