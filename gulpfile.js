var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//origen y destino
var config = {
  source: './src/',
  dist: './public'
};
//ruta
var paths = {
  // assets: "assets/",
  html: "**/*.html", //doble asterisco para buscar en todas las carpetas
  sass: "assets/css/*.scss",
  mainSass: "assets/scss/main.scss",
  js: "assets/js/**/*.js",
  mainJS: "assets/js/app.js"
};

var sources = {
  // assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.sass,
  rootSass: config.source + paths.mainSass,
  js: config.source + paths.js,
  rootJS: config.source + paths.appJS,
};

//tres parametros
//tarea, tareas dependientes, funcion
gulp.task('html', function() {
  gulp.src(sources.html)//datos
    .pipe(gulp.dest(config.dist));//crear toda la informacion en una ruta dada (copy/paste)
});

gulp.task('sass', function() {
  gulp.src('./src/assets/scss/*.scss')
    .pipe(sass({
          outputStyle: "compressed",
    }).on("error", sass.logError))
      .pipe(gulp.dest(config.dist + "/assets/css"))
});

gulp.task("js", function() {
  gulp.src('./src/assets/js/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(obfuscate())
  .pipe(gulp.dest(config.dist + '/assets/js'))
});

gulp.task("sass-watch",["sass"], function() {
  browserSync.reload();
});

gulp.task("html-watch", ["html"], function(){
  browserSync.reload();
});

//watch de todo el src y ejecuta todas las tareas anteriores
//compila y actualiza todo el archivo
gulp.task("default", function(){
  browserSync.init({
    server:{
      baseDir: "./public"
    }
  });
  gulp.watch("./src/assets/scss/*.scss", ["sass-watch"]);
  gulp.watch("./src/*.html", ["html-watch"]);
});
