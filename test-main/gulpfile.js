const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');

gulp.task('css', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./css'));
})

gulp.task('pug', () => {
    return gulp.src('./pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
})

gulp.task('clean', () => {
    return del('css')
})

gulp.watch("./scss/**/*.scss", gulp.series("css"));
gulp.watch("./pug/**/*.pug", gulp.series("pug"));
gulp.task("start", gulp.series("clean", "pug", "css"));