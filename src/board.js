import { KEY_DIRECTIONS_CODES } from "./snake_canvas"
import { getRandomIntFromRange } from "./utils"

const BOARD_FIELDS = {
    EMPTY: 0,
    SNAKE: 1,
    APPLE: -1
};

function Board(size, context, segmentSize) {
    this.size = size;
    this.board = [];
    this.direction = KEY_DIRECTIONS_CODES.RIGHT;
    this.snake = [];
    this.context = context;
    this.segmentSize = segmentSize;
    this.gameOver = false;
    this.canChangeDirection = true;
    this.applesCount = 0;



    function initializeBoard(size) {
        let board = [];
        for (let i = 0; i < size; i++) {
            let row =  initializeArray(size);
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
            this.board[this.size - 1][i] = BOARD_FIELDS.SNAKE;
            let newSegment = new SnakeSegment(i, this.size - 1);
            this.snake.push(newSegment);
            newSegment.draw(this.context, "Green", this.segmentSize)
        }

    };

    this.init = function (snakeSize) {
        this.board = initializeBoard(this.size);
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
        console.log("Apples: ", this.applesCount);
        let head = this.getSnakeHead();
        let newHead;

        switch (this.direction) {
            case KEY_DIRECTIONS_CODES.LEFT:
                newHead = new SnakeSegment(head.x - 1, head.y);
                break;

            case KEY_DIRECTIONS_CODES.RIGHT:
                newHead = new SnakeSegment(head.x + 1, head.y);
                break;

            case KEY_DIRECTIONS_CODES.UP:
                newHead = new SnakeSegment(head.x, head.y - 1);
                break;

            case KEY_DIRECTIONS_CODES.DOWN:
                newHead = new SnakeSegment(head.x, head.y + 1);
                break;
        }

        if(!this.isGameOver(newHead)) {
            if(this.board[newHead.y][newHead.x] === BOARD_FIELDS.APPLE) {
                this.applesCount += 1;
                this.generateApple();

            }

            this.snake.push(newHead);
            this.board[newHead.y][newHead.x] = BOARD_FIELDS.SNAKE;
            newHead.draw(this.context, "Green", this.segmentSize);

            let tail = this.popSnakeTail();
            this.board[tail.y][tail.x] = BOARD_FIELDS.EMPTY;
            tail.clear(this.context, this.segmentSize);

            this.canChangeDirection = true;

        } else {
            this.gameOver = true
        }


    };
    this.isGameOver = function (newHead) {
        return !(this.board.length > newHead.y
        && newHead.y >= 0
        && this.board[newHead.y].length > newHead.x
        && newHead.x >= 0)
    };


    this.generateApple = function () {
        let appleFound = false;
        while (!appleFound) {
            let x = getRandomIntFromRange(0, this.board.length - 1);
            let y = getRandomIntFromRange(0, this.board.length - 1);
            if(this.board[y][x] === BOARD_FIELDS.EMPTY) {
                appleFound = true;
                this.board[y][x] = BOARD_FIELDS.APPLE;
                let apple = new Apple(x, y);
                apple.draw(this.context, "Red", this.segmentSize);
            }
        }
    };

    function SnakeSegment(x, y) {
        this.x = x;
        this.y = y;

        this.draw = function(context, color, segmentSize) {
            let canvas_snake_segment = document.createElement("canvas");
            canvas_snake_segment.width = segmentSize;
            canvas_snake_segment.height = segmentSize;

            let context_snake_segment = canvas_snake_segment.getContext("2d");
            context_snake_segment.fillStyle = color;
            context_snake_segment.strokeStyle = color;
            context_snake_segment.fillRect(0, 0, segmentSize, segmentSize);

            context.drawImage(canvas_snake_segment, this.x * segmentSize, this.y * segmentSize);
        };

        this.clear = function(context, segmentSize) {
            context.clearRect(this.x * segmentSize, this.y * segmentSize,  segmentSize, segmentSize);
        }
    }


    function Apple(x, y) {
        this.x = x;
        this.y = y;

        this.draw = function(context, color, segmentSize) {
            let canvas_apple_segment = document.createElement("canvas");
            canvas_apple_segment.width = segmentSize;
            canvas_apple_segment.height = segmentSize;

            let context_apple_segment = canvas_apple_segment.getContext("2d");
            context_apple_segment.fillStyle = color;
            context_apple_segment.strokeStyle = color;
            context_apple_segment.fillRect(0, 0, segmentSize, segmentSize);

            context.drawImage(canvas_apple_segment, this.x * segmentSize, this.y * segmentSize);
        };

        this.clear = function(context, segmentSize) {
            context.clearRect(this.x * segmentSize, this.y * segmentSize,  segmentSize, segmentSize);
        }
    }
}




export default Board;