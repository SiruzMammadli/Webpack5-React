const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (_, argv) => {
  const prod = argv.mode === "production";

  const config = {
    mode: argv.mode ?? "none",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          // parser: {
          //   dataUrlCondition: {
          //     maxSize: 30 * 1024,
          //   },
          // },
        },
        {
          test: /\.svg$/i,
          type: "asset",
          // resourceQuery: { not: [/c/] },
        },
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            prod
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: "" },
                }
              : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      ...(prod ? [new CleanWebpackPlugin()] : []),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        minify: true,
      }),
      ...(!prod ? [new ReactRefreshWebpackPlugin()] : []),
    ],
    optimization: {
      minimize: true,
      minimizer: prod ? [new TerserPlugin()] : [],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: false,
    devServer: {
      static: {
        directory: "dist/",
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
  };
  return config;
};
