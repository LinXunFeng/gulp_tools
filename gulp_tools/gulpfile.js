const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');

// 压缩 src/js 目录下的所有js文件，包括子目录
gulp.task('js_minify', ()=>{
    return gulp
        .src(['./src/js/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

// 合并与压缩src下的所有js文件为bundle.min.js
gulp.task('js_concat_minify', ()=>{
    return gulp
        .src(['./src/js/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

// 压缩重命名js  (a.js => a.min.js)
gulp.task('js_minify_rename', ()=>{
    return gulp
        .src(['./src/js/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'})) // 加一个.min后缀
        .pipe(gulp.dest('./build/js'));
});

// 通过uglify压缩后，如果代码报错的话不利用在浏览器中调试
// 这时就可以使用 sourcemap
// 当报错时会把原始代码在浏览器的Sources中恢复出来，方便调试
gulp.task('js_sourcemap', ()=>{
    return gulp
        .src(['./src/js/**/*.js'])
        .pipe(sourcemaps.init()) // 操作前先初始化sourcemap
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        // .pipe(sourcemaps.write()) // write里不写路径会默认将sourcemap内容全部写入到处理后的js文件中
        .pipe(sourcemaps.write('../maps'))
        .pipe(rename({suffix: '.min'})) // 加一个.min后缀
        .pipe(gulp.dest('./build/js'));
});

// css文件合并与压缩
gulp.task('style', ()=>{
    return gulp
        .src(['./src/css/**/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css/'));
});

// 终端执行gulp后的默认操作
// gulp.task('default', ['js_minify']);
gulp.task('default', ['style']);

// cnpm i gulp-babel @babel/core @babel/preset-env -D