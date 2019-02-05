function ObstaclesFactory() {
    this.nr_of_obstacles = 3;
    this.max_x = 200;
    this.max_y = 300;
    this.min_x = 0;
    this.min_y = 0;

    function createObstacle(context, x, y, w, h){
        context.fillRect(x, y, w, h);
    }


    this.getObstacles = function () {
        let canvas_obstacle = document.createElement("canvas");
        canvas_obstacle.width = 1000;
        canvas_obstacle.height = 500;
        let context_obstacle = canvas_obstacle.getContext("2d");
        context_obstacle.fillStyle = "Blue";
        context_obstacle.strokeStyle = "Yellow";
        for(let i = 0; i < this.nr_of_obstacles; i++) {
            let obstacle = createObstacle(context_obstacle, (Math.random() * this.min_x)% this.max_x,
                (Math.random() * this.min_y)% this.max_y, Math.random()*200, Math.random()*200);
        }

        return canvas_obstacle

    }
}

export default ObstaclesFactory;