const formAdd = document.forms[0];
const formSearch = document.forms[1];

const contentElem = document.querySelector('#content');
let contentLst = [];

function render(list) {
	contentElem.innerText = '';
	for (let elem of list) {
		const divElem = document.createElement('div');
		const pElem = document.createElement('p');
		const closeElem = document.createElement('div');

		divElem.append(pElem, closeElem);
		contentElem.append(divElem);

		closeElem.innerText = '✘'
		pElem.innerText = elem.word;
		divElem.style.background = elem.color;

		divElem.classList.add('card');
		pElem.classList.add('inf-elem');
		closeElem.classList.add('close');

		closeElem.addEventListener('click', event => {
			contentLst = contentLst.filter(y => y.word !== elem.word);
			render(contentLst);
		})

		divElem.addEventListener('dblclick', event => {
			if (pElem.innerText == elem.word) {
				pElem.innerText = elem.translation;
			} else {
				pElem.innerText = elem.word;
			};
		});
	};
};



formAdd.addEventListener('submit', event => {
	event.preventDefault();
	const { word, translation, color } = event.target;
	if (word.value !== '' && translation.value !== '' && color.value !== '') {
		contentLst.push({
			word: word.value,
			translation: translation.value,
			color: color.value,
		});
	} else {
		alert('Одно из полей пустое!');
	};
	word.value = '';
	translation.value = '';
	color.value = '';
	render(contentLst);
});

formSearch.addEventListener('input', event => {
	event.preventDefault();
	const searchElem = event.target.value;
	const lst = contentLst.filter(elem => elem.word.startsWith(searchElem));
	render(lst);
})