var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


gulp.task('default', function() {
    gulp.src('./src/jquery.tapshow.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});
