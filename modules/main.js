define(function (require,exports,module){
	require('bg/bg');
	require('header/header');
	require('home/home');
	require('about/about');
	require('footer/footer');
	module.exports = function(){
		MVC.install();
	}
})