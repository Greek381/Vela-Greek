const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: devMode ? "[name].js" : "[name].[contenthash].js",
        assetModuleFilename: "assets/[name][ext][query]",
        publicPath: "",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src",
                            },
                            {
                                tag: "source",
                                attribute: "srcset",
                                type: "src",
                            },
                            {
                                tag: "link",
                                attribute: "href",
                                type: "src",
                            },
                        ],
                    },
                },
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("postcss-preset-env")],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext][query]",
                },
            },
            {
                test: /\.(jpe?g|png|webp|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "img/[name][ext]",
                },
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, "src/icons"),
                use: [
                    {
                    loader: "svg-sprite-loader",
                    options: {
                        extract: false, // Встраиваем спрайт в HTML
                        spriteFilename: "sprite.svg",
                        runtimeCompat: true,
                    }
                    },
                    {
                    loader: "svgo-loader",
                    options: {
                        plugins: [
                        { name: "removeTitle", active: true },
                        { name: "convertColors", params: { currentColor: true } },
                        { name: "removeAttrs", params: { attrs: "(fill|stroke)" } }
                        ]
                    }
                    }
                ]
                },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
};