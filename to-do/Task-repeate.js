"use strict";

import {
  todoList,
  doneTodoList,
  descriptionTodo,
  createToDo
} from "../scriptTodo.js";
import { createMassiveBox } from "./create-boxes-under-todolist.js";

export function repeatTask(list, key) {
  let categoryTodo = list[key].todoCat;
  let descriptionTodo = list[key].todoDesc;

  checkTodo(categoryTodo, descriptionTodo, todoList);
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

  checkTodo(categoryTodo, descriptionTodo, todoList);
  createToDo(todoList);
  createMassiveBox();
  clearTodoDescription();
}

function clearTodoDescription() {
  document.querySelector(".todo-description-value").value = "";
}

function checkTodo(categoryTodo, descriptionTodo, todoList) {
  if (checkTodoCondition(categoryTodo, descriptionTodo)) {
    let newTodoItem = {};

    newTodoItem.todoCat = categoryTodo;
    newTodoItem.todoDesc = descriptionTodo;
    newTodoItem.quantity = 1;

    let i = todoList.length;
    todoList[i] = newTodoItem;
  } else {
    todoList.forEach(function(item, index, array) {
      if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
        item.quantity += 1;
      }
    });
  }
}

function checkTodoCondition(categoryTodo, descriptionTodo) {
  return (
    todoList.find(function(item, index, array) {
      return item.todoCat == categoryTodo && item.todoDesc == descriptionTodo;
    }) == undefined
  );
}

export function enterKeyClick() {
  if (event.key == "Enter") {
    plusButtonClick();
  }
}
