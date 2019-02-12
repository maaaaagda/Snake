import BoardObject from "./BoardObject"

function Apple(x, y) {
    BoardObject.call(this, x, y)
}

Apple.prototype = Object.create(BoardObject.prototype);


export default Apple