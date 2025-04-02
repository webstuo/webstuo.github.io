const path = require('path');

module.exports = {
    entry: './lib.js', // Entry point for your application
    output: {
        libraryTarget:"module",
        filename: 'main.js', // Output file name with .mjs extension
        path: path.resolve(__dirname, 'dist'), // Output directory
        module: true, // Specifies that the output is an ES module
    },
    experiments: {
        outputModule: true, // Enables the 'module' feature for output
    },
    mode: 'production', // Use 'production' for optimized builds
};
