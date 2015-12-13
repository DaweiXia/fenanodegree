var gulp = require('gulp');
var critical = require('critical').stream;

gulp.task('default', function(){
	return gulp.src('original-index.html')
	.pipe(critical({base: 'css/', inline: true, minify: true, css:['css/style.css'], width: 1300, height: 900}))
	.pipe(gulp.dest('dist'));
});