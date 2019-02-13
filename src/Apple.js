import BoardObject from "./BoardObject"
import imageRepository from "./ImageRepository";

let Apple = Object.create(BoardObject);

Apple.new = function(x, y) {
    let newApple = Object.create(Apple);
    newApple.init(x, y);
    return newApple;
};

Apple.draw = function(context, segmentSize) {
    this.drawPicture(context, imageRepository.apple, segmentSize);
};
export default Apple