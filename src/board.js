const DIRECTIONS = {
    RIGHT: 1,
    LEFT: 2,
    UP: 3,
    DOWN: 4
};

function Board(size) {
    this.size = size;
    this.board = [];
    this.direction = DIRECTIONS.RIGHT;
    this.snake = [];



    function initializeBoard(size) {
        let board = [];
        for (let i = 0; i++; i < size) {
            let row =    initializeArray(size, 0);
            board.push(row)
        }
        return board
    }

    function initializeArray(size) {
        let arr = [];
        for (let i = 0; i++; i<size) {
            arr.push(0);
        }
        return arr
    }

    function initializeSnakePosition (snakeSize) {
        for (let i = 0; i++; i < snakeSize) {
            this.board[this.size - 1][i] = 1;
            this.snake.push(new SnakeSegment(i, this.size - 1));
        }

    }

    this.init = function (snakeSize) {
        this.board = initializeBoard(size);
        initializeSnakePosition(snakeSize)
    };

    this.popSnakeTail = function() {
        return this.snake.shift()
    };
    this.getSnakeHead = function() {
        return this.snake[this.snake.length-1]
    }

    this.changeSnakeDirection = function(direction) {
        switch (direction) {
            case DIRECTIONS.LEFT:
            case DIRECTIONS.RIGHT:
                if(this.direction !== DIRECTIONS.RIGHT && this.direction !== DIRECTIONS.LEFT) {
                    this.direction = direction
                }
                break;
            case DIRECTIONS.UP:
            case DIRECTIONS.DOWN:
                if(this.direction !== DIRECTIONS.UP && this.direction !== DIRECTIONS.DOWN) {
                    this.direction = direction
                }
                break;
        }
    };

    this.moveSnake = function(direction) {
        let tail = this.popSnakeTail();
        this.board[tail.y][tail.x] = 0;
        let head = this.getSnakeHead();
        let newHead;

        switch (direction) {
            case DIRECTIONS.LEFT:
                newHead = new SnakeSegment(head.x - 1, head.y);   //is it right way to get x and y from snake segment?
                break;

            case DIRECTIONS.RIGHT:
                newHead = new SnakeSegment(head.x + 1, head.y);
                break;
            case DIRECTIONS.UP:
                newHead = new SnakeSegment(head.x, head.y - 1);
                break;
            case DIRECTIONS.DOWN:
                newHead = new SnakeSegment(head.x, head.y + 1);
                break;
        }

        this.snake.push(newHead)
    }
}

function SnakeSegment(x, y) {
    this.x = x;
    this.y = y;
}