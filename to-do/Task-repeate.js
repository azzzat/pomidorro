"use strict";

import {
  todoList,
  doneTodoList,
  descriptionTodo,
  createToDo
} from "../scriptTodo.js";
import { createMassiveBox } from "./create-boxes-under-todolist.js";
import { choseList } from "./choseList.js";

export function repeatTask(list, key) {
  let categoryTodo = list[key].todoCat;
  let descriptionTodo = list[key].todoDesc;

  checkTodo(categoryTodo, descriptionTodo);
  createToDo(todoList);
  createMassiveBox();
}

//повтор задания при клике
//export function todoTaskRepeat(key) {
//    let categoryTodo = todoList[key].todoCat;
//    let descriptionTodo = todoList[key].todoDesc;
//
//    checkTodo(categoryTodo, descriptionTodo);
//    createToDo(todoList);
//    createMassiveBox();
//}

//повтор задания при клике на плюс
export function plusButtonClick() {
  let categoryTodo = document.querySelector(".todo-category-value").value;
  let descriptionTodo = document.querySelector(".todo-description-value").value;

  checkTodo(categoryTodo, descriptionTodo, choseList());
  createToDo(choseList());
  createMassiveBox(); // может убрать
  clearTodoDescription();
}

function clearTodoDescription() {
  document.querySelector(".todo-description-value").value = "";
}
// тут пока не стал ничего менять

function checkTodo(categoryTodo, descriptionTodo, todoList) {
  if (checkTodoCondition(categoryTodo, descriptionTodo)) {
    let newTodoItem = {};

    newTodoItem.todoCat = categoryTodo;
    newTodoItem.todoDesc = descriptionTodo;
    newTodoItem.quantity = 1;

    let i = todoList.length;
    choseList()[i] = newTodoItem;
  } else {
    choseList().forEach(function(item, index, array) {
      if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
        item.quantity += 1;
      }
    });
  }
}

function checkTodoCondition(categoryTodo, descriptionTodo) {
  console.log("работает");
  return (
    todoList.find(function(item, index, array) {
      return item.todoCat == categoryTodo && item.todoDesc == descriptionTodo;
    }) == undefined
  );
}

function enterKeyClick() {
  if (event.key == "Enter") {
    plusButtonClick();
  }
}
