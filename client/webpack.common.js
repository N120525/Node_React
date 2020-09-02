var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          },
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader","sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
         loader: 'url-loader?limit=100000'
       }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
     
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // new WorkboxPlugin.GenerateSW({
    // swDest: 'custom-sw-name.js',
    // clientsClaim: true,
    // skipWaiting: true,
    //   // Do not precache images
    //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    //   // Define runtime caching rules.
    //   runtimeCaching: [{
    //     // Match any request that ends with .png, .jpg, .jpeg or .svg.
    //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    //     // Apply a cache-first strategy.
    //     handler: 'CacheFirst',

    //     options: {
    //       // Use a custom cache name.
    //       cacheName: 'images',

    //       // Only cache 10 images.
    //       expiration: {
    //         maxEntries: 10,
    //       },
    //     },
    //   }],
    // })
  ],
  
  resolve: {
    extensions: ['.', '.js', '.jsx', '.tsx']
  }
};