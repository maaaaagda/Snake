function ImageRepository () {
    this.apple = new Image();
    this.snake_segment = new Image();

    this.apple.src = "./pictures/Apple.svg";
    this.snake_segment.src = "./pictures/SnakeSegment.svg"

}
let imageRepository = new ImageRepository();
export default imageRepository