module.exports = {
  development: {
    performance: {
      hints: false,
      maxAssetSize: 2000000
    }
  },
  production: {
    performance: {
      hints: 'error',
      maxEntrypointSize: 1500000
    },
    stats: {
      chunkModules: false,
      colors: true,
      chunks: false,
      children: false
    }
  },
  defaults: {
    stats: {
      chunkModules: false,
      colors: true,
      chunks: false
    },
    performance: {
      hints: 'warning'
    },
    vendors: [
      'react',
      'react-dom'
    ],
    postcss: [
      require('autoprefixer')({
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      })
    ]
  }
};
