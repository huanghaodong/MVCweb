define(function (require,exports,module){
	//引入样式
	require('bg/bg.css');
		MVC.addModel('bg',{
		num:parseInt(Math.random()*6),
		wholeNum:6
	})
	.addView('bg',function(model,template){
		var dom = $('<div class="bg" id="bg"></div>');
		var data = model.get('bg');
		var tpl = '<div class="bg-item item-{#bgnum#} {#isShow#}"></div>';
		var html = '';
		for(var i=0;i<data.wholeNum;i++){
			html+=template(tpl,{
				bgnum:i,
				isShow:data.num === i?'choose':''
			})
		}
		dom.html(html);
		dom.prependTo('body');
		return dom;
	})
	.addCtrl('bg',function(model,view,observer){
		var dom = view.create('bg');
		var data = model.get('bg');
		setInterval(function(){
			var num = parseInt(Math.random()*data.wholeNum);
			dom.find('.bg-item').eq(num).addClass('choose').siblings().removeClass('choose');
			model.add('bg.num',num);
		},2000)
	})
})