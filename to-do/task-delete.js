"use strict";

import {
  todoList,
  doneTodoList,
  descriptionTodo,
  createToDo
} from "../scriptTodo.js";
import { createMassiveBox } from "./create-boxes-under-todolist.js";

export function minusButtonClick(id) {
  let categoryTodo = document
    .getElementById(id)
    .querySelector(".todo-case-text-category").innerHTML;
  let descriptionTodo = document
    .getElementById(id)
    .querySelector(".todo-case-text-description").innerHTML;

  checkTodo(categoryTodo, descriptionTodo, id);
  createToDo(todoList);
  createMassiveBox();
}

function checkTodo(categoryTodo, descriptionTodo, id) {
  todoList.forEach(function(item, index, array) {
    if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
      if (item.quantity == 1) {
        todoList.splice(id, 1);
      } else {
        item.quantity -= 1;
      }
    }
  });
}
