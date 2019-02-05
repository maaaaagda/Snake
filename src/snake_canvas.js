import ObstaclesFactory from "/obstacles.js"

(function gameModule () {
    let canvas;
    let context;

    canvas = document.getElementById("mainGameCanvas");
    context = canvas.getContext("2d");

    let obstacles = ObstaclesFactory.getObstacles();
    console.log("obst", obstacles)
    //context.drawImage(obstacles, 0, 0);

})();
