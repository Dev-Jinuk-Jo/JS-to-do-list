const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList");

const PENDING_LS = "PENDING",
	DONE_LS = "DONE";

let PENDING, DONE

function saveLocal() {
  localStorage.setItem(PENDING_LS, JSON.stringify(PENDING));
  localStorage.setItem(DONE_LS, JSON.stringify(DONE));
}

function deleteToDo(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  removeFromDone(li.id);
  saveLocal();
}

function saveDone(obj) {
  DONE.push(obj);
}

function savePending(obj) {
  PENDING.push(obj);
}

function removeFromDone(id) {
  DONE = DONE.filter(function (obj) {
    return obj.id !== parseInt(id);
  })
}

function removeFromPending(id) {
  PENDING = PENDING.filter(function (obj) {
    return obj.id !== parseInt(id);
  })
}

function findInDone(id) {
  return DONE.find(function (obj) {
    return obj.id === parseInt(id);
  });
}

function findInPending(id) {
  return PENDING.find(function (obj) {
    return obj.id === parseInt(id);
  });
}

function handleBackBtn(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const obj = findInDone(li.id);
  removeFromDone(li.id);
  savePending(obj);
  paintPending(obj);
  saveLocal();
}

function handleDoneBtn(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const obj = findInPending(li.id);
  removeFromPending(li.id);
  saveDone(obj);
  paintDone(obj);
  saveLocal();
}

function buildCommon(obj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "✕";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = obj.text; 
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = obj.id;
  return li;
}

function paintDone(obj) {
  const li = buildCommon(obj);
  const backBtn = document.createElement("button");
  backBtn.innerText = "↩︎";
  backBtn.addEventListener("click", handleBackBtn)
  li.appendChild(backBtn);
  doneList.appendChild(li);
}

function paintPending(obj) {
  const li = buildCommon(obj);
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "✓";
  doneBtn.addEventListener("click", handleDoneBtn)
  li.appendChild(doneBtn);
  pendingList.appendChild(li);
}

function normalizeInput(text) {
  const obj = {
    id : new Date().getTime(),
    text
  }
  return obj;
}

function handleSubmit(event) {
  event.preventDefault();
  const obj = normalizeInput(toDoInput.value);
  paintPending(obj);
  savePending(obj);
  saveLocal();
  toDoInput.value = "";
}

function restore() {
  PENDING.forEach(function (obj) {
    paintPending(obj);
  });
  DONE.forEach(function (obj) {
    paintDone(obj);
  })
}

function loadLocalData() {
  PENDING = JSON.parse(localStorage.getItem(PENDING_LS)) || [];
  DONE = JSON.parse(localStorage.getItem(DONE_LS)) || [];
  console.log(PENDING);
}

function init() {
  loadLocalData();
  restore();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
