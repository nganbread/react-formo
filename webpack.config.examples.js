const { resolve } = require('path');
const webpack = require('webpack');
const entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
];

module.exports = {
    entry: {
        index: [...entry, '../examples/index.js']
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            resolve(__dirname, 'src'),
        ],
        alias: {
            'react-formo': '../src/react-formo.js'
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: '/examples/',
        publicPath: '/'
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'examples'),
        publicPath: '/'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader',
            ],
            exclude: /node_modules/
        }],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
};