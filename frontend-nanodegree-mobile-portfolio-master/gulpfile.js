var gulp = require('gulp');

var minifyHTML = require("gulp-minify-html");
//var critical = require('critical').stream;

/*
gulp.task('default', function(){
	return gulp.src('original-index.html')
	.pipe(critical({base: 'css/', inline: true, minify: true, css:['css/style.css'], width: 1300, height: 900}))
	.pipe(gulp.dest('dist'));
});

*/

gulp.task("default", function(){
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src('index.html')
	.pipe(minifyHTML(opts))
	.pipe(gulp.dest('dest/index.html'));
});