module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
        loaders: [
            { test: /\.json$/, rules: 'json-loader' },
          ]
    },
};