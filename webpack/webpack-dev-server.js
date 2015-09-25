// jscs:disable
var colors = require('colors');
var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./dev.config'),
    host = process.env.HOST || 'localhost',
    port = parseInt(process.env.PORT) + 1 || 3001,
    serverOptions = {
      contentBase: 'http://' + host + ':' + port,
      quiet: true,
      noInfo: false,
      hot: true,
      inline: true,
      lazy: false,
      publicPath: config.output.publicPath,
      headers: {"Access-Control-Allow-Origin": "*"},
      stats: {colors: true}
    },
    compiler = webpack(config),
    webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(port, host, function() {
  console.log(colors.green('[INFO] ') + 'Webpack development server listening on %s:%s', host, port);
});