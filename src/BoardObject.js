let BoardObject = {
    init: function (x, y) {
        this.x = x;
        this.y = y;
    },
    draw: function (context, color, segmentSize) {
        let canvas = document.createElement("canvas");
        canvas.width = segmentSize;
        canvas.height = segmentSize;

        let context_board_object = canvas.getContext("2d");
        context_board_object.fillStyle = color;
        context_board_object.strokeStyle = color;
        context_board_object.fillRect(0, 0, segmentSize, segmentSize);

        context.drawImage(canvas, this.x * segmentSize, this.y * segmentSize);
    },
    drawPicture: function(context, picture, segmentSize) {
        context.drawImage(picture, this.x * segmentSize, this.y * segmentSize, segmentSize, segmentSize)
    },
    clear: function (context, segmentSize) {
        context.clearRect(this.x * segmentSize, this.y * segmentSize, segmentSize, segmentSize);
    }
};

export default BoardObject