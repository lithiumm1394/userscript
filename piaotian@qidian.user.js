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
var addhtml = "https://raw.githubusercontent.com/lithiumm1394/userscript/master/custom_html.html";

$(document).ready(function(){
	//删除脚本，css
	$('head > script, head > style, head > link').remove();
	$("body > center").remove();
	$('.centent > script').remove();

	//删除繁杂内容
	$("#tl, #tr").remove();
	$("div > table, .bottom, .top").remove();
	$('.list').remove();
	$('ul:contains(分享到twitter)').remove();
	$("li:contains('\xa0')").remove();
	$('ul, .mainbody').unwrap();

	//添加css样式
	$('head').append('<link rel="stylesheet" type="text/css"'+
		'href="https://rawgit.com/lithiumm1394/userscript/master/stylesheet.css">');
	$('head').append('<link rel="stylesheet"'+
		'href="https://fonts.googleapis.com/icon?family=Material+Icons">');

	//超链接改变为click event
	$(".mainbody ul li a").each(function(){
		$(this).parent().on('click.change', function(){
			// 删除目录
			$('.title').remove();
			$('body').append('<div class="content"></div>');
			$('.mainbody ul li').off('click.change');

			//添加选项
			$.get(addhtml, function(data){
				$('body').prepend(data);
			});

			//显示选项
			$(window).on("click", function(event){
				if (!$('footer').is(event.target) && $('footer').has(event.target).length === 0) {
					$('footer').slideToggle(function(){
						$('.suboption').hide();
					});
				}
			});

			//目录
			$('#menu').on('click', function(){
				$('.mainbody').addClass('mainbody menu');
				$('.mainbody').toggle();
				//高亮当前章节
				var str = $('header').text().split(/\s+/).pop();
				var $thisChapter = $('.mainbody li:contains('+ str +')');
				$thisChapter.css('color', 'darkred');

				//滚动到当前章节位置
				var no = $thisChapter.parent().prevAll().length * 4 + $thisChapter.prevAll().length + 1;
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

		var url = menuurl + $(this).attr("href");
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