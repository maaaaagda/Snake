const path = require('path');

module.exports = {
    entry: './build/snake_canvas.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};