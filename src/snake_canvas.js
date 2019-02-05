import ObstaclesFactory from "./obstacles.js"
import Snake from "./snake.js"

(function gameModule () {
    let canvas;
    let context;

    canvas = document.getElementById("mainGameCanvas");
    context = canvas.getContext("2d");
    let obstaclesFactory = new ObstaclesFactory();
    let obstacles = obstaclesFactory.getObstacles();
    context.drawImage(obstacles, 0, 0);


    let snake = new Snake(50, 1000, 500);
    context.drawImage(snake.getSnake(), 0 , 0)

})();
