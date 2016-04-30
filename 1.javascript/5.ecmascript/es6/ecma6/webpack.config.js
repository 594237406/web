var webpack = require('webpack');
module.exports = {
    entry: [
//        'webpack/hot/only-dev-server',
        "./js/module.js"
    ],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
//            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.css$/, loader: "style!css" },
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};