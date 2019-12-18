"use strict";

import { todoList } from "../scriptTodo";

export let longRest = 4;
export let shortRestDuration = 0.1 * 60 * 1000;
export let longRestDuration = 0.2 * 60 * 1000;
export let restDuration = shortRestDuration;

export function restSettings() {
  if (longRest <= 1) {
    restDuration = longRestDuration;
    longRest = 4;
  } else {
    longRest -= 1;
  }
}

export function setLongRestLine(todoList) {
  if (todoList[0] && todoList[0].quantity >= longRest) {
    setRestLine(longRest, 1);
  } else if (
    todoList[0] &&
    todoList[1] &&
    todoList[0].quantity + todoList[1].quantity >= longRest
  ) {
    setRestLine(longRest, 2);
  } else if (
    todoList[0] &&
    todoList[1] &&
    todoList[2] &&
    todoList[0].quantity + todoList[1].quantity + todoList[2].quantity >=
      longRest
  ) {
    setRestLine(longRest, 3);
  } else if (
    todoList[0] &&
    todoList[1] &&
    todoList[2] &&
    todoList[3] &&
    todoList[0].quantity +
      todoList[1].quantity +
      todoList[2].quantity +
      todoList[3].quantity >=
      longRest
  ) {
    setRestLine(longRest, 4);
  } else if (!todoList[0] || !todoList[1] || !todoList[2] || !todoList[3]) {
  }
}

export function setRestLine(number, position) {
  let restLine =
    '<h7 class="todo-border-header todo-border-header-rest"> <a>Длинный перерыв -</a> <span> - Осталось ';
  restLine += number;
  restLine += " </span> </h7>";

  document
    .querySelector(
      ".todo-item-list .todo-case-body:nth-child(" + position + ")"
    )
    .insertAdjacentHTML("afterEnd", restLine);
}
