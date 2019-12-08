'use strict';

import {todoList, createToDo, createMassiveBox} from '../scriptTodo.js';

export let tmpTodoList = [];



export function makeTodoSmaller(boxNumber) {
    
    tmpTodoList = [];
    
    for (let key of todoList) {
        if (key.todoCat === document.querySelector(`.boxTodo${boxNumber}`).innerText){
            tmpTodoList.push(key);
            }
        };
    
    createToDo(tmpTodoList);
    
  let boxesTodo = document.querySelector('.category-boxes-todo').querySelectorAll('.category-box');

  for (let i = 0; i < boxesTodo.length; i++) {
        boxesTodo[i].querySelector('.makeList').innerHTML = '&#10060;';
        }
}

export function makeTodoBigger(event){
//  console.log(event);
//    
//  event.currentTarget.onmousedown = function() {
//      createToDo(todoList);
//      createMassiveBox();
//  }
//  tmpTodoList = []; 
}

//всё должно меняться с todoList