// ==UserScript==
// @name     itdmusic download button remove redirect
// @version  1.2
// @author   Lithium
// @match    *://itdmusic.in/*
// @grant    none
// ==/UserScript==

'use strict';

const replace = (el, parent = undefined) => {
  el.querySelectorAll('div.entry input[type=image], div.entry a[rel=noopener]').forEach((node, index, list) => {
    // type NodeName = 'INPUT' | 'A'
    const attr = node.nodeName === 'INPUT' ? 'onclick' : 'href'
    const [, href, domain] = node.getAttribute(attr).match(/(?:(?:&url|\?s)=)?(https?:\/\/(.+?)\/.*)/)

    const a = document.createElement('a')
    Object.assign(a, {href, text: domain, style: 'margin: 0 1em'})

    if (parent) parent.append(a)
    else node.parentNode.replaceChild(a, node)
  })
}

replace(document)

document.querySelectorAll('div.entry a.more-link').forEach(async (node, index, list) => {
  const html = document.createElement('html')
  const response = await fetch(node.getAttribute('href'))
  html.innerHTML = await response.text()

  replace(html, node.parentNode)
  node.parentNode.removeChild(node)
})
