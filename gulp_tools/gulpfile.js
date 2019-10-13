const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');

const js_path = ['./src/js/**/*.js']

// 压缩 src/js 目录下的所有js文件，包括子目录
gulp.task('js_minify', ()=>{
    return gulp
        .src(js_path)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

// 合并与压缩src下的所有js文件为bundle.min.js
gulp.task('js_concat_minify', ()=>{
    return gulp
        .src(js_path)
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
        .src(js_path)
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
        .src(js_path)
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

// 压缩图片
gulp.task('image', ()=>{
    return gulp
        .src(['./src/image/**/*'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}), // gif隔行扫描
            imagemin.jpegtran({progressive: true}), // 渐进式
            imagemin.optipng({optimizationLevel: 5}) // 压缩级别 5：最高级
        ]))
        .pipe(gulp.dest('./build/image/'));
});

// 当指定目录下的js文件发生变化时,自动执行js_minify操作
gulp.task('watch', ()=>{
    gulp.watch(js_path, ['js_minify']);
});

// 要相实现在watch过程中，相关文件发生变化并执行完相应操作后，实时重载浏览器的网页内容
// 需要借助livereload，并完成以下几步：
// 1.安装服务器 cnpm i http-server -g
// 2.插件(gulp) cnpm i gulp-livereload -D
// 3.Chrome安装插件livereload
gulp.task('js_livereload', ()=>{
    return gulp
        .src(js_path)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload())
});

gulp.task('watch_reload', ()=>{
    livereload.listen();

    gulp.watch(js_path, ['js_livereload']);

    gulp.watch([
        './gulp.html',
        ...js_path
    ], file=>{
        livereload.changed(file.path); // 告诉livereload，哪个文件变了就更新哪个文件
    });
});

// 终端执行gulp后的默认操作
// gulp.task('default', ['js_minify']);
// gulp.task('default', ['style']);
// gulp.task('default', ['image']);
// gulp.task('default', ['js_minify', 'watch']);
gulp.task('default', ['js_livereload', 'watch_reload']);

// cnpm i gulp-babel @babel/core @babel/preset-env -D