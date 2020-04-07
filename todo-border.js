"use strict";

import { handler } from "./to-do/drag-and-drop";
import {
  repeatTask,
  enterKeyClick,
  plusButtonClick
} from "./to-do/task-repeat.js";
import { minusButtonClick } from "./to-do/task-delete.js";
import { createMassiveBox } from "./to-do/boxes-under-todolist.js";
import {
  restSettings,
  setLongRestLine,
  longRest
} from "./to-do/short-long-rest.js";
import { createDoneMassiveBox } from "./to-do/boxes-under-donelist.js";
import { deleteTaskButtonClick } from "./to-do/deleting-button.js";

export let todoList = [];

document
  .querySelector(".todo-input-button")
  .addEventListener("click", plusButtonClick);

document
  .querySelector(".todo-description-value")
  .addEventListener("keypress", enterKeyClick);

export function createToDo(todoList) {
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
    innerFirstDivDiv.className = "todo-case-text todo-case-text-category";
    innerFirstDivDiv.innerHTML = todoList[key].todoCat;

    let innerSecondDiv = firstDiv.appendChild(element("div"));
    innerSecondDiv.className = "todo-case-description";

    let innerSecondDivDiv = innerSecondDiv.appendChild(element("div"));
    innerSecondDivDiv.className = "todo-case-text todo-case-text-description";
    innerSecondDivDiv.innerHTML = todoList[key].todoDesc;

    let innerThirdDiv = firstDiv.appendChild(element("div"));
    innerThirdDiv.className = "todo-case-tail";

    let innerThirdDivSpan = innerThirdDiv.appendChild(element("span"));
    innerThirdDivSpan.className = "todo-time";
    let time = 25 * 60 * 1000 * todoList[key].quantity;
    let min = Math.floor((time / 1000 / 60) % 60);
    let hr = Math.floor((time / 1000 / 60 / 60) % 60);
    innerThirdDivSpan.innerHTML = hr + ":" + min;

    let innerThirdDivFirstButton = innerThirdDiv.appendChild(element("button"));
    innerThirdDivFirstButton.className = `todo-button todo-right-button button-number repeat-button-${key}`;

    let innerThirdDivFirstButtonIcon = innerThirdDivFirstButton.appendChild(
      element("icon")
    );
    innerThirdDivFirstButtonIcon.className = "number-icon";
    innerThirdDivFirstButtonIcon.innerHTML = todoList[key].quantity;

    let innerThirdDivSecondButton = firstDiv.appendChild(element("button"));
    innerThirdDivSecondButton.className = `todo-button todo-right-button minus-button-${key}`;

    let innerThirdDivSecondButtonIcon = innerThirdDivSecondButton.appendChild(
      element("icon")
    );
    innerThirdDivSecondButtonIcon.className = "delete-icon";
    innerThirdDivSecondButtonIcon.innerHTML = "&#8722;";
  }

  if (longRest == undefined) {
    longRest = 4;
  }

  for (let key in todoList) {
    document
      .querySelector(`.repeat-button-${key}`)
      .addEventListener("mousedown", function() {
        repeatTask(todoList, key);
      });
    document
      .querySelector(`.minus-button-${key}`)
      .addEventListener("mousedown", function() {
        minusButtonClick(key);
      });
  }

  let divElem = document.querySelectorAll(".todo-case-bl");

  for (let i = 0; i < divElem.length; i++) {
    divElem[i].addEventListener("mouseover", function() {
      handler();
    });
  }
  setLongRestLine(todoList);
}

export let doneTodoList = [];

export function lastItemDone(todoList) {
  let date = new Date();
  let minute = ("0" + date.getHours()).slice(-2);
  let second = ("0" + date.getMinutes()).slice(-2);

  if (todoList.length == 0) {
  } else if (todoList[0].quantity == 1) {
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

export function createDoneItems() {
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
    thirdChildDivSecondButton.className = `todo-button todo-right-button delete-done-task-${key}`;

    let thirdChildDivSecondButtonSpan = thirdChildDivSecondButton.appendChild(
      element("icon")
    );
    thirdChildDivSecondButtonSpan.className = "delete-icon";
    thirdChildDivSecondButtonSpan.innerHTML = "&#10007;";
  }

  for (let key in doneTodoList) {
    document
      .querySelector(`.todo-done-button-${key}`)
      .addEventListener("click", function() {
        repeatTask(doneTodoList, key);
      });

    document
      .querySelector(`.delete-done-task-${key}`)
      .addEventListener("click", function() {
        deleteTaskButtonClick(key);
      });
  }

  let doneListLength = doneTodoList.length;
  document.querySelector(".done-todo-quantiti").innerText = doneListLength;
}

export function deletTodoTasks() {
  todoList = [];

  createToDo(todoList);
  createMassiveBox();
}

document
  .querySelector(".category-box-delete-border")
  .addEventListener("click", deletTodoTasks);

export function deletDoneTodoTasks() {
  doneTodoList = [];

  createDoneItems();
  createDoneMassiveBox();
}

document
  .querySelector(".category-box-delete-done")
  .addEventListener("click", deletDoneTodoTasks);
