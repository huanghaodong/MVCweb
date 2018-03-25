define(function (require,exports,module){
	require('about/about.css');
	MVC
/*.addModel('about',{
		"days": {
			"title": "Latest Posts",
			"list": [
				{
					"day": "22",
					"month": "JUN",
					"content": "Vivamus soder pharetra libero atincidunt"
				},
				{
					"day": "14",
					"month": "MAY",
					"content": "Vivamus soder pharetra libero atincidunt"
				},
				{
					"day": "11",
					"month": "MAY",
					"content": "Vivamus soder pharetra libero atincidunt"
				},
				{
					"day": "08",
					"month": "APR",
					"content": "Vivamus soder pharetra libero atincidunt"
				}
			]
		},
		"img": {
			"title": "Flickr",
			"list": ["f1.jpg","f2.jpg","f3.jpg","f4.jpg","f5.jpg","f6.jpg","f7.jpg","f8.jpg","f9.jpg",]
		},
		"about": {
			"title": "About",
			"list": [
				"Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor.",
				"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
			]
		},
		"touch": {
			"title": "Get in Touch"
		}
	})*/
.addView('about',function (model,template){
	console.log('haha')
	//获取元素
	var dom = $('#abouts');
	//获取数据 
	var data = model.get('about');
	//定义模板
	var tpl = [
		'<div class="inner clearfix">',
				'<div class="abouts-container">',
						'<div class="hr2"></div>',
				'<div class="days">',
					'<h3 class="h3">{#daysTit#}</h3>',
					'<ul class="days-ul">{#daysLi#}</ul>',
				'</div>',
				'<div class="img">',
					'<h3 class="h3">{#imgTit#}</h3>',
					'<ul class="days-img">{#imgLi#}</ul>',
				'</div>',
				'<div class="about">',
					'<h3 class="h3">{#aboutTit#}</h3>',
					'<p>{#aboutFirP#}</p>',
					'<p>{#aboutSecP#}</p>',
				'</div>',
				'<div class="touch">',
					'<h3 class="h3">{#touchTit#}</h3>',
					'<form action="" method="get">',
						'<input type="text" id="name" class="ipt"><label for="name">*Name</label>',
						'<input type="email" id="email" class="ipt"><label for="email">*Email</label>',
						'<textarea id="something" class="are"></textarea>',
						'<input type="submit" value="Submit" class="smt"/>',
					'</form>',
				'</div>',
				'</div>',
		'</div>'
	].join('');
	var daysLiTpl = [
		'<li class="clearfix">',
			'<span>',
				'<em>{#day#}</em>',
				'<em>{#month#}</em>',
			'</span>',
			'<a href="#">{#content#}</a>',
		'</li>'
	].join('');
	var imgLiTpl = '<li><a href="#"><img src="modules/about/{#list#}" alt="" /></a></li>';
	//定义字符串
	var html =  dayHtml = imgHtml = '';
	//渲染模板
	console.log(data)
	data.days.list.forEach(function (obj,index){
		dayHtml += template(daysLiTpl,obj)
	});
	data.img.list.forEach(function (item,index){
		imgHtml += template(imgLiTpl,{list : item});
	});
	html  = template(tpl,{
		daysTit : data.days.title,
		daysLi : dayHtml,
		imgTit : data.img.title,
		imgLi : imgHtml,
		aboutTit : data.about.title,
		aboutFirP : data.about.list[0],
		aboutSecP : data.about.list[1],
		touchTit :　data.touch.title,
	});
	//渲染模板
	dom.html(html);
	//返回dom
	return dom;
})
.addCtrl('about',function(model,view,observer){
	console.log('x')
	$.get('data/about.json',function (res){
		console.log(123)
		if(res && res.errno === 0 ){
			model.add('about',res.data);
			view.create('about');
		}
	})
})
})