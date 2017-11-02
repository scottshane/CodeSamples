document.addEventListener('DOMContentLoaded', function(){ 
    
    var emptyTileElement = document.createElement('li')
        , puzzleboard = []
        , columms     = 3
        , rows        = 3
        , incr        = 0
        , tiles       = []
        , tileWidth   = 0
        , tileHeight  = 0;

    emptyTileElement.classList.add('Tile', 'empty');
    document.querySelector('.SlidingPuzzle').appendChild(emptyTileElement);
    tiles      = Array.prototype.slice.call(document.querySelectorAll('.Tile'));
    tileWidth  = tiles[0].offsetWidth;
    tileHeight = tiles[0].offsetHeight;

    //build puzzleboard array
    for(var rowIdx = 0; rowIdx < rows; rowIdx++) {
        puzzleboard[rowIdx] = [];
        for(var colIdx = 0; colIdx < columms; colIdx++) {
            puzzleboard[rowIdx][colIdx] = tiles[incr];
            incr++;
        }
    }

    // set x/y coods. Before changing position to absolute
    // to maintain accurate coords.
    tiles.forEach(function(tile){
        tile.style.top  = tile.offsetTop + "px";
        tile.style.left = tile.offsetLeft + "px";
    });

    //convert positioning to absolute
    tiles.forEach(function(tile){
        tile.style.position = "absolute";
        tile.classList.add('xy');

        tile.addEventListener('click', function (evt) {
            var emptyTile         = document.querySelector('.empty')
                , tileRowPos      = this.offsetTop/this.offsetWidth
                , emptyTileRowPos = emptyTile.offsetTop/emptyTile.offsetWidth
                , tileColPos      = this.offsetLeft/this.offsetWidth
                , emptyTileColPos = emptyTile.offsetLeft/emptyTile.offsetWidth
                , cIdx
                , rIdx;

            //Is the selected tile in the same row as the emptyTile?
            if(emptyTile.offsetTop === this.offsetTop) {

                // Determine which direction to move
                if(tileColPos > emptyTileColPos){

                    // Left
                    for(cIdx = emptyTileColPos; cIdx < tileColPos; cIdx++){
                        puzzleboard[tileRowPos][cIdx] = puzzleboard[tileRowPos][cIdx + 1];
                    }

                    puzzleboard[tileRowPos][tileColPos] = emptyTile;
                    

                } else {
                    // Right
                    for(cIdx = emptyTileColPos; cIdx > tileColPos; cIdx--){
                        puzzleboard[tileRowPos][cIdx] = puzzleboard[tileRowPos][cIdx - 1];
                    }

                    puzzleboard[tileRowPos][tileColPos] = emptyTile;
                }

                // Update styles
                for(cIdx = 0; cIdx < columms; cIdx++){
                    puzzleboard[tileRowPos][cIdx].style.left = (tileWidth * cIdx)+ 'px';
                }
            }

            //Is the selected tile in the same column as the emptyTile?
            if(emptyTile.offsetLeft === this.offsetLeft) {

                // Determine which direction to move
                if(tileRowPos > emptyTileRowPos) {
                    
                    // Up
                    for(rIdx = emptyTileRowPos; rIdx < tileRowPos; rIdx++){
                        puzzleboard[rIdx][tileColPos] = puzzleboard[rIdx + 1][tileColPos];
                    }

                    puzzleboard[rIdx][tileColPos] = emptyTile;

                } else {

                    //Down
                    for(rIdx = emptyTileRowPos; rIdx > tileRowPos; rIdx--){
                        puzzleboard[rIdx][tileColPos] = puzzleboard[rIdx - 1][tileColPos];
                    }

                    puzzleboard[rIdx][tileColPos] = emptyTile;
                }
                // Update styles
                for(rIdx = 0; rIdx< rows; rIdx++) {
                    puzzleboard[rIdx][tileColPos].style.top = (tileHeight * rIdx)+ 'px';

                }
            }
        });
    });
});
