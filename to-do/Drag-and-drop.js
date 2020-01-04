import { todoList, todoTaskRepeat } from "../scriptTodo.js";
import { choseList } from "./choseList.js";

export let divElem = document.querySelectorAll(".todo-case-bl");
document.onselectstart = function() {
  return false;
};

let todoRightButton = document.querySelectorAll(".todo-right-button");

export function handler() {
  //if ( event.target !== document.querySelector(`.button-number`)){
  //    console.log("ytttttt");
  //} else if(event.target === document.querySelector(`.button-number`)){
  //    event.target.onmousedown = function() {todoTaskRepeat(rowNumber); console.log("working");};
  //} else {};
  //document.querySelector(`.repeat-button-${key}`).addEventListener("click", function() {todoTaskRepeat(key)});

  event.currentTarget.onmousedown = function(event) {
    divElem = document.querySelectorAll(".todo-case-bl");

    for (let i = 0; i < divElem.length; i++) {
      divElem[i].removeEventListener("mouseover", handler);
    }

    let cloneDiv = event.currentTarget.cloneNode(true);
    let elementsStyle = getComputedStyle(event.currentTarget);
    cloneDiv.style.position = "absolute";
    cloneDiv.style.opacity = 0.5;
    cloneDiv.style.zIndex = 100;
    cloneDiv.style.top = event.currentTarget.offsetTop + "px";
    cloneDiv.style.left = event.currentTarget.offsetLeft + "px";
    cloneDiv.style.width = elementsStyle.width;
    cloneDiv.style.height = elementsStyle.height;
    let newDiv = document
      .querySelector(".todo-item-list")
      .appendChild(cloneDiv); //поменять

    document.body.append(newDiv);
    let newTodoList = choseList()[cloneDiv.id];

    cloneDiv.ondragstart = function() {
      return false;
    };
    //не показывает
    for (let i = 0; i < divElem.length; i++) {
      divElem[i].addEventListener("mouseover", change);
    }

    function change() {
      choseList().splice(cloneDiv.getAttribute("id"), 1);

      cloneDiv.setAttribute("id", this.id); // id добавить
      choseList().splice(this.id, 0, newTodoList);

      function makeNewList() {
        //убрать линию
        for (let i = 0; i < divElem.length; i++) {
          divElem[i].setAttribute("id", i);
        }
        for (let i = 0; i < divElem.length; i++) {
          divElem[i]
            .querySelector(".todo-case-category")
            .querySelector(".todo-case-text").innerHTML = choseList()[
            i
          ].todoCat;

          divElem[i]
            .querySelector(".todo-case-description")
            .querySelector(".todo-case-text").innerHTML = choseList()[
            i
          ].todoDesc;

          let ars1 = divElem[i].querySelector(".todo-case-tail");
          ars1.querySelector(".number-icon").innerHTML = choseList()[
            i
          ].quantity;
        }
      }
      makeNewList();
    }

    document.onmouseup = function() {
      document.onmousemove = function() {};
      for (let i = 0; i < divElem.length; i++) {
        divElem[i].removeEventListener("mouseover", change);
      }
      for (let i = 0; i < divElem.length; i++) {
        divElem[i].addEventListener("mouseover", handler);
      }
      cloneDiv.style.pointerEvents = "auto";
      newDiv.remove();
    };

    document.onmousemove = function(newEvent) {
      let posLeft = newEvent.pageX - newDiv.offsetLeft;
      let posTop = newEvent.pageY - newDiv.offsetTop;

      document.onmousemove = function(newEvent) {
        newDiv.style.top = newEvent.pageY - posTop + "px";
        newDiv.style.left = newEvent.pageX - posLeft + "px";
        cloneDiv.style.pointerEvents = "none";
      };
    };
  };
}
