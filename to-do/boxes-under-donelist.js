import { doneTodoList } from "../todo-border.js";

export function createDoneMassiveBox() {
  let grouppedDoneTodo = doneTodoList.reduce((acc, cur) => {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat,
    };
    return acc;
  }, {});

  console.log(grouppedDoneTodo);
  createToDoDoneBox(grouppedDoneTodo);
}

function createToDoDoneBox(grouppedDoneTodo) {
  let firstChildButton = document.querySelector(".category-boxes-done-todo");
  firstChildButton.innerHTML = " ";

  for (let key in grouppedDoneTodo) {
    let buttonChild = firstChildButton.appendChild(
      document.createElement("button")
    );
    buttonChild.className = "category-box";

    buttonChild.innerText = `# ${grouppedDoneTodo[key].todoCat}`;
  }
}
