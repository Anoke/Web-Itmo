const path = require("path");
module.exports = {
    entry: './Scripts/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }
}