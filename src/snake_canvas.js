import ObstaclesFactory from "./obstacles.js"
import Snake from "./snake.js"
import Board from "./board"

export const KEY_DIRECTIONS_CODES = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
};


(function gameModule () {
    let canvas;
    let context;
    let speed =  10;
    let board;

    canvas = document.getElementById("mainGameCanvas");
    context = canvas.getContext("2d");
    board = new Board(10, context, 50);
    board.init(3);

    document.addEventListener('keydown', function(e) {
            let keyCode = e.keyCode;
            if (Object.values(KEY_DIRECTIONS_CODES).includes(keyCode)) {
                e.preventDefault();
                board.changeSnakeDirection((keyCode))

            } else if(keyCode == 32 && board.gameOver) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                board = new Board(10, context, 50);
                board.init(3);
                render()
            }
        });


    function render() {
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

})();
