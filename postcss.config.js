module.exports =  ({ file, options, env }) => ({
  plugins: {
    'postcss-import': {}, // css-loader handles @import no need for this plugin in webpack
    'postcss-cssnext': {},
    'cssnano':  env === 'production'  ? {} : false
  },
});
