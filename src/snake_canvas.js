import ObstaclesFactory from "./obstacles.js"
import Snake from "./snake.js"
import Board from "./board"

(function gameModule () {
    let canvas;
    let context;
    let speed =  5;

    canvas = document.getElementById("mainGameCanvas");
    context = canvas.getContext("2d");
    // let obstaclesFactory = new ObstaclesFactory();
    // let obstacles = obstaclesFactory.getObstacles();
    // context.drawImage(obstacles, 0, 0);

    //
    // let snake = new Snake(50, 1000, 500);
    // context.drawImage(snake.getSnake(), 0 , 0);
    //
    let board = new Board(10, context, 50);
    board.init(3);

    //
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.changeSnakeDirection(3);
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.changeSnakeDirection(2);
    // board.moveSnake();
    // board.displayBoard();
    //
    // board.changeSnakeDirection(1);
    // board.moveSnake();
    // board.displayBoard();

    function render(direction) {
        var direction = direction
        var moveCount = 0
        setInterval(() => {
            board.moveSnake();
            if(moveCount % 3 == 0) {
                direction = (direction + 1) == 5 ? 1 : (direction + 1)
                board.changeSnakeDirection(direction);
            }

        }, 200 * speed)

    }

    render(1)
})();
