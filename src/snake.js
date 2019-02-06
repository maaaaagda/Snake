
function Snake(size, x_max, y_max) {
    this.size = size;
    this.max_x = x_max || 1000;
    this.max_y = y_max || 500;
    this.color = "Green";
    this.speed = 3;

    function createSnake(context, x, y, w, h){
        context.fillRect(x, y, w, h);
    }

    this.getSnake = function() {
        let canvas_snake = document.createElement("canvas");
        canvas_snake.width = this.max_x;
        canvas_snake.height = this.max_y;
        let context_snake = canvas_snake.getContext("2d");
        context_snake.fillStyle = this.color;
        context_snake.strokeStyle = this.color;
        createSnake(context_snake, 0, this.max_y-this.size, this.size * 3, this.size);
        return canvas_snake
    }
}

export default Snake


// function Ship() {
//     this.speed = 3;
//     this.bulletPool = new Pool(30);
//     this.bulletPool.init();
//     var fireRate = 15;
//     var counter = 0;
//     this.draw = function() {
//         this.context.drawImage(imageRepository.spaceship, this.x, this.y);
//     };
//     this.move = function() {
//         counter++;
//         // Determine if the action is move action
//         if (KEY_STATUS.left || KEY_STATUS.right ||
//             KEY_STATUS.down || KEY_STATUS.up) {
//             // The ship moved, so erase it's current image so it can
//             // be redrawn in it's new location
//             this.context.clearRect(this.x, this.y, this.width, this.height);
//             // Update x and y according to the direction to move and
//             // redraw the ship. Change the else if's to if statements
//             // to have diagonal movement.
//             if (KEY_STATUS.left) {
//                 this.x -= this.speed
//                 if (this.x <= 0) // Keep player within the screen
//                     this.x = 0;
//             } else if (KEY_STATUS.right) {
//                 this.x += this.speed
//                 if (this.x >= this.canvasWidth - this.width)
//                     this.x = this.canvasWidth - this.width;
//             } else if (KEY_STATUS.up) {
//                 this.y -= this.speed
//                 if (this.y <= this.canvasHeight/4*3)
//                     this.y = this.canvasHeight/4*3;
//             } else if (KEY_STATUS.down) {
//                 this.y += this.speed
//                 if (this.y >= this.canvasHeight - this.height)
//                     this.y = this.canvasHeight - this.height;
//             }
//             // Finish by redrawing the ship
//             this.draw();
//         }
//         if (KEY_STATUS.space && counter >= fireRate) {
//             this.fire();
//             counter = 0;
//         }
//     };
//     /*
//      * Fires two bullets
//      */
//     this.fire = function() {
//         this.bulletPool.getTwo(this.x+6, this.y, 3,
//             this.x+33, this.y, 3);
//     };
// }
// Ship.prototype = new Drawable();