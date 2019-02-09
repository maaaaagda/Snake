import { getRandomIntFromRange } from "./utils";

function ObstaclesFactory(nr_of_obstacles, x_min, x_max, y_min, y_max, color) {
    this.nr_of_obstacles = nr_of_obstacles || 5;
    this.max_x = x_max || 1000;
    this.max_y = y_max || 500;
    this.min_x = x_min || 0;
    this.min_y = y_min || 0;
    this.max_obstacle_height = 200;
    this.max_obstacle_width = 200;
    this.obstacle_color = color || "Blue";



    function createObstacle(context, x, y, w, h){
        context.fillRect(x, y, w, h);
    }

    this.getObstacles = function () {
        let canvas_obstacle = document.createElement("canvas");
        canvas_obstacle.width = this.max_x;
        canvas_obstacle.height = this.max_y;
        let context_obstacle = canvas_obstacle.getContext("2d");
        context_obstacle.fillStyle = this.obstacle_color;
        context_obstacle.strokeStyle = this.obstacle_color;
        for(let i = 0; i < this.nr_of_obstacles; i++) {
            createObstacle(context_obstacle, getRandomIntFromRange(this.min_x, this.max_x),
                getRandomIntFromRange(this.min_y, this.max_y), Math.random()*this.max_obstacle_width, Math.random()*this.max_obstacle_height);
        }

        return canvas_obstacle

    }
}

export default ObstaclesFactory;