const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const CopyPlugin            = require("copy-webpack-plugin");
const CssMinimizerPlugin            = require("css-minimizer-webpack-plugin");
const TerserPlugin            = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    //attributes: false,
                    sources: false,
                    minimize: true,
                },
                
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{ loader: 'file-loader' }]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi webpack App',
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [{ from: "src/assets/", to: "assets/" }]
        }),
    ]
}
