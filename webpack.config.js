const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',   
   },
   devServer: {
    static: './dist',
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: "./src/index.html",

      title: 'JS Capstone Group Project',

    }),

  ],
   output: {
     filename: 'index.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
       {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

      },
    ],
  },
 };
