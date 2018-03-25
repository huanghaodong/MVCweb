define(function (require,exports,module){
	require('footer/footer.css');
	MVC
	.addView('footer',function(){
	var dom = $('#footer');
	var html = '<div class="inner">© 2011 Zeences Design. All Right Reserved.</div>';
	dom.html(html);
	return dom;
	})
	.addCtrl('footer',function(model,view){
	view.create('footer');
	})
})