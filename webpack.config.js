require('babel-loader');

module.exports = {
    entry: './src/standalone.js',
    output: {
        path: __dirname + '/dist',
        filename: 'standalone.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};