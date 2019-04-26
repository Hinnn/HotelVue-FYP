const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry:  {
    app: "./src/main.js"  //,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src')
    }
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:  "'production'"
      }
    }),
    new CleanWebpackPlugin( [ 'dist' ],
      { root: path.resolve(__dirname, '../') } ),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: '[hash].style.css'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })
        //  use: ['style-loader','css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        //test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000
        }
      }
    ]
  }
}
