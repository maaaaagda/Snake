import BoardObject from "./BoardObject"
import imageRepository from "./ImageRepository";

let Apple = Object.create(BoardObject);

Apple.new = function(x, y) {
    let newApple = Object.create(Apple);
    Apple.init(x, y);
    return newApple;
};

Apple.drawApple = function(context, segmentSize) {
    Apple.drawPicture(context, imageRepository.apple, segmentSize);
};
export default Apple