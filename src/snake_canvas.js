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
    let board;
    let speed =  10;
    let sizeCoefficient = 13;
    let segmentSize = Math.floor(Math.min(window.innerWidth/sizeCoefficient, innerHeight/sizeCoefficient));
    let boardSizeHorizontally = Math.floor(0.8 * window.innerWidth / segmentSize);
    let boardSizeVertically = Math.floor(0.6 * window.innerHeight / segmentSize);
    let boardWidth = boardSizeHorizontally  * segmentSize;
    let boardHeight = boardSizeVertically * segmentSize;


    changeHtmlStylingBasedOnBoardSize(boardWidth);


    let pointsDiv = document.getElementById("points");
    let startGameButton = document.getElementById("play")

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

    startGameButton.addEventListener("click", () => {
        render();
        startGameButton.style.visibility = "hidden";
        canvas.style.opacity = "1"
    });

    function render () {
        let runGame = setInterval(() => {
            if(!board.gameOver) {
                    board.moveSnake();
                } else {
                    clearInterval(runGame)
                }

        }, 20 * speed);
        let updateStatisticsInterval = setInterval(() => {
            if(!board.gameOver){
                updateStatistics(board.points)
            } else {
                clearInterval(updateStatisticsInterval)
            }
        }, 10)

    }

    function changeHtmlStylingBasedOnBoardSize(boardWidth) {
        let gameInfoDiv = document.getElementById("gameInfo");
        let gameStatisticsDiv = document.getElementById("gameStatistics");

        gameInfoDiv.style.width = Math.round(boardWidth/2) + "px";
        gameStatisticsDiv.style.width = Math.round(boardWidth/2) + "px";
    }

    function updateStatistics(pointsNr) {
        pointsDiv.innerText = pointsNr
    }


};

