define(function (require,exports,module){
	//引入样式
	require('home/home.css');
	MVC
	.addView('home',function(model,template){
		var dom = $('#container');
		var data = model.get('home');
		var num = data.banner.list.length;
		var tpl = [
					'<div class="inner">',
						'<div class="home">',
							'<div class="banner">',
								'<ul>{#bannerList#}</ul>',
								'<div class="btns clearfix">',
									'<div class="to-left">',
									'</div>',
									'<ul class="cirs">{#cirList#}</ul>',
									'<div class="to-right">',
									'</div>',
								'</div>',
								'<div class="banner-tit">{#bannerTit#}</div>',
							'</div>',
							'<div class="hr2">',
							'</div>',
							'<div class="news clearfix">',
								'<h2 class="h2">{#title#}</h2>',
								'<div class="news-partone">{#content#}</div>',
								'<ul class="news-parttwo">{#shortList#}</ul></br></br></br>',
								'<div class="news-partthree"><ul class="clearfix">{#designList#}</ul></div>',
							'</div>',
							'<div class="hr1"></div>',
							'<div class="images">',
								'<h2 class="h2">{#imageTitle#}</h2>',
								'<div class="images-btns"><a href="javascript:void(0)"></a><a href="javascript:void(0)"></a></div>',
								'<div class="images-container">',
									'<ul>{#imgList#}</ul>',
								'<div>',
							'</div>',
						'</div>',
					'</div>'
		].join('');
		var bannerLiTpl = '<li><img src="modules/home/{#src#}.jpg" alt=""><p>{#intro#}</p></li>';
		var cirTpl = '<li class="{#isChoose#}"></li>';
		var shortTpl = '<li>{#shortItem#}</li>';
		var designTpl = '<li class="news-partthree-item"><img src="modules/home/{#img#}"><h4>{#title#}</h4><p>{#content#}</p></li>'
		var imageTpl = '<li><a href=""><img src="modules/home/{#src#}" alt="" /></a></li>';
		var html = bannerListHtml = cirLiHtml = shortlistHtml = designListHtml = imageListHtml = '';
		data.banner.list.forEach(function(obj,index){
			bannerListHtml += template(bannerLiTpl,obj)
		})
		for(var i=0;i<num;i++){
			cirLiHtml += template(cirTpl,{
				cirList:'',
				isChoose:i === 0 ? 'choose' : ''
			})
		}
		data.news.list.forEach(function(value,index){
			shortlistHtml += template(shortTpl,{
				shortItem : value
			})
		})
		data.news.intro.forEach(function(obj,index){
			designListHtml += template(designTpl,obj)
		})
		data.images.list.forEach(function(v,i){
			imageListHtml += template(imageTpl,{
				src : v
			})
		})
		html = template(tpl,{
			bannerList : bannerListHtml,
			cirList :　cirLiHtml,
			bannerTit : data.banner.title,
			title : data.news.title,
			content : data.news.content,
			shortList : shortlistHtml,
			designList : designListHtml,
			imageTitle : data.images.title,
			imgList : imageListHtml
		})

		dom.html(html);
		return dom;
	})

	.addCtrl('home',function(model,view,observer){
		$.get('data/home.json', function (res) {
			// 获取数据并存储
			if (res && res.errno === 0) {
				model.add('home', res.data);
				var dom = view.create('home');
				init();
				imagesInit()
				//banner业务逻辑
				function init(){
					//动态设置ul.cirs的宽度，让其margin:0 auto管用
					var cirLength = model.get('home').banner.list.length;
					dom.find('.btns').css('width',cirLength*19+57);
					var total = model.get('home.banner.list').length;
					bindEvent();

					function showBannerImg(num){
						dom.find('.banner>ul>li').eq(num).stop().fadeIn().siblings().stop().fadeOut();
						dom.find('.cirs li').eq(num).addClass('choose').siblings().removeClass('choose');
						model.add('home.banner.num', num);
					}
					function bindEvent(){
						dom.delegate('.cirs li','click',function(){
							var num = $(this).index();
							showBannerImg(num);
						}).delegate('.to-right', 'click', function(event) {
							var num = model.get('home.banner.num');
							num++;
							if(num>total-1){
								num = 0;
							}
							showBannerImg(num);
						}).delegate('.to-left', 'click', function(event) {
							var num = model.get('home.banner.num');
							num--;
							if(num<0){
								num = total-1;
							}
							showBannerImg(num);
						});

						function showAuto(){
							dom.find('.to-right').trigger('click');
						}
						//自动轮播
						var t = setInterval(showAuto,1000);
						dom.find('.banner').hover(function(){clearInterval(t)},function(){
							t = setInterval(showAuto,1000);
						})
					}
				}
				//images业务逻辑
				function imagesInit(){
					//动态设置images ul的宽度
					var imageLength = model.get('home').images.list.length;
					var imageUl = dom.find('.images ul');
					imageUl.css('width',imageLength*(164+20)-20);
					var maxNum = dom.find('.images ul li').length - 5;
					bindEvent();
					function bindEvent(){
						dom.delegate('.images .images-btns a:last-child', 'click', function(event) {
							var right = model.get('home.images.right');
							if(right > -184*maxNum){
								imageUl.animate({'right': right-=184}, 500);
								model.add('home.images.right', right);
							}
						})
						.delegate('.images .images-btns a:first-child', 'click', function(event) {
							var right = model.get('home.images.right');
							if(right < 0){
								imageUl.animate({'right': right+=184}, 500);
								model.add('home.images.right', right);
							}
						})
					}
				}
			}
	})
	
	
})
})