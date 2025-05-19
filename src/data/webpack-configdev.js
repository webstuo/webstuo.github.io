export default
`const path = require("path");

module.exports = {
    experiments: {
        outputModule: true // To enable MJS
    },
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        module: true, // To parse as MJS
        libraryTarget: 'module' // To export as MJS
    },
    mode: 'development', // development, production
    devServer: {
        // Must be false, 
        // or webpack-serve shows 'HMR is not implemented' error
        hot: false 
    },
    module: {
        rules: [{
            test:   /\.html$/i,
            loader: "html-loader",
            options: {
                // Disables attributes processing (inc src="...")
                sources: false,
                minimize: false
            }
        },{
            test:   /\.css$/i,
            loader: "css-loader",
            options:{
                // Disable parsing url in CSS, no known domain yet
                url: false
            }
        }],
        parser: {
            javascript: {
                importMeta: false
            }
        }
    }
};`;
// EOF