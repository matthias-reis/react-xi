module.exports = { // jshint ignore:line
  entry: {app: ["./src/index.js"]},
  output: {
    path: __dirname + '/build/', // jshint ignore:line
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['stage-0', 'es2015', 'react']
        }}
    ]
  },
  plugins: []
};