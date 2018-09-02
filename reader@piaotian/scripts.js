var reverseList = function(node){
	return new Promise(resolve => {
		let arr = []
		while (node.firstChild)
			arr.push(node.removeChild(node.firstChild))
		while (arr.length > 0)
			node.appendChild(arr.pop())
		resolve('finish.')
	})
}

var slide = function(time){
	return new Promise(resolve => {
		let container = document.querySelector('ul')
		container.style.setProperty('--animation-duration', time)
		container.style.setProperty('--animation-iteration-count', 2)	//start animation
		setTimeout(resolve('finish'), time)
	})
}

var reverseListAnim = async function() {
	console.log('start')
	const animation = slide(500)
	const result = reverseList(container)
	if (await animation == 'finish' && await result == finish)
		document.querySelector('ul').style.setProperty('--animation-iteration-count', 0)
	console.log(result)
}