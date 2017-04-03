const debug = require('debug')('app:webpack:loaders');
const env = require('../base-config/environment');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = env.isDev;
const isProd = env.isProd;
module.exports = () => {
  const rules = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader' }]
  }, {
    test: /\.json$/,
    use: [{ loader: 'json-loader' }]
  },{
    test: /\.(css)$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          minimize: isProd,
          sourceMap: !isProd,
          modules: true
        }
      }, 'postcss-loader'
    ]
  }, {
    test: /\.(less)$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          minimize: isProd,
          sourceMap: !isProd
        }
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: !isProd
        }
      }
    ]
  }, {
    test: /\.(png|jpg)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }]
  }];
  if (!isDev) {
    debug('Apply ExtractTextPlugin to CSS loaders.');
    rules.filter(rule => rule.use && rule.use.find(loaderObj => /css/.test(loaderObj.loader.split('?')[0])))
      .forEach((rule) => {
        const first = rule.use[0];
        const rest = rule.use.slice(1);
        rule.loader = ExtractTextPlugin.extract({ fallbackLoader: first, loader: rest });
        delete rule.use;
      });
  }
  return rules;
};
