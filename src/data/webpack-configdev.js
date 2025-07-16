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
    // TO-DO: Issue in dev mode: Object.defineProperty called on non-object
    // Can't import wpower.js (also packed by webpack)
    // Ref: https://github.com/webpack/webpack/issues/11277#issuecomment-787217906
    // Ref: https://stackoverflow.com/a/69200112/5581893
    mode: 'development', // development, production
    devServer: {
        // Must be false, 
        // or webpack-serve shows 'HMR is not implemented' error
        hot: false,
        host: '0.0.0.0', // Not working, still binds to Windows interface
        port: 8080,
        allowedHosts: 'all' // No help for binding
    },
    module: {
        rules: [{
            test:   /.html$/i,
            loader: "html-loader",
            options: {
                // Disables attributes processing (inc src="...")
                sources: false,
                minimize: false
            }
        },{
            test:   /.css$/i,
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