/* eslint-disable */
const path = require('path')
const webpack = require('webpack')

const ENVIRONMENT = process.env.NODE_ENV
const PRODUCTION = ENVIRONMENT === 'production'

const library = 'react-editable-treeview'
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`

const PLACEHOLDER = 'PLACEHOLDER'

const bundle = {
  entry: PLACEHOLDER,
  externals: { react: 'React' },
  module: {
    loaders: [{
      test:    /\.js$/,
      loader:  'babel-loader',
      exclude: /node_modules/,
    }],
  },
  output: {
    filename: PLACEHOLDER,
    library:  PLACEHOLDER,
    path:     PLACEHOLDER,
    libraryTarget:  'umd',
    umdNamedDefine: true,
  },
  plugins: [],
}

const uglify = new webpack.optimize.UglifyJsPlugin({ minimize: true })

module.exports = [
  Object.assign({}, bundle, {
    /* Main Bundle */
    entry: `${__dirname}/src/components/TreeView.js`,
    output: Object.assign({}, bundle.output, {
      filename: ['react-editable-treeview', (PRODUCTION ? '.min' : ''), '.js'].join(''),
      library: 'react-editable-treeview',
      path: `${__dirname}/lib`,
    }),
    plugins: PRODUCTION ? [uglify] : [],
  }),
  Object.assign({}, bundle, {
    /* Examples */
    entry: `${__dirname}/examples/src/example.js`,
    output: Object.assign({}, bundle.output, {
      filename: 'example.min.js',
      library: 'example',
      path: `${__dirname}/examples/dist`,
    }),
    plugins: [uglify],
  }),
]
