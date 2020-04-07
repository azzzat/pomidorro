"use strict";

import { doneTodoList, createDoneItems } from "../todo-border.js";

import { createDoneMassiveBox } from "./boxes-under-donelist.js";

export function deleteTaskButtonClick(id) {
  doneTodoList.splice(id, 1);

  createDoneItems();
  createDoneMassiveBox();
}
