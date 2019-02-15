import { KEY_DIRECTIONS_CODES } from "./snake_canvas"
import { getRandomIntFromRange } from "./utils"
import Apple from "./Apple"
import SnakeSegment from "./SnakeSegment"

const BOARD_FIELDS = {
    EMPTY: 0,
    SNAKE: 1,
    APPLE: -1
};

function Board(sizeHorizontally, sizeVertically, segmentSize, context) {
    this.sizeHorizontally = sizeHorizontally;
    this.sizeVertically = sizeVertically;
    this.board = [];
    this.direction = KEY_DIRECTIONS_CODES.RIGHT;
    this.snake = [];
    this.context = context;
    this.segmentSize = segmentSize;
    this.gameOver = false;
    this.canChangeDirection = true;
    this.points = 0;



    function initializeBoard(sizeH, sizeV) {
        let board = [];
        for (let i = 0; i < sizeV; i++) {
            let row =  initializeArray(sizeH);
            board.push(row)
        }
        return board
    }

    function initializeArray(size) {
        let arr = [];
        for (let i = 0; i<size; i++) {
            arr.push(BOARD_FIELDS.EMPTY);
        }

        return arr
    }

    this.initializeSnakePosition = function(snakeSize) {
        for (let i = 0; i < snakeSize; i++) {
            this.board[this.sizeVertically - 1][i] = BOARD_FIELDS.SNAKE;
            let newSegment = SnakeSegment.new(i, this.sizeVertically - 1);
            this.snake.push(newSegment);
            newSegment.draw(this.context, this.segmentSize)
        }

    };

    this.init = function (snakeSize) {
        this.board = initializeBoard(this.sizeHorizontally, this.sizeVertically);
        this.initializeSnakePosition(snakeSize);
        this.generateApple();
    };

    this.popSnakeTail = function() {
        return this.snake.shift()
    };

    this.getSnakeHead = function() {
        return this.snake[this.snake.length-1]
    };

    this.displayBoard = function() {
      this.board.forEach(row => {
          console.log(row)
      })
    };

    this.changeSnakeDirection = function(direction) {
        if (this.canChangeDirection) {
            switch (direction) {
                case KEY_DIRECTIONS_CODES.LEFT:
                case KEY_DIRECTIONS_CODES.RIGHT:
                    if(this.direction !== KEY_DIRECTIONS_CODES.RIGHT && this.direction !== KEY_DIRECTIONS_CODES.LEFT) {
                        this.direction = direction
                    }
                    break;
                case KEY_DIRECTIONS_CODES.UP:
                case KEY_DIRECTIONS_CODES.DOWN:
                    if(this.direction !== KEY_DIRECTIONS_CODES.UP && this.direction !== KEY_DIRECTIONS_CODES.DOWN) {
                        this.direction = direction
                    }
                    break;
            }
            this.canChangeDirection = false
        }
    };

    this.moveSnake = function() {
        console.log("Apples: ", this.points);
        let head = this.getSnakeHead();
        let newHead;

        switch (this.direction) {
            case KEY_DIRECTIONS_CODES.LEFT:
                newHead = SnakeSegment.new(head.x - 1, head.y);
                break;

            case KEY_DIRECTIONS_CODES.RIGHT:
                newHead = SnakeSegment.new(head.x + 1, head.y);
                break;

            case KEY_DIRECTIONS_CODES.UP:
                newHead = SnakeSegment.new(head.x, head.y - 1);
                break;

            case KEY_DIRECTIONS_CODES.DOWN:
                newHead = SnakeSegment.new(head.x, head.y + 1);
                break;
        }

        if(!this.isGameOver(newHead)) {
            if(this.board[newHead.y][newHead.x] === BOARD_FIELDS.APPLE) {
                this.points += 1;
                this.generateApple();
            } else {
                let tail = this.popSnakeTail();
                this.board[tail.y][tail.x] = BOARD_FIELDS.EMPTY;
                tail.clear(this.context, this.segmentSize);
            }

            this.snake.push(newHead);
            this.board[newHead.y][newHead.x] = BOARD_FIELDS.SNAKE;
            newHead.draw(this.context, this.segmentSize);



            this.canChangeDirection = true;

        } else {
            this.gameOver = true
        }


    };
    this.isGameOver = function (newHead) {
        return !(this.board.length > newHead.y
        && newHead.y >= 0
        && this.board[newHead.y].length > newHead.x
        && newHead.x >= 0
        && this.board[newHead.y][newHead.x] !== BOARD_FIELDS.SNAKE)
    };


    this.generateApple = function () {
        let appleFound = false;
        while (!appleFound) {
            let x = getRandomIntFromRange(0, this.board.length - 1);
            let y = getRandomIntFromRange(0, this.board.length - 1);
            if(this.board[y][x] === BOARD_FIELDS.EMPTY) {
                appleFound = true;
                this.board[y][x] = BOARD_FIELDS.APPLE;
                let apple = Apple.new(x, y);
                apple.draw(this.context, this.segmentSize);
            }
        }
    };

}

export default Board;