function reverseList(){
	let container = document.querySelector('ul')
	let list = container.childNodes
	for(let i = list.length - 2; i >= 0; i--)
		container.appendChild(container.removeChild(list[i]))
}