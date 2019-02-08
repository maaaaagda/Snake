const DIRECTIONS = {
    RIGHT: 1,
    LEFT: 2,
    UP: 3,
    DOWN: 4
};

function Board(size, context, segmentSize) {
    this.size = size;
    this.board = [];
    this.direction = DIRECTIONS.RIGHT;
    this.snake = [];
    this.context = context;
    this.segmentSize = segmentSize;



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
            arr.push(0);
        }

        return arr
    }

    this.initializeSnakePosition = function(snakeSize) {
        for (let i = 0; i < snakeSize; i++) {
            this.board[this.size - 1][i] = 1;
            let newSegment = new SnakeSegment(i, this.size - 1)
            this.snake.push(newSegment);
            newSegment.draw(this.context, "Green", this.segmentSize)
        }

    };

    this.init = function (snakeSize) {
        this.board = initializeBoard(this.size);
        this.initializeSnakePosition(snakeSize);
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

    this.moveSnake = function() {
        let tail = this.popSnakeTail();
        this.board[tail.y][tail.x] = 0;
        tail.clear(this.context, this.segmentSize);
        let head = this.getSnakeHead();
        let newHead;

        switch (this.direction) {
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
        this.snake.push(newHead);
        this.board[newHead.y][newHead.x] = 1;
        newHead.draw(this.context, "Green", this.segmentSize)
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
}




export default Board;