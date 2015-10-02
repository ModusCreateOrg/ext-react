/* eslint no-console:0 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: !process.env.PORT,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
}).listen(process.env.PORT || 3000, function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening...');
});
