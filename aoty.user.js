// ==UserScript==
// @name         Download search for AOTY
// @version      1.0
// @author       Lithium
// @match        https://www.albumoftheyear.org/album/*.php
// @grant        none
// ==/UserScript==

'use strict';

const infoBox = document.querySelector('.albumTopBox.info');

const header = document.createElement('div');
header.className = 'detailRow';
const headerContent = document.createElement('span');
infoBox.appendChild(header).appendChild(headerContent).append('download');

const keyword = document.querySelector('.albumHeadline h1').innerText.replace(/\n/g,' ');
const links = [
  { text: 'itdmusic', href: 'https://itdmusic.in/?s=' + keyword},
  { text: '+Premieres', href: 'https://www.pluspremieres.nz/search?q=' + keyword},
  { text: 'freeiplus', href: 'https://freeiplus.com/search/?s=' + keyword},
  { text: 'iplusflex', href: 'https://www.iplusflex.co/?s=' + keyword},
  { text: 'iplushub', href: 'https://iplushub.me/?s=' + keyword},
  { text: 'iPlusfree', href: 'http://iplusfree.org/?s=' + keyword},
  { text: 'ipluseveryday（自压）', href: 'http://www.ipluseveryday.com/search?q=' + keyword},
  { text: '微博搜索', href: 'http://s.weibo.com/weibo/' + keyword},
  { text: 'Google', href: 'https://www.google.com/search?q=' + keyword + '+aac'},
];

links.forEach(value => {
  const tag = document.createElement('div');
  tag.className = 'tag';
  const a = document.createElement('a');
  a.href = value.href;
  a.text = value.text;
  infoBox.appendChild(tag).append(a);
})
