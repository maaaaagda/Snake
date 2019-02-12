import BoardObject from "./BoardObject"
import SnakeSegment from "./SnakeSegment";

let Apple = Object.create(BoardObject);
Apple.new = function(x, y) {
    let newApple = Object.create(Apple);
    Apple.init(x, y);
    return newApple;
};
export default Apple