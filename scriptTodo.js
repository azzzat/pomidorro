"use strict";

import { divElem, handler } from "./to-do/drag-and-drop.js";
import { tmpTodoList, makeTodoBigger } from "./to-do/make-todo-by-group.js";
import {
  repeatTask,
  enterKeyClick,
  plusButtonClick
} from "./to-do/task-repeate.js";
import { createMassiveBox } from "./to-do/create-boxes-under-todolist.js";
import {
  restSettings,
  setLongRestLine,
  longRest
} from "./to-do/make-short-long-rest.js";
import { createDoneMassiveBox } from "./to-do/create-boxes-under-doneList.js";

import {
  addEventPlusButtonClick,
  addEventEnterKeyClick,
  removeEventTodoTaskRepeat,
  addEventTodoTaskRepeat,
  addEventHandler,
  addEventRepeatTask,
  removeEventRepeatTask,
  addEventDeleteTodoTasks,
  addEventDeleteDoneTodoTask
} from "./main.js";
import { choseList } from "./to-do/choseList.js";

export let todoList = [];

document
  .querySelector(".todo-input-button")
  .addEventListener("click", plusButtonClick);
//addEventPlusButtonClick();

document
  .querySelector(".todo-description-value")
  .addEventListener("keypress", enterKeyClick);
//addEventEnterKeyClick();

//происходит создание строки ToDo
export function createToDo(todoList) {
  //let createdLists = "";

  let createdLists = document.querySelector(".todo-item-list");
  createdLists.innerHTML = "";

  for (let key in todoList) {
    if (document.querySelector(`.repeat-button-${key}`)) {
      document
        .querySelector(`.repeat-button-${key}`)
        .removeEventListener("click", function() {
          repeatTask(todoList, key);
        });
    }
    //removeEventTodoTaskRepeat();

    //let createdLists = document.querySelector(".todo-item-list");

    function element(el) {
      return document.createElement(el);
    }

    let firstDiv = createdLists.appendChild(element("div"));
    firstDiv.className = "todo-body todo-case-body todo-case-bl";
    firstDiv.id = key;

    let innerFirstDiv = firstDiv.appendChild(element("div"));
    innerFirstDiv.className = "todo-case-category";

    let innerFirstDivInput = innerFirstDiv.appendChild(element("input"));
    innerFirstDivInput.className = "todo-input";
    innerFirstDivInput.setAttribute("style", "display:none");

    let innerFirstDivDiv = innerFirstDiv.appendChild(element("div"));
    innerFirstDivDiv.className = "todo-case-text";
    innerFirstDivDiv.innerHTML = todoList[key].todoCat;

    let innerSecondDiv = firstDiv.appendChild(element("div"));
    innerSecondDiv.className = "todo-case-description";

    let innerSecondDivDiv = innerSecondDiv.appendChild(element("div"));
    innerSecondDivDiv.className = "todo-case-text";
    innerSecondDivDiv.innerHTML = todoList[key].todoDesc;

    let innerThirdDiv = firstDiv.appendChild(element("div"));
    innerThirdDiv.className = "todo-case-tail";

    let innerThirdDivSpan = innerThirdDiv.appendChild(element("span"));
    innerThirdDivSpan.className = "todo-time";
    innerThirdDivSpan.innerHTML = "59.84";

    let innerThirdDivFirstButton = innerThirdDiv.appendChild(element("button"));
    innerThirdDivFirstButton.className = `todo-button todo-right-button button-number repeat-button-${key}`;

    let innerThirdDivFirstButtonIcon = innerThirdDivFirstButton.appendChild(
      element("icon")
    );
    innerThirdDivFirstButtonIcon.className = "number-icon";
    innerThirdDivFirstButtonIcon.innerHTML = todoList[key].quantity;

    let innerThirdDivSecondButton = firstDiv.appendChild(element("button"));
    innerThirdDivSecondButton.className = "todo-button todo-right-button";

    let innerThirdDivSecondButtonIcon = innerThirdDivSecondButton.appendChild(
      element("icon")
    );
    innerThirdDivSecondButtonIcon.className = "three-points-icon";
    innerThirdDivSecondButtonIcon.innerHTML = "&#183;&#183;&#183";

    // createdLists += '<div class="todo-body todo-case-body todo-case-bl"  id="';
    // createdLists += key;
    // createdLists +=
    //  '"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
    // createdLists += todoList[key].todoCat;
    // createdLists +=
    //  '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
    // createdLists += todoList[key].todoDesc;
    // createdLists +=
    //  '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button button-number repeat-button-';
    // createdLists += key;
    // createdLists += '")> <icon class="number-icon">';
    // createdLists += todoList[key].quantity;
    // createdLists +=
    //  '</inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>';
  }

  // document.querySelector(".todo-item-list").innerHTML = createdLists;

  if (longRest == undefined) {
    longRest = 4;
  }

  for (let key in todoList) {
    //перенес в make-toto-smaller
    document
      .querySelector(`.repeat-button-${key}`)
      .addEventListener("mousedown", function() {
        repeatTask(todoList, key);
      });
  }

  //    addEventTodoTaskRepeat(todoList);
  let divElem = document.querySelectorAll(".todo-case-bl"); // добавил для dragAndDropp - ДОБАВИТЬ

  for (let i = 0; i < divElem.length; i++) {
    divElem[i].addEventListener("mouseover", function() {
      handler();
    });
  }
  //    addEventHandler();
  setLongRestLine(todoList);
}

// перенос строки в сделанное
export let doneTodoList = [];

export function lastItemDone(todoList) {
  let date = new Date();
  let minute = ("0" + date.getHours()).slice(-2);
  let second = ("0" + date.getMinutes()).slice(-2);

  //убирает текущее задание

  if (todoList.length == 0) {
  } else if (todoList[0].quantity == 1) {
    console.log(todoList[0].quantity);
    doneTodoList.unshift(todoList.shift());
    doneTodoList[0].date = minute + ":" + second + "";
  } else {
    doneTodoList.unshift(todoList[0]);
    todoList[0].quantity = todoList[0].quantity - 1;
    doneTodoList[0].date = minute + ":" + second + "";
  }

  restSettings();
  createToDo(todoList);
  createMassiveBox();
  createDoneItems();
  createDoneMassiveBox();
}

export function deleteItemFromTodoList() {
  if (choseList() == tmpTodoList && todoList.length !== 0) {
    todoList.forEach(function(item, i, arr) {
      if (
        arr[i].todoCat == tmpTodoList[0].todoCat &&
        arr[i].todoDesc == tmpTodoList[0].todoDesc
      ) {
        if (arr[i].quantity == 1) {
          arr.splice(i, 1);
        } else {
          //arr[i].quantity = arr[i].quantity - 1;
        }
      }
    });
  }
}

// сделанные задания
export function createDoneItems() {
  // let createdLists = "";

  let createdList = document.querySelector(".todo-case-category-done");
  createdList.innerHTML = "";

  for (let key in doneTodoList) {
    if (document.querySelector(`.todo-done-button-${key}`)) {
      document
        .querySelector(`.todo-done-button-${key}`)
        .removeEventListener("click", function() {
          repeatTask(doneTodoList, key);
        });
    }
    //removeEventTodoTaskRepeat();

    function element(el) {
      return document.createElement(el);
    }

    let parentDiv = createdList.appendChild(element("div"));
    parentDiv.className = "todo-body todo-case-body";

    let firstChildDiv = parentDiv.appendChild(element("div"));
    firstChildDiv.className = "todo-case-category";

    let firstChildDivDiv = firstChildDiv.appendChild(element("div"));
    firstChildDivDiv.className = "todo-case-category-text";
    firstChildDivDiv.innerHTML = doneTodoList[key].todoCat;

    let secondChildDiv = parentDiv.appendChild(element("div"));
    secondChildDiv.className = "todo-case-description";

    let secondChildDivDiv = secondChildDiv.appendChild(element("div"));
    secondChildDivDiv.className = "todo-case-description-text";
    secondChildDivDiv.innerText = doneTodoList[key].todoDesc;

    let thirdChildDiv = parentDiv.appendChild(element("div"));
    thirdChildDiv.className = "todo-case-tail";

    let thirdChildDivSpan = thirdChildDiv.appendChild(element("span"));
    thirdChildDivSpan.className = "todo-time";
    thirdChildDivSpan.innerHTML = doneTodoList[key].date;

    let thirdChildDivFirstButton = thirdChildDiv.appendChild(element("button"));
    thirdChildDivFirstButton.className = `todo-button todo-right-button todo-done-button-${key}`;

    let thirdChildDivFirstButtonSpan = thirdChildDivFirstButton.appendChild(
      element("icon")
    );
    thirdChildDivFirstButtonSpan.className = "return-icon";
    thirdChildDivFirstButtonSpan.innerHTML = "&#x21bb;";

    let thirdChildDivSecondButton = thirdChildDiv.appendChild(
      element("button")
    );
    thirdChildDivSecondButton.className = "todo-button todo-right-button";

    let thirdChildDivSecondButtonSpan = thirdChildDivSecondButton.appendChild(
      element("icon")
    );
    thirdChildDivSecondButtonSpan.className = "three-points-icon";
    thirdChildDivSecondButtonSpan.innerHTML = "&#183;&#183;&#183;";

    // createdLists +=
    //   '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <div class="todo-case-category-text">';
    // createdLists += doneTodoList[key].todoCat;
    // createdLists +=
    //   '</div> </div> <div class="todo-case-description"> <div class="todo-case-description-text">';
    // createdLists += doneTodoList[key].todoDesc;
    // createdLists +=
    //   '</div> </div> <div class="todo-case-tail"> <span class="todo-time">';
    // createdLists += doneTodoList[key].date;
    // createdLists +=
    //   '</span> <button class="todo-button todo-right-button todo-done-button-';
    // createdLists += key;
    // createdLists +=
    //   '"> <icon class="return-icon"> &#x21bb; </icon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div> ';
  }

  // document.querySelector(".todo-case-category-done").innerHTML = createdLists;

  for (let key in doneTodoList) {
    document
      .querySelector(`.todo-done-button-${key}`)
      .addEventListener("click", function() {
        repeatTask(doneTodoList, key);
      });
  }
  //    addEventRepeatTask();

  //подсчет количества сделанных заданий
  let doneListLength = doneTodoList.length;
  document.querySelector(".done-todo-quantiti").innerText = doneListLength;
}

//удалить задания
export function deletTodoTasks() {
  todoList = [];

  createToDo(todoList);
  createMassiveBox();
}

document
  .querySelector(".category-box-delete-border")
  .addEventListener("click", deletTodoTasks);
//addEventRepeatTask();

// удалить сделанные задания
export function deletDoneTodoTasks() {
  doneTodoList = [];

  createDoneItems();
  createDoneMassiveBox();
}

document
  .querySelector(".category-box-delete-done")
  .addEventListener("click", deletDoneTodoTasks);

//повтор задания в пустой todoList
//изменить время
//убрать время
//поправить работу со tmpTodo
//enter
//innerHtml поменять
