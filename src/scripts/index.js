import "bootstrap";
import "@fortawesome/fontawesome-free/js/all";
import "../styles/index.scss";

let importantAndUrgent;
let importantAndNotUrgent;
let notImportantAndUrgent;
let notImportantAndNotUrgent;

(function() {
  importantAndUrgent = document.getElementById("importantAndUrgent");
  importantAndNotUrgent = document.getElementById("importantAndNotUrgent");
  notImportantAndUrgent = document.getElementById("notImportantAndUrgent");
  notImportantAndNotUrgent = document.getElementById(
    "notImportantAndNotUrgent"
  );
  const quadrants = [
    importantAndUrgent,
    importantAndNotUrgent,
    notImportantAndUrgent,
    notImportantAndNotUrgent
  ];

  quadrants.forEach(quadrant => {
    const button = quadrant.getElementsByTagName("button")[0];
    button.addEventListener("click", () => {
      addNewTask(quadrant);
    });
  });
})();

function modifyTodo() {
  // const elLi = document.getElementsByClassName(this.className);
  const elemLi = document.getElementById(this.id);
  //console.log(elemLi.outerText);
  let txt = this.className;
  txt = txt.replace("li-", "");
  const input = elemLi.getElementsByTagName("input")[0];
  input.checked = true;

  const listDone = document.getElementsByClassName(txt)[0]; //нахожу список Done
  const newLiDone = getLiDoneWithText(elemLi.outerText);
  listDone.appendChild(newLiDone); //добавляю элемент li в Done список
  elemLi.classList.add("done");
  elemLi.remove();

  // listDone.onclick = function(e) {
  //   const checkClick = e.target.tagName;
  //   // alert(e.target.tagName);
  //   if (checkClick == "path") {
  //     listDone.remove();
  //   }
  // };
}

function delLiTodo() {
  alert("del");
}

function addItemToListDone(quadrant, value) {
  const listDone = quadrant.getElementsByClassName("done-list")[0]; //нахожу списки Done
  //console.log(listDone);
  const newLiDone = getLiDoneWithText(value);
  listDone.appendChild(newLiDone); //добавляю элемент li в Done список
}

function getLiDoneWithText(value) {
  const newListItemDone = document.createElement("li");
  const checkboxDone = getCheckBoxDone();
  const textDone = document.createTextNode(" " + value);
  const spaceDone = document.createTextNode(" ");
  const iconDone = getDeleteIcon();
  newListItemDone.appendChild(checkboxDone);
  newListItemDone.appendChild(textDone);
  newListItemDone.appendChild(spaceDone);
  newListItemDone.appendChild(iconDone);
  return newListItemDone;
}

function getCheckBoxDone() {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = true;
  return input;
}

function addNewTask(quadrant) {
  const value = getInputValue(quadrant);
  if (value) {
    addNewItem(value, quadrant);
  } else {
    alert("Введите значение!");
  }
}

function getInputValue(quadrant) {
  return quadrant.getElementsByClassName("new-task-input")[0].value;
}

function addNewItem(value, quadrant) {
  const list = quadrant.getElementsByClassName("todoList")[0];
  const newLi = getLiWithText(value, quadrant);
  list.appendChild(newLi);

  // console.log(list);
}

function getLiWithText(value, quadrant) {
  const newListItem = document.createElement("li");
  const checkbox = getCheckBox();
  const text = document.createTextNode(" " + value);
  const space = document.createTextNode(" ");
  const icon = getDeleteIcon();
  const valueQuadrantId = quadrant.id;
  newListItem.className = "li-" + valueQuadrantId;
  newListItem.id = Date.now();
  newListItem.addEventListener("click", modifyTodo);
  newListItem.appendChild(checkbox);
  newListItem.appendChild(text);
  newListItem.appendChild(space);
  newListItem.appendChild(icon);
  return newListItem;
}

function getLabel() {
  const label = document.createElement("label");
  return label;
}

function getCheckBox() {
  const input = document.createElement("input");
  input.type = "checkbox";
  return input;
}

function getDeleteIcon() {
  const i = document.createElement("i");
  i.className = "fas fa-trash";
  i.addEventListener("click", delLiTodo);
  return i;
}
