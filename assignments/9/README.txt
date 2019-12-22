Student: James Sifferman
Email: james_sifferman@student.uml.edu
Assignment: 9
Date: 12/22/2019


Assignment 9 Write-Up

- - - - - - - - - - - - - - - - - - - - - 

Board: refers to the strip of the Scrabble board along the top of
       the page where players can drag and drop tiles to form a word.

Rack: refers to the area where the tiles are generated and placed at
      the start of a new game.

- - - - - - - - - - - - - - - - - - - - - 

Submit - Submits the tiles that have been placed on the board.
         Checks that the word exists in the dictionary.
         Counts up the word score and adds to the current score
         if the word is found in the dictionary.

Reset - Puts all the tiles back into their original starting positions.
        Does not reset the score, does not find new tiles. Just resets
        them to their default positions.

Shuffle - Any tile that is on the rack gets redrawn from the available
          pool of tiles. Tiles that are on the board remain unchanged.

New Game - Resets the score to 0, draws new tiles and places them on the rack.

- - - - - - - - - - - - - - - - - - - - - 

Notes to Grader:

- What works?

  The game should work as expected (with some noted exceptions).
  The functionality of the buttons is detailed above.
  The tiles can be dragged and dropped between the rack and
  the board. And tiles can be shifted around once placed.
  Words can only be built starting from the star square on the board.
  The score is calculated according to the data structure that was provided
  which corresponds to the number on the tiles. The double letter and double
  word score tiles are working.
  The blank tiles have also been implemented so that when one is played,
  a pop-up appears and allows the player to select which tile to replace
  the blank one with.

- What doesn't work?

  There is currently a bug where if the player plays a blank tile and there
  are no tiles left available, the popup box still appears (as a line) and
  can't be closed.

  Another bug: when a blank tile is played, the tile that replaces it is removed
  from the pool of available tiles. It should instead simply count the value for
  the selected tile, rather than also remove it from the playable pool.

  There is currently no way for the player to know how many of each tile is 
  still available.

- Other notes:
  
  The dictionary is a local dictionary file I uploaded with the project, rather
  than from /usr/share/dict/words
