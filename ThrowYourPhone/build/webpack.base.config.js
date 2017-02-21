module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: './dist'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ "es2015", "stage-0" ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader?name=./[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
  },
};
