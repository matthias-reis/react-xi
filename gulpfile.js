var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var sass = require("gulp-sass");

var webpackDev = Object.assign({}, webpackConfig);
webpackDev.devtool = "sourcemap";
webpackDev.debug = true;

var webpackProd = Object.assign({}, webpackConfig);
webpackProd.plugins = webpackProd.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
);

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
});

gulp.task("default", ["webpack:server", "watch"]);

gulp.task("build", ["webpack:prod"]);

gulp.task("css", function() {
  return gulp.src("scss/*.scss")
      .pipe(sass({
        outputStyle: 'expanded',
        // outputStyle: 'compressed',
        includePaths: ['./node_modules/bootstrap/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public'));
});

gulp.task("webpack:prod", function(callback) {
  webpack(webpackProd, function(err, stats) {
    if (err) throw new gutil.PluginError("[webpack:prod]", err);
    gutil.log("[webpack:prod]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:server", function() {
  new WebpackDevServer(webpack(webpackDev), {
    publicPath: "/public",
    hot: false,
    stats: {
      colors: true
    }
  }).listen(4200, "localhost", function(err) {
        if (err) throw new gutil.PluginError("[webpack:server]", err);
        gutil.log("[webpack:server]", "http://localhost:4200/public/index.html");
      });
});