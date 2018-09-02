function reverseList(){
	// let container = document.getElementById('menu')
	let container = document.querySelector('ul')
	let arr = []
	while (container.firstChild)
		arr.push(container.removeChild(container.firstChild))
	while (arr.length > 0)
		container.appendChild(arr.pop())
}

function reverseList2(){
	let container = document.getElementById('menu')
	// let container = document.querySelector('ul')
	let arr = []
	while (container.firstChild)
		arr.push(container.removeChild(container.firstChild))
	while (arr.length > 0)
		container.appendChild(arr.pop())
}