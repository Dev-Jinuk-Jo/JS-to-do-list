const body = document.querySelector("body");

const IMG_NUMBER = 7;

function setImage(imgNumber) {
	const image = new Image();
	image.src = `images/${imgNumber + 1}.jpeg`
	image.classList.add("js-bgImage");
	body.appendChild(image);
}

function getRandom() {
	const number = Math.floor(Math.random() * IMG_NUMBER);
	return number
}

function init() {
	const randomNumber = getRandom();
	setImage(randomNumber);
}

init();