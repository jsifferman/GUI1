/*
    File: /usr/cs/undergrad/2020/jsiffer1/public_html/assignments/6/js/script.css
    Course: COMP.4610 GUI Programming I
    Assignment: 7 - Using the jQuery Validation Plugin with Your Dynamic Table

    James Sifferman, UML Computer Science, james_sifferman@student.uml.edu
    Copyright (c) 2019 by James Sifferman. All rights reserved. May be
    freely copied or excerpted for educational purposes with credit to
    the author.
    Updated by JS on November 29, 2019 at 9:00 PM
*/
const INT_MAX = 50;
const INT_MIN = -50;

/* TO-DO: 11/29/2019
   - Add additional unit tests for isValueInRange and other funcs.
   - Fix CSS so that the form doesn't shift when the error messages appear.
   - Comment out debug code.
*/

// Run a series of unit tests (for debug only)
// button.addEventListener("click", runTests);

// If form entries pass validation, display table, otherwise display an error.
$(document).ready( function() {
    $("#button").click(validateFormOnSubmit);
    $("input").on('input', validateEntryOnInput);
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

    console.log(`returnTypeOfError(): value = ${value}, type = ${typeof(value)}`)

    if ( isNaN(value) ) { 
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
function handleErrorMessage(id, value, isValid) {
    
    console.log(`handleErrorMessage(): id = ${id}, value = ${value}, isValid = ${isValid}`);
    
    let errMessage, className, icon;

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

    switch(id) {
        case 'horizontal_start':
            $("#first-entry").text(icon + errMessage);
            $("#first-entry").attr('class', className);
            break;
        case 'horizontal_end':
            $("#second-entry").text(icon + errMessage);
            $("#second-entry").attr('class', className);
            break;
        case 'vertical_start':
            $("#third-entry").text(icon + errMessage);
            $("#third-entry").attr('class', className);
            break;
        case 'vertical_end':
            $("#fourth-entry").text(icon + errMessage);
            $("#fourth-entry").attr('class', className);
            break;
        default:
            break;
    }
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
    event.preventDefault();

    clearErrorAndTable();

    let values = getValues(); // Values entered by the user.
    let error = document.querySelector('#error'); // Resides on bottom of div.

    // If any of the values is outside the acceptable range, do not submit.
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

    // Using the multi-dimensional array, generate the HTML table code.
    makeTable(table);
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

    tbl = document.querySelector('#dyn-table');

    // Top row, at array[0], should be comprised entirely of <th> elements.
    addHeaderRow(tbl, table[0], "column");
    for (let i = 1; i < table.length; i++) {
        addRow(tbl, table[i], "row");
    }
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
         !isNaN(value) &&
         Number.isSafeInteger(Number(value)) &&
         !value.includes('e') &&
         isValueInRange(value) ) { return true; }
    return false;
}

/* Description: Given an array of values, iterates through them and determines
 *              if they are within the acceptable range defined by INT_MIN and
 *              INT_MAX.
 *
 * Parameters : values (array)
 * Return     : true (values are within the acceptable range), otherwise false.
 */
function inRange( values ) {

    console.log(`inRange(): values = ${values}, type = ${typeof(values)}`)

    if ( Array.isArray(values) ) {
        console.log(`inRange(): ${values} is an array.`);
    }
    if ( Number.isSafeInteger(parseInt(values)) ) {
        console.log(`inRange(): ${values} is a number.`);
    }
    
    for( let i in values ) {
        if ( parseInt(values[i]) < INT_MIN || parseInt(values[i]) > INT_MAX ) {
            return false;
        }
    }
    return true;
}

function isValueInRange( value ) {

    console.log(`isValueInRange(): value = ${value}, type = ${typeof(value)}`);

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

    let colStart = document.querySelector('#horizontal_start').value;
    let colEnd = document.querySelector('#horizontal_end').value;
    let rowStart = document.querySelector('#vertical_start').value;
    let rowEnd = document.querySelector('#vertical_end').value;

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

    document.querySelector('#dyn-table').innerHTML = "";
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

function testInRange() {

    let testVals;

    // Case 1
    // One invalid value which is less than INT_MIN.
    testVals = [-51, 1, 2, 3];
    console.assert(!inRange(testVals),
                   'Case 1 failed with [%s]', testVals.toString());

    // Case 2
    // One invalid value which is greater than INT_MAX.
    testVals = [-1, 0, 1, 1000];
    console.assert(!inRange(testVals),
                   'Case 2 failed with [%s]', testVals.toString());

    // Case 3
    // All valid values.
    testVals = [1, 2, 3, 4];
    console.assert(inRange(testVals),
                   'Case 3 failed with [%s]', testVals.toString());
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