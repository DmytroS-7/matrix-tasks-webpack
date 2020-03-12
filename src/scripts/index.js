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

function moveIntoTodo(newListItem, quadrant) {
  const listTodo = quadrant.getElementsByClassName("todoList")[0];
  listTodo.appendChild(newListItem); //перемещаю элемент li в Todo список

  const checkbox = newListItem.getElementsByTagName("input")[0];
  checkbox.addEventListener("click", () => {
    moveIntoDone(newListItem, quadrant);
    //alert("moveIntoDone");
  });
}

function moveIntoDone(newListItem, quadrant) {
  // console.log(newListItem);
  // console.log(quadrant);
  const listDone = quadrant.getElementsByClassName("done-list")[0];
  listDone.appendChild(newListItem); //перемещаю элемент li в Done список

  const checkbox = newListItem.getElementsByTagName("input")[0];
  checkbox.addEventListener("click", () => {
    moveIntoTodo(newListItem, quadrant);
    //alert("moveIntoTodo");
  });
}

function delLiTodo() {
  // alert("del");
  this.parentElement.remove();
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
  newListItem.appendChild(checkbox);
  newListItem.appendChild(text);
  newListItem.appendChild(space);
  newListItem.appendChild(icon);
  checkbox.addEventListener("click", () => {
    moveIntoDone(newListItem, quadrant);
  });
  return newListItem;
}

function getCheckBox() {
  const input = document.createElement("input");
  input.type = "checkbox";
  return input;
}

function getDeleteIcon() {
  const i = document.createElement("i");
  i.className = "fas fa-trash";
  const spanIcon = document.createElement("span");
  spanIcon.appendChild(i);
  spanIcon.addEventListener("click", delLiTodo);
  return spanIcon;
}
