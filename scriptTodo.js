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
  let createdLists = "";

  for (let key in todoList) {
    if (document.querySelector(`.repeat-button-${key}`)) {
      document
        .querySelector(`.repeat-button-${key}`)
        .removeEventListener("click", function() {
          repeatTask(todoList, key);
        });
    }
    //removeEventTodoTaskRepeat();

    createdLists += '<div class="todo-body todo-case-body todo-case-bl"  id="';
    createdLists += key;
    createdLists +=
      '"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
    createdLists += todoList[key].todoCat;
    createdLists +=
      '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
    createdLists += todoList[key].todoDesc;
    createdLists +=
      '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button button-number repeat-button-';
    createdLists += key;
    createdLists += '")> <icon class="number-icon">';
    createdLists += todoList[key].quantity;
    createdLists +=
      '</inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>';
  }

  document.querySelector(".todo-item-list").innerHTML = createdLists;

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
  let createdLists = "";

  for (let key in doneTodoList) {
    if (document.querySelector(`.todo-done-button-${key}`)) {
      document
        .querySelector(`.todo-done-button-${key}`)
        .removeEventListener("click", function() {
          repeatTask(doneTodoList, key);
        });
    }
    //removeEventTodoTaskRepeat();

    createdLists +=
      '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <div class="todo-case-category-text">';
    createdLists += doneTodoList[key].todoCat;
    createdLists +=
      '</div> </div> <div class="todo-case-description"> <div class="todo-case-description-text">';
    createdLists += doneTodoList[key].todoDesc;
    createdLists +=
      '</div> </div> <div class="todo-case-tail"> <span class="todo-time">';
    createdLists += doneTodoList[key].date;
    createdLists +=
      '</span> <button class="todo-button todo-right-button todo-done-button-';
    createdLists += key;
    createdLists +=
      '"> <icon class="return-icon"> &#x21bb; </icon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div> ';
  }

  document.querySelector(".todo-case-category-done").innerHTML = createdLists;

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
