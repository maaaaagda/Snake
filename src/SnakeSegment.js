import BoardObject from "./BoardObject"

function SnakeSegment(x, y) {
    BoardObject.call(this, x, y)
}

SnakeSegment.prototype = Object.create(BoardObject.prototype);


export default SnakeSegment