import { doneTodoList } from "../todo-border.js";

export function createDoneMassiveBox() {
  let grouppedDoneTodo = doneTodoList.reduce((acc, cur) => {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat
    };
    return acc;
  }, {});

  createToDoDoneBox(grouppedDoneTodo);
}

function createToDoDoneBox(grouppedDoneTodo) {
  let createdBox = "";

  for (let key in grouppedDoneTodo) {
    createdBox += '<button class="category-box">';
    createdBox += "#";
    createdBox += grouppedDoneTodo[key].todoCat;
    createdBox += "</button>";
  }
  document.querySelector(".category-boxes-done-todo").innerHTML = createdBox;
}
