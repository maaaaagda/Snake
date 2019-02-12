import BoardObject from "./BoardObject"

let SnakeSegment = Object.create(BoardObject);

SnakeSegment.new = function(x, y) {
    let newSegment = Object.create(SnakeSegment);
    newSegment.init(x, y);
    return newSegment;
};

export default SnakeSegment