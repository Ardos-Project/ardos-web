const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const {EsbuildPlugin} = require("esbuild-loader");

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = !isEnvProduction;

// Try the environment variable, otherwise use root.
const ASSET_PATH = process.env.ASSET_PATH || "/";

const WebpackConfig = {
    entry: "./src/index.tsx",
    output: {
        publicPath: ASSET_PATH,
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[contenthash].bundle.js",
    },
    mode: isEnvProduction ? "production" : "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: "esbuild-loader",
                options: {
                    target: "es2015"
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource",
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    stats: isEnvDevelopment
        ? {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true,
        }
        : {},
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, "./static"),
        open: true,
        hot: true,
        port: 8000,
        client: {
            overlay: {
                runtimeErrors: (error) => {
                    // TODO: What the hell is causing this??
                    // Seems to be an annoying benign runtime error in dev.
                    // Started appearing as of March 2023.
                    // See: https://stackoverflow.com/questions/75774800/how-to-stop-resizeobserver-loop-limit-exceeded-error-from-appearing-in-react-a
                    return (error.message !== "ResizeObserver loop limit exceeded" &&
                        error.message !== "ResizeObserver loop completed with undelivered notifications."
                    );
                }
            }
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@context": path.resolve(__dirname, "src/context"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@routes": path.resolve(__dirname, "src/routes"),
            "@components": path.resolve(__dirname, "src/components"),
            "@util": path.resolve(__dirname, "src/util"),
        },
    },
    plugins: [
        isEnvDevelopment && new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            publicPath: ASSET_PATH,
            minify: false,
        }),
        new CleanWebpackPlugin(),
        isEnvProduction && new CopyPlugin({
            patterns: [
                {
                    from: "static",
                },
            ],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
            React: "react",
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": JSON.stringify(isEnvProduction),
            "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
            "process.env.DEV_LOG": JSON.stringify(process.env.DEV_LOG),
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css",
        }),
    ].filter(Boolean),
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                target: "es2015",
            }),
        ],
    },
};

module.exports = WebpackConfig;
