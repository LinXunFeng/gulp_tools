# gulp_tools
gulp小工具集



注：`gulp`不支持ES6语法，所以需要使用`babel`将ES6转为ES5



## 使用说明

`gulp`需要安装两次，在全局下安装，和项目里安装。

```shell
# 全局安装
cnpm i gulp -g

# 项目中安装（gulpTools中的package.json有指定版本，该命令不需要在终端执行）
# cnpm i gulp -D
```



进入到 `gulp_tools` 目录，终端输入命令，会自动安装所需的第三方库

```shell
cnpm install
```



终端命令与相关代码，可根据自身情况修改相应位置的代码

```js
gulp js_minify

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
```



```js
gulp js_concat_minify

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
```



```js
gulp js_minify_rename

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
```



```js
gulp style

// css文件合并与压缩
gulp.task('style', ()=>{
    return gulp
        .src(['./src/css/**/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css/'));
});
```



```js
gulp image

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
```





## 插件说明

| 插件              | 功能                              | 地址                                                 |
| ----------------- | --------------------------------- | ---------------------------------------------------- |
| `gulp-uglify`     | 压缩js文件                        | `https://github.com/terinjokes/gulp-uglify`          |
| `gulp-concat`     | 整合js文件                        | `https://github.com/gulp-community/gulp-concat`      |
| `gulp-rename`     | 重命名js文件                      | `https://github.com/hparra/gulp-rename`              |
| `gulp-babel`      | babel调用插件<br>es6语法转es5     | `https://github.com/babel/gulp-babel`                |
| `gulp-sourcemaps` | 方便浏览器调试<br/>已压缩的js文件 | `https://github.com/gulp-sourcemaps/gulp-sourcemaps` |
| `gulp-cssmin`     | 压缩css文件                       | `https://github.com/pdehaan/gulp-cssmin`             |
| `gulp-imagemin`   | 压缩图片                          | `https://github.com/sindresorhus/gulp-imagemin`      |



`gulp-babel` 仅仅是调用 `babel` 的插件，所以需要我们手动安装 `babel`相关库

```shell
cnpm i gulp-babel @babel/core @babel/preset-env -D
```





