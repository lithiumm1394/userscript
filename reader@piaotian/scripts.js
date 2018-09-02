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

var reverseListAnim = async function() {
	let container = document.querySelector('ul')
	container.className = 'menu slidedown'
	const result = reverseList(container)
	console.log(result)
	container.className = 'menu slideup'
}

function reverseList2(){
	// let container = document.getElementById('menu')
	let container = document.querySelector('ul')
	let arr = []
	container.classList.add('slidedown')
	while (container.firstChild)
		arr.push(container.removeChild(container.firstChild))
	while (arr.length > 0)
		container.appendChild(arr.pop())
}