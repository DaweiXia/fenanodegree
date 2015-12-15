var gulp = require("gulp");
//var critical = require("critical").stream;
//var minifyHTML = require("gulp-minify-html");

/*
gulp.task("critical", function(){
	return gulp.src('origin-index.html')
	.pipe(critical({base: 'css/', inline: true, minify: true, css:['css/style.css'], width: 1300, height: 900}))
	.pipe(gulp.dest('dist'));
});
*/

/*
gulp.task("minifyHTML", function(){
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src('index.html')
	.pipe(minifyHTML(opts))
	.pipe(gulp.dest('dest/index.html'));
});
*/
var options = {
	js: {
		output: {
			comments: true
		}
	},
	jsSelector: 'script[type!="text/x-handlebars-template"]',
	css: {
		keepSpecialComments: 1
	},
	cssSelector: 'style[do-not-minify!="true"]'
};

var minifyInline = require("gulp-minify-inline");
gulp.task("minify-inline", function(){
	gulp.src("index.html")
	.pipe(minifyInline(options))
	.pipe(gulp.dest("dest/"))
});