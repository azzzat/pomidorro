"use strict";

import { todoList } from "../scriptTodo.js";
import { makeTodoSmaller } from "./make-todo-by-group.js";

// создание блоков с группировкой задач
export function createMassiveBox() {
  let grouppedTodo = todoList.reduce((acc, cur) => {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat,
      quantity: cur.quantity
    };
    return acc;
  }, {});

  createToDoBox(grouppedTodo);
}

export function createToDoBox(grouppedTodo) {
  let createdBox = "";
  let indexNumber = 0;

  for (let key in grouppedTodo) {
    createdBox += '<button class="category-box">';
    createdBox +=
      '<div class="makeList">&#35;</div> <a class="boxTodoA boxTodo';
    createdBox += indexNumber++;
    createdBox += '">';
    createdBox += grouppedTodo[key].todoCat;
    createdBox += "</a> - ";
    createdBox += grouppedTodo[key].quantity; //неправильное отображение
    createdBox += "</button>";
  }
  document.querySelector(".category-boxes-todo").innerHTML = createdBox;

  let boxesTodo = document
    .querySelector(".category-boxes-todo")
    .querySelectorAll(".category-box");
  for (let i = 0; i < boxesTodo.length; i++) {
    boxesTodo[i].onclick = function() {
      makeTodoSmaller(i);
    };
  }
}
