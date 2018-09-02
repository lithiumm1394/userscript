// ==UserScript==
// @name         piaotian@qidian 2
// @version      1.0
// @description  飘天UI改为起点UI
// @author       lithium
// @include      /^https?://www\.piaotian\.com/html/\d+/\d+/$/
// @updateURL  https://raw.githubusercontent.com/lithiumm1394/userscript/master/reader%40piaotian/reader2%40piaotian.user.js
// @downloadURL  https://raw.githubusercontent.com/lithiumm1394/userscript/master/reader%40piaotian/reader2%40piaotian.user.js
// ==/UserScript==

// 获取章节目录数据
let retrive = new Promise(
  (resolve, reject) => {
    let title = document.querySelector('h1').innerText.slice(0, -4)

    let author = document.querySelector('meta[name=author]').content

    let menu = []
    document.querySelectorAll('ul:not(:nth-child(2)) > li > a').forEach(
      el => menu.push({text: el.innerText, link: el.getAttribute('href')})
    )

    if (title != null && author != null && menu != null) resolve({title, author, menu})
  }
)

// 建立新html文件
retrive.then(data => {
  let html = '<html><head>'
  + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
  + '<link rel="stylesheet" type="text/css" href="https://rawgit.com/lithiumm1394/userscript/master/reader%40piaotian/stylesheet_new.css">'
  + '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'
  + '<script src="https://rawgit.com/lithiumm1394/userscript/master/reader%40piaotian/scripts.js"></script>'
  + '</head><body>'
  + '<h1>' + data.title + '</h1>'
  + '<div class="subtitle"><h2>作者：' + data.author + '</h2>'
  + '<button class="material-icons light-48" onClick="reverseListAnim()">low_priority</button>'
  + '</div><ul class="menu">'

  for (let item of data.menu)
    html += '<li>' + item.text + '</li>'

  html += '</ul></body></html>'

  document.write(html)
  document.close()
})
