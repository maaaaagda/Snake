import ObstaclesFactory from "./obstacles.js"
import Board from "./Board"

export const KEY_DIRECTIONS_CODES = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
};


window.onload = function () {
    let canvas;
    let context;
    let speed =  10;
    let board;
    let boardWidth = 1000;
    let boardHeight = 500;
    let boardSizeHorizontally = 20;
    let boardSizeVertically = 10;
    let segmentSize = 50;
    let gameInfoDiv = document.getElementById("gameInfo");

    gameInfoDiv.style.width = boardWidth + "px";
    canvas = document.getElementById("mainGameCanvas");
    canvas.width = boardWidth;
    canvas.height = boardHeight;

    context = canvas.getContext("2d");
    board = new Board(boardSizeHorizontally,
        boardSizeVertically,
        segmentSize,
        context );
    board.init(3);



    document.addEventListener('keydown', function(e) {
            let keyCode = e.keyCode;
            if (Object.values(KEY_DIRECTIONS_CODES).includes(keyCode)) {
                e.preventDefault();
                board.changeSnakeDirection((keyCode))

            } else if(keyCode == 32 && board.gameOver) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                board = new Board(boardSizeHorizontally,
                    boardSizeVertically,
                    segmentSize,
                    context );
                board.init(3);
                render()
            }
        });


    function render () {
        let runGame = setInterval(() => {
            if(!board.gameOver) {
                    board.moveSnake();
                } else {
                    console.log("Game over");
                    clearInterval(runGame)
                }

        }, 20 * speed)

    }

    render()

};

