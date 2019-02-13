import BoardObject from "./BoardObject"
import imageRepository from "./ImageRepository";

let SnakeSegment = Object.create(BoardObject);

SnakeSegment.new = function(x, y) {
    let newSegment = Object.create(SnakeSegment);
    newSegment.init(x, y);
    return newSegment;
};

SnakeSegment.draw = function(context, segmentSize) {
    this.drawPicture(context, imageRepository.snake_segment, segmentSize);
};

export default SnakeSegment