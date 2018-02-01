// ==UserScript==
// @name ck101
// @namespace Violentmonkey Scripts
// @match https://ck101.com/thread-*.html
// @require https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js
// @grant none
// ==/UserScript==

$(document).ready(function(){
	// 删除页眉、页脚和广告
	$("header.hd").remove();
	$("div#footer").remove();
	$("div.mobileAD").remove();
	$("div.mobileAD_responsive").remove();
	$("div.mobile_announcements").remove();
	$("div.another_taste").remove();
	$("div.extend.mainExtend").remove();
	$("div#shareArticleWrapper").remove();
	
	$("div.viewRate").remove();
	$("div.box.pd2.mbn.adminBox").remove();
	$("div.mtn.editor_box").remove();
	$("a.return-list.addbookmark-icon").remove();
	$("div#mc_embed_signup").remove();
	$("div#pageGo").remove();
	
	$("div.wp").css("padding-top", "0");
	$("div.bottomarea").css("padding-top", "30px");
});