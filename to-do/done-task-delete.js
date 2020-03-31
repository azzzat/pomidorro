"use strict";

import { doneTodoList, createDoneItems } from "../scriptTodo.js";

import { createDoneMassiveBox } from "./create-boxes-under-doneList.js";

export function deleteTaskButtonClick(id) {
  doneTodoList.splice(id, 1);

  createDoneItems();
  createDoneMassiveBox();
}
