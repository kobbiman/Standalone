'use strict';

require('babel-loader');
var path = require('path');
var webpack = require('webpack');
var del = require('del');

class CleanPlugin {
    constructor(options) {
        this.options = options;
    }

    apply () {
        del.sync(this.options.files);
    }
}

module.exports = {
    entry: './src/standalone.js',
    output: {
        path: __dirname + '/dist',
        filename: 'standalone.min.js',
        library: 'standalone',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanPlugin({
            files: ['dist/*']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: [
                        ['transform-object-assign']
                    ]
                }
            }
        ]
    }
};
