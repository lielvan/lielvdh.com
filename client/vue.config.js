const path = require('path');
process.env.VUE_APP_S3_BUCKET = 'us-east.lielvdh.com';

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081'
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}