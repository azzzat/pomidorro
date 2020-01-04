"use strict";

import { tmpTodoList } from "./make-todo-by-group";
import { todoList } from "../scriptTodo";

export function choseList() {
  if (tmpTodoList[0]) {
    return tmpTodoList;
  } else {
    return todoList;
  }
}
