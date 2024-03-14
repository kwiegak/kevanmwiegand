// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.bundle.js'
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  stats: {
    children: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.tsx",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
          loader: "file-loader",
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, '/src'),
      }
    ],
  },
  resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json']
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
