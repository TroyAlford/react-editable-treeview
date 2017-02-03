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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
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
  plugins: [new webpack.optimize.UglifyJsPlugin({ minimize: true })],
}

module.exports = [
  Object.assign({}, bundle, {
    /* Main Bundle */
    entry: `${__dirname}/src/components/TreeView.js`,
    output: Object.assign({}, bundle.output, {
      filename: `${library}.min.js`,
      library,
      path: `${__dirname}/lib`,
    }),
  }),
  Object.assign({}, bundle, {
    entry: `${__dirname}/src/components/TreeView.js`,
    output: Object.assign({}, bundle.output, {
      filename: `${library}.js`,
      library,
      path: `${__dirname}/lib`,
    }),
    plugins: [],
  }),
  Object.assign({}, bundle, {
    /* Examples */
    entry: `${__dirname}/examples/src/example.js`,
    output: Object.assign({}, bundle.output, {
      filename: 'example.min.js',
      library: 'example',
      path: `${__dirname}/examples/lib`,
    }),
  }),
]
