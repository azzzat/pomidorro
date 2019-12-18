"use strict";

import { todoList, createToDo } from "../scriptTodo.js";
import { createMassiveBox } from "./create-boxes-under-todolist.js";

export let tmpTodoList = [];

// переделать всё!!!!!!!!!!

export function makeTodoSmaller(boxNumber) {
  tmpTodoList = JSON.parse(JSON.stringify(todoList));

  while (0 < todoList.length) {
    todoList.pop();
  }

  for (let key of tmpTodoList) {
    if (
      key.todoCat === document.querySelector(`.boxTodo${boxNumber}`).innerText
    ) {
      todoList.push(key);
    }
  }

  createToDo(todoList);

  createMassiveBox();
  let boxesTodo = document
    .querySelector(".category-boxes-todo")
    .querySelectorAll(".category-box");
  for (let i = 0; i < boxesTodo.length; i++) {
    boxesTodo[i].onclick = console.log();
  }
  for (let i = 0; i < boxesTodo.length; i++) {
    boxesTodo[i].querySelector(".makeList").innerHTML = "&#10060;";
  }
  for (let i = 0; i < boxesTodo.length; i++) {
    boxesTodo[i]
      .querySelector(".makeList")
      .addEventListener("mouseover", makeTodoBigger, { once: true });
  }
}

export function makeTodoBigger(event) {
  event.currentTarget.onmousedown = function() {
    while (0 < todoList.length) {
      // если добавят в todoList
      todoList.pop();
    }
    todoList.push(...tmpTodoList);

    createToDo(todoList);
    createMassiveBox();

    let boxesTodo = document
      .querySelector(".category-boxes-todo")
      .querySelectorAll(".category-box");
    for (let i = 0; i < boxesTodo.length; i++) {
      boxesTodo[i]
        .querySelector(".makeList")
        .removeEventListener("mouseover", makeTodoBigger, { once: true });
    }
    tmpTodoList = [];
  };
}

//всё должно меняться с todoList
