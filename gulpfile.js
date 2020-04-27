var gulp = require('gulp'),
    watch = require("gulp-watch"),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    cli = require('gulp-cli');

gulp.task('watch-less', function () {
    watch({glob: './*.less'}, function (files) { 
        gulp.start('compile-less');
    });

    watch({
        glob: ['./*.css', '!./*.min.css']
    }, function(files) {
        gulp.start('minify-css');
    });
});

gulp.task('compile-less', function () {
    gulp.src('./*.less')
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(gulp.dest('./dist/main.css'));
});

gulp.task('minify-css', function() {
    gulp.src([
        './*.css',
        '!./*.min.css'
    ])
    .pipe(cssmin().on('error', function(err) {
        console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'));
})

gulp.task('default', ['watch-less']);