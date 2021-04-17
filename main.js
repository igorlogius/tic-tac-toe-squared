
var tinyBoard = function() {

    // Empty Cells
    var size = 3;
    var board = new Array(size);

    // init
    for (var i=0; i<size; i++) {
        board[i] = new Array(size);
    }

    /**
     *
     */
    var reset = function() {
        for(var i=0;i<size;i++) {
            for(var j=0;j<size;j++) {
                board[i][j] = ' ';
            }
        }
    };

    /**
     *
     */
    var getWinner = function() {
        var sym;
        var syms = ['X','O'];
        for (var i=0;i< syms.length; i++ ) {
            sym = syms[i];
            if(
            // horizontal
                board[0][0] === sym && // X X X
                board[1][0] === sym && // - - -
                board[2][0] === sym    // - - -
            ){
                return sym;
            }
            if(
                board[0][1] === sym && // - - -
                board[1][1] === sym && // X X X
                board[2][1] === sym    // - - -
            ){
                return sym;
            }
            if(
                board[0][2] === sym && // - - -
                board[1][2] === sym && // - - -
                board[2][2] === sym    // X X X
            ){
                return sym;
            }
                if(
            // vertical
                board[0][0] === sym && // X - -
                board[0][1] === sym && // X - -
                board[0][2] === sym    // X - -
            ){
                return sym;
            }
            if(
                board[1][0] === sym && // - X -
                board[1][1] === sym && // - X -
                board[1][2] === sym    // - X -
            ){
                return sym;
            }
            if(
                board[2][0] === sym && // - - X
                board[2][1] === sym && // - - X
                board[2][2] === sym    // - - X
            ){
                return sym;
            }
            if(
            // diagonal
                board[0][0] === sym && // X - -
                board[1][1] === sym && // - X -
                board[2][2] === sym    // - - X
            ){
                return sym;
            }
            if(
                board[2][0] === sym && // - - X
                board[1][1] === sym && // - X -
                board[0][2] === sym    // X - -
            ){
                return sym;
            }
        }
        return undefined;
    };

    var get1stLine = function() {
        return "[" + board[0][0] + "]" + "[" + board[1][0] + "]" + "[" + board[2][0] + "]";
    };

    var get2ndLine = function() {
        return "[" + board[0][1] + "]" + "[" + board[1][1] + "]" + "[" + board[2][1] + "]";
    };

    var get3rdLine = function() {
        return "[" + board[0][2] + "]" + "[" + board[1][2] + "]" + "[" + board[2][2] + "]";
    };

    /**
     * @param {int} x,y
     * @param {char} val 'X' or 'O'
     *
     * return {boolean} true when board (state) was modified
     *
     */
    var set = function(x,y,val) {
        // check if val is allowed
        if(val === 'X' ||
           val === 'O') {
            // if (x and y are in bounds
            if(x >= 0 && x < 3 &&
               y >= 0 && y < 3
              ){ // if cell is free
                  if(board[x][y] !== 'X' &&
                     board[x][y] !== 'O'
                    ) { // no winner yet
                        if( getWinner() === undefined ){
                            // => set cell to val
                            board[x][y] = val;
                            return true;
                        }
                    }else{
                        console.log("cell is taken by", getWinner());
                    }
              }else{
                  console.log("coordinates out of bounds",x,y);
              }
        }else{
            console.log("invalid value ",val);
        }
        // state not modified
        return false;
    };

    // reset on
    reset();

    return {
        reset: reset,
        set: set,
        getWinner: getWinner,
        get1stLine: get1stLine,
        get2ndLine: get2ndLine,
        get3rdLine: get3rdLine,
    };

};

/**
 *
 */
var Board = function(id) {

    var currentPlayerSymbol = 'X';
    var nextCell = { x:-1, y:-1};
    var cls = document.querySelectorAll(".cell td");
    console.log(cls.length);

    var highlightNextCell = function() {
    
        var cls = document.querySelectorAll(".cell");

        if(nextCell.x === -1 || nextCell.y === -1) {
            // highlight entire board 
            for(var i=0;i<cls.length;i++) {
                cls[i].style.background = 'yellow';
            }
            return;
        } 
        //
        // hightlight NextCell
        //
        for(var i=0;i<cls.length;i++) {
            if(i === (nextCell.x + 3*nextCell.y)) {
                cls[i].style.background = 'yellow';
            }else{
                cls[i].style.background = 'white';
            }
        }
    };
    
    function alertRowCell(e) {
        var cell = e.target || window.event.srcElement;
        //alert(cell.cellIndex + ' : ' + cell.parentNode.rowIndex);
        var x1 = cell.cellIndex;
        var y1 = cell.parentNode.rowIndex;
        var x = cell.parentElement.parentElement.parentElement.parentElement.cellIndex;
        var y = cell.parentElement.parentElement.parentElement.parentElement.parentElement.rowIndex;
        var sym = currentPlayerSymbol;
        if(set(x,y,x1,y1)) {
            cell.innerHTML = sym;
        }
    }

    for(var i=0;i<cls.length;i++) {
        if(cls[i].addEventListener) {
            cls[i].addEventListener("click", alertRowCell,false);
        }else if(cls[i].attachEvent) {
            cls[i].attachEvent("onclick", alertRowCell);
        }
    }

    //


    // Empty Cells
    var board = new Array(3);
    for (i=0;i<3;i++) {
        board[i] = new Array(3);
    }

    for(i=0;i<3;i++) {
        for(var j=0;j<3;j++) {
            board[i][j] = tinyBoard();
        }
    }

    var reset = function() {
        //
        var cls = document.querySelectorAll("table td table td");
        for(var i=0;i<cls.length;i++) {
            cls[i].innerHTML = ' ';
        }
        //
        for(i=0;i<3;i++) {
            for(var j=0;j<3;j++) {
                board[i][j].reset();
            }
        }

        nextCell.x = -1;
        nextCell.y = -1;
        highlightNextCell();

        currentPlayerSymbol = 'X';
    };

    /**
     * @param {int} x,y
     * return {boolean} true when board (state) was modified
     */
    var set = function(x,y,x1,y1) {

        if(arguments.length === 2) {
           x1 = x;
           y1 = y;
           x = nextCell.x;
           y = nextCell.y;
        }

        if((nextCell.x === -1 &&  nextCell.y === -1) ||
           (nextCell.x === x && nextCell.y === y)
          ){
              // check if val is allowed
              if(currentPlayerSymbol === 'X' || currentPlayerSymbol === 'O') {
                  // if (x and y are in bounds
                  if( x >= 0 && x < 3 &&
                     y >= 0 && y < 3
                    ) {
                        // if board is not finished
                        if( board[x][y].getWinner() === undefined ){
                            // pass to tinyBoard
                            var ret = board[x][y].set(x1,y1,currentPlayerSymbol);
                            if(ret) {

                                // toggle playersymbol after modification
                                currentPlayerSymbol = (currentPlayerSymbol !== 'X')? 'X': 'O';

                                // set next cell
                                nextCell.x = x1;
                                nextCell.y = y1;

                                // when next cell is won give unset all cells for next move
                                if(board[x1][y1].getWinner() !== undefined) {
                                    nextCell.x = -1;
                                    nextCell.y = -1;
                                }
                                
                                // hightlight nextCell
                                highlightNextCell(); 
                                //print();
                            }
                            return ret;
                        }
                    }else {
                        console.log("coordinates out of bounds");
                    }
              }else{
                  console.log("invalid input");
              }
          }else{
              console.log("invalid next cell");
          }
          return false;
    };

    /**
     *
     */
    var print = function() {

        console.log("--------- o --------- o ---------");
        for(var i=0;i<3;i++) {

            console.log(
                board[0][i].get1stLine() +
                    " | " +
                    board[1][i].get1stLine() +
                    " | " +
                    board[2][i].get1stLine()
            );
            console.log(
                board[0][i].get2ndLine() +
                    " | " +
                    board[1][i].get2ndLine() +
                    " | " +
                    board[2][i].get2ndLine()
            );
            console.log(
                board[0][i].get3rdLine() +
                    " | " +
                    board[1][i].get3rdLine() +
                    " | " +
                    board[2][i].get3rdLine()
            );
            console.log("--------- o --------- o ---------");
        }

        console.log("Next Cell: ", nextCell);
    };

    reset();

    return {
        reset: reset,
        set: set,
        print: print,
    };

};
