// ==UserScript==
// @name ck101
// @namespace lithium
// @match https://ck101.com/*
// @require https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
// @grant none
// ==/UserScript==

$(document).ready(function(){
	// 论坛列表
	// body
	$(".con_alert_fixed").remove();
	$("#customPop").remove();
	$("#fbpic").remove();
	$("#fb-root").remove();    //cannot delete
	
	// body > div.all-elements > div.mobile_main
	$(".sideBtn").siblings().remove();
	$(".sideBtn").addClass("return-list").unwrap();
	$("#footer").remove();
	
	// body > div.all-elements > div.mobile_main > div.wp
	$(".mobileAD").remove();
	$(".breadCrumb").remove();
	$(".mobileAD_responsive").remove();
	
	// 论坛列表 stylish
	$(".wp").css('padding', '0');
	$(".pg").css('margin-top', '10px');
	$(".mobile_main").css({'box-shadow':'none'});
	$(".sideBtn").css({'background-size':'75%', 'right':'12px', 'left':'auto', 'top':'36px'});
	$(".return-list.toolbox-box-trigger").css({'right':'12px','top':'87px'});
	$(".goTop.down").css({'right':'12px','top':'138px'});
	$(".toolbox-box").css({'right':'34.5px','top':'109.5px', 'bottom':'auto', 'transform-origin':'right top 0'});


	// 文章页面
	// div.all-elements
	$(".return-list.addbookmark-icon").remove();

	// div.all-elements > div.mobile_main > div.wp > div#postlist > div.vt > div.bm
	$(".mobile_announcements").remove();
	$(".extend.mainExtend").remove();
	$("#shareArticleWrapper").remove();
	$("#mc_embed_signup").remove();
	$("#pageGo").remove();
	$(".another_taste").remove();
	$(".mtn.editor_box").remove();

	// > div.postList > div.pbody
	$("#pop_ad").remove();
	// > div.postList > div.pbody > div.mes.hiddenText
	$(".viewRate").remove();
	$(".box.pd2.mbn.adminBox").remove();
	
	// 文章页面 stylish
	$(".bottomarea").css("padding-top", "20px");
	$(".pg").children().css('padding', '5px');
});