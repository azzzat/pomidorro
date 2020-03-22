"use strict";

import { todoList } from "../scriptTodo.js";

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
  let indexNumber = 0;

  let createdBox = document.querySelector(".category-boxes-todo");

  createdBox.innerHTML = "";

  for (let key in grouppedTodo) {
    let firstChildButton = createdBox.appendChild(
      document.createElement("button")
    );
    firstChildButton.className = "category-box";

    let firstChildButtonDiv = firstChildButton.appendChild(
      document.createElement("div")
    );
    firstChildButtonDiv.className = "makeList";
    firstChildButtonDiv.innerHTML = "&#35;";

    let firstChildButtonFirstA = firstChildButton.appendChild(
      document.createElement("a")
    );
    firstChildButtonFirstA.className = `boxTodoA boxTodo${indexNumber++}`;
    firstChildButtonFirstA.innerHTML = grouppedTodo[key].todoCat;
  }
}
