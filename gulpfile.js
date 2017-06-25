var gulp = require('gulp'),
    rename = require('gulp-rename'),
    composer = require('gulp-uglify/composer'),
    uglifyjsES = require('uglify-es');

var minify = composer(uglifyjsES, console);

gulp.task('build', function() {
    gulp.src('./src/*.js')
        .pipe(minify({
            warnings : true,
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));

    // copy src script to dist
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'));
});
