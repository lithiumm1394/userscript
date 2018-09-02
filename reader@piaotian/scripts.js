var reverseList = function(node){
	return new Promise(resolve => {
		let arr = []
		while (node.firstChild)
			arr.push(node.removeChild(node.firstChild))
		while (arr.length > 0)
			node.appendChild(arr.pop())
		resolve('reverseList finish')
		console.log('sort finish')
	})
}

var slide = function(node, time){
	return new Promise(resolve => {
		// node.style.setProperty('--animation-duration', time/1000 + 's')
		// node.style.setProperty('--animation-iteration-count', 'infinite')	//start animation
		node.style.setProperty('--transition-duration', time/1000 + 's')
		node.classList.add('active')
		setTimeout(function(){
			resolve('slide finish')
			console.log('animation finish')
		}, time*2)
	})
}

var reverseListAnim = async function() {
	let container = document.querySelector('ul')
	console.log('start')
	const animation = slide(container, 1000)
	const result = reverseList(container)
	console.log(await animation)
	console.log(await result)
	// container.style.setProperty('--animation-iteration-count', 0)
	container.classList.remove('active')
}