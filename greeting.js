const greetingForm = document.querySelector(".js-greetingForm"),
	greetingInput = greetingForm.querySelector("input"),
	message = document.querySelector(".js-message");

const USER_LS = "currentUser",
	SHOWING_CN = "showing";

function saveName(text) {
	localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = greetingInput.value;
	paintMessage(currentValue);
	saveName(currentValue);
}

function askForName() {
	greetingForm.classList.add(SHOWING_CN);;
	greetingForm.addEventListener("submit", handleSubmit)
}

function paintMessage(text) {
	greetingForm.classList.remove(SHOWING_CN);
	message.classList.add(SHOWING_CN);
	message.innerText = `Have a good day ${text}`;
}

function loadName() {
	const currentUser = localStorage.getItem(USER_LS)
	if(currentUser === null) {
		askForName();
	} else {
		paintMessage(currentUser);
	}
}

function init() {
	loadName();
}

init()