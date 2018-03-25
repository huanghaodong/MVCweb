define(function (require,exports,module){
	//引入样式
	require('header/header.css');
	MVC.addModel('header',{
		"icon": [
			{
				"img": "icon-rss.png",
				"href": "index.html"
			},
			{
				"img": "icon-dribble.png",
				"href": "index.html"
			},
			{
				"img": "icon-twitter.png",
				"href": "index.html"
			},
			{
				"img": "icon-googleplus.png",
				"href": "index.html"
			},
			{
				"img": "icon-dribble.png",
				"href": "index.html"
			},
			{
				"img": "icon-flickr.png",
				"href": "index.html"
			},
			{
				"img": "icon-tumblr.png",
				"href": "index.html"
			}
		],
		"nav": [
			{
				"title": "Home",
				"href": "index.html"
			},
			{
				"title": "Portfolio",
				"href": "portfolio.html",
				"list": [
					{"title": "Portfolio 5 Columns", "href": "portfolio-columns.html"}, 
					{"title": "Portfolio Post", "href": "portfolio-post.html"}
				]
			},
			{
				"title": "Blog", 
				"href": "blog.html",
				"list": [
					{"title": "Blog Post", "href": "blog-post.html"}
				]
			},
			{
				"title": "Pages", 
				"href": "pages.html",
				"list": [
					{"title": "Full Width Page", "href": "pages.html"}, 
					{"title": "Page with Sidebar", "href": "pages.html"}
				]
			},
			{
				"title": "Styles", 
				"href": "styles.html",
				"list": [
					{"title": "Buttons Boxes Images", "href": "styles.html"}, 
					{"title": "Columns", "href": "styles.html"}, 
					{"title": "Typography", "href": "styles.html"}, 
					{"title": "Tabs Toggle Tables", "href": "styles.html"}, 
					{"title": "Testimonials", "href": "styles.html"}
				]
			},
			{
				"title": "Contact",
				"href": "contact.html"
			}
		]
	})
//添加视图
.addView('header',function(model,template){
	var dom = $('#header');
	var data = model.get('header');
	var tpl = [
				'<div class="inner">',
					'<div class="logo-container">',
						'<img class="logo" src="modules/header/logo.png" alt="">',
						'<ul>{#iconUl#}</ul>',
					'</div>',
					'<ul class="nav">{#navHtml#}</ul>',
				'</div>'
	].join('');
	var iconLiTpl = '<li><a href="{#href#}"><img src="modules/header/{#img#}" alt=""></a></li>';
	var navLiTpl = '<li class="{#cls#}"><a href="{#href#}">{#title#}</a>{#list#}</li>';
	var innerUlTpl = '<ul class="inner-nav">{#innerNavHtml#}</ul>';
	var html = iconHtml = navHtml = innerNavHtml = '';
	data.icon.forEach(function(obj,index){
		iconHtml += template(iconLiTpl,obj);
	})
	data.nav.forEach(function(obj,index){
		if(obj.list){
			innerNavHtml = '';
			obj.list.forEach(function(o,i){
				innerNavHtml += template(navLiTpl,{
				cls:'inner-nav-li',
				href:o.href,
				title:o.title,
				list:''
				})
			})
			innerNavHtml = template(innerUlTpl,{innerNavHtml:innerNavHtml});
		}else{
			innerNavHtml = '';
		}
		navHtml += template(navLiTpl,{
			cls:'nav-li',
			href:obj.href,
			title:obj.title,
			list:innerNavHtml
		})
	})
	html = template(tpl,{
		iconUl:iconHtml,
		navHtml:navHtml
	})
	dom.html(html);
	return dom;
})
//添加控制器
.addCtrl('header',function(model,view,observer){
	var dom = view.create('header');
	dom.delegate('.nav-li', 'mouseenter', function(event) {
		$(this).find('ul').stop().slideDown(200);
	}).delegate('.nav-li', 'mouseleave', function(event) {
		$(this).find('ul').stop().slideUp(200);
	});
})
})