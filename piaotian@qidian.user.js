// ==UserScript==
// @name         piaotian@qidian
// @version      0.9
// @description  飘天UI改为起点UI
// @author       lithium
// @include      /^http://www\.piaotian\.com/html/\d+/\d+/$/
// @require      https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js
// @run-at       document-start
// ==/UserScript==

var menuurl = window.location.href;

$(document).ready(function(){
	//删除繁杂内容
	$("div#tl, div#tr, div.list, div.bottom").remove();
	$("div > table").remove();
	$('a:contains(分享到twitter)').parent().parent().remove();
	$('head > script, head > style, head > link').remove();
	$('body > center').remove();
	$('.centent > script').remove();
	$("li:contains('\xa0')").remove();
	$('div.top').remove();
	$('div.centent > ul, div.mainbody').unwrap();

	//添加css样式
	$('head').append('<link rel="stylesheet" type="text/css"'+
		'href="https://rawgit.com/lithiumm1394/userscript/master/stylesheet.css">');
	$('head').append('<link rel="stylesheet"'+
		'href="https://fonts.googleapis.com/icon?family=Material+Icons">');

	//超链接改变为click event
	$(".mainbody ul li a").each(function(){
		var url = menuurl + $(this).attr("href");

		$(this).parent().on('click.change', function(){
			// 删除目录
			$('.title').remove();
			$('body').append('<div class="content"></div>');
			$('div.mainbody ul li').off('click.change');

			//添加选项
			$('body').prepend('<footer></footer>');
			$('footer').append('<div class="suboption" data-option="font-size"></div>')
			.append('<div class="suboption" data-option="line-height"></div>')
			.append('<div class="suboption" data-option="color-theme"></div>')
			.append('<div class="option"></div>');

			$('.option').append('<div id="menu" class="button"></div>')
			.append('<div id="font-size" class="button"></div>')
			.append('<div id="line-height" class="button"></div>')
			.append('<div id="color-theme" class="button"></div>');
			$('div#menu').append('<i class="material-icons light-48">menu</i>')
			.append('<p>目录</p>');
			$('div#font-size').append('<i class="material-icons light-48">format_size</i>')
			.append('<p>字体大小</p>');
			$('div#line-height').append('<i class="material-icons light-48">line_weight</i>')
			.append('<p>行间距</p>');
			$('div#color-theme').append('<i class="material-icons light-48">invert_colors</i>')
			.append('<p>背景</p>');

			$('.suboption').append('<div class="container"></div>');
			$('.suboption[data-option=font-size] > .container')
			.append('<i class="material-icons light-48" data-type="-">text_fields</i>')
			.append('<input type="range" min="0.5" max="1.3" step="0.05" value="1" class="slider">')
			.append('<i class="material-icons light-48" data-type="+">format_size</i>');

			$('.suboption[data-option=line-height] > .container')
			.append('<i class="material-icons light-48" data-type="-">reorder</i>')
			.append('<input type="range" min="1.3" max="2" step="0.1" value="1.7" class="slider">')
			.append('<i class="material-icons light-48" data-type="+">menu</i>');

			$('.suboption[data-option=color-theme] > .container')
			.append('<div class="day-normal sample"></div>')
			.append('<div class="day-white sample"></div>')
			.append('<div class="night sample">夜间</div>');

			//显示选项
			$(window).on("click", function(event){
				if (!$('footer').is(event.target) && $('footer').has(event.target).length === 0) {
					$('footer').slideToggle(function(){
						$('div.suboption').hide();
					});
				}
			});

			//目录
			$('div#menu').on('click', function(){
				$('div.mainbody').addClass('mainbody menu');
				$('div.mainbody').toggle();
				//高亮当前章节
				var str = $('header').text().split(/\s+/).pop();
				var $thisChapter = $('.mainbody li:contains('+ str +')');
				var no = $thisChapter.parent().prevAll().length * 4 + $thisChapter.prevAll().length + 1;
				$thisChapter.css('color', 'darkred');
				//滚动到当前章节位置
				var height = $('.mainbody li').height();
				var middle = Math.round( $(window).height() / height / 2 );
				$('div.mainbody').scrollTop((no-middle)*height);
				//隐藏
				$(window).on("touchend.sidemenu", function(event){
					var $exception = $('div.mainbody, div#menu');
					if (!$exception.is(event.target) && $exception.has(event.target).length === 0) {
						$('div.mainbody').hide();
						$thisChapter.removeAttr('style');
						$(window).off(".sidemenu");
					}
				});
			});

			//显示次选项
			$('div#font-size, div#line-height, div#color-theme').on('click', function(event){
				var option = $(this).attr('id');
				$('.suboption[data-option != '+option+']').hide();
				$('.suboption[data-option = '+option+']').toggle();
			});

			//slider
			$('.suboption[data-option=font-size], .suboption[data-option=line-height]').find('input').on('input', function(){
				var option = $(this).parent().parent('.suboption').attr('data-option');
				var value = $(this).val();
				console.log(value);
				if (option == 'font-size') $('.content').css('font-size', value + 'em');
				if (option == 'line-height') $('.content').css('line-height', value);
			});

			//slider button (- & +)
			$('.suboption[data-option=font-size], .suboption[data-option=line-height]').find('i').click(function(){
				var input = $(this).siblings('input').get(0);
				var $input = $(this).siblings('input');
				if ($(this).attr('data-type') == '+') input.stepUp();
				if ($(this).attr('data-type') == '-') input.stepDown();
				$input.trigger('input');
			});

			//背景次选项
			$('div.suboption[data-option=color-theme] > .container > div').on('click', function(){
				var name = this.className.split(" ");
				$('.content').attr('class', 'content ' + name[0]);
				$('header').attr('class', name[0]);
			});

			//添加题头
			$('body').prepend('<header></header>');

		});

		//载入章节
		$(this).parent().on('click.load', function(){
			$('.chapter').remove();
			$('div.mainbody').hide();
			$('.mainbody li').removeAttr('style');
			$(window).off('touchend.sidemenu');
			loadChapter(url, 0);
		});

		$(this).contents().unwrap();
	});

});


function loadChapter(url, num) {
	$(window).off("scroll");
	$('.content').append('<div id=' + num + ' class="chapter"></div>');
	var thisChapter = 'div#' + num;
	$(thisChapter).append('<div class="chapterTitle"></div>')
	.append('<div class="chapterContent"></div>');

	$.get(url)
	.done(function(data){
		//解析标题
		var titleRe = /<H1><a href=".+">(.+)<\/a>(.+)<\/H1>/gi;
		var title = titleRe.exec(data);
		$(thisChapter + '> div.chapterTitle').text(title[2]);
		$('header').text(title[1] + title[2]);

		//解析章节内容
		var contentRe = /&nbsp;&nbsp;&nbsp;&nbsp;(.+?)(?:(?:<br \/>)|\r\n<\/div>)/gi;
		var content;
		while ((content = contentRe.exec(data)) !== null) {
			$(thisChapter + '> div.chapterContent').append('<p>'+content[1]+'</p>');
		}

		//载入下一章节
		var nextRe = /<a style=" color:#00f;" href="(\d+.html)">下一章<\/a>/gi;
		var next = nextRe.exec(data);
		if(next !== null) {
			var nexturl = menuurl + next[1];
			$(window).on("scroll", function() {
				var scrollHeight = $(document).height();
				var scrollPosition = $(window).height() + $(window).scrollTop() + 1;
				//if (scrollHeight - scrollPosition < 1000) {
					if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
						loadChapter(nexturl, num+1);
					}
				});
		}
	});
}