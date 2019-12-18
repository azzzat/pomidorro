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

  checkTodo(categoryTodo, descriptionTodo);
  createToDo(todoList);
  createMassiveBox();
  clearTodoDescription();
}

function clearTodoDescription() {
  document.querySelector(".todo-description-value").value = "";
}
// тут пока не стал ничего менять

function checkTodo(categoryTodo, descriptionTodo) {
  if (
    checkTodoCondition(categoryTodo, descriptionTodo)
    //         (todoList.find(
    //             function(item, index, array){
    //             return (item.todoCat ==categoryTodo && item.todoDesc == descriptionTodo)}
    //         ))  == undefined
  ) {
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
