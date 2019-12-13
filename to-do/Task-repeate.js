"use strict";

import {todoList, doneTodoList, descriptionTodo, createToDo} from '../scriptTodo.js';
import {createMassiveBox} from './Create-boxes-under-todolist.js';

export function repeatTask(key) {
    let categoryTodo = doneTodoList[key].todoCat;
    let descriptionTodo = doneTodoList[key].todoDesc;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo(todoList);
    createMassiveBox();
}

//повтор задания при клике
export function todoTaskRepeat(key) {
    let categoryTodo = todoList[key].todoCat;
    let descriptionTodo = todoList[key].todoDesc;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo(todoList);
    createMassiveBox();
}

//повтор задания при клике на плюс
export function plusButtonClick() {
    let categoryTodo = document.querySelector(".todo-category-value").value;
    let descriptionTodo = document.querySelector(".todo-description-value").value;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo(todoList);
    createMassiveBox();
    descriptionTodoClear();
}

function descriptionTodoClear(){
    document.querySelector(".todo-description-value").value="";
}

function checkTodo(categoryTodo, descriptionTodo) {
    if (
         (todoList.find(
             function(item, index, array){
             return (item.todoCat ==categoryTodo && item.todoDesc == descriptionTodo)}
         ))  == undefined
         ){
        let todoListNew = {};
    
        todoListNew.todoCat = categoryTodo;
        todoListNew.todoDesc = descriptionTodo;
        todoListNew.quantity = 1;
        
        let i = todoList.length;
        todoList[i] = todoListNew;} 
        else {
            todoList.forEach(function(item, index, array){
            if(item.todoCat ==categoryTodo && item.todoDesc == descriptionTodo) {
            item.quantity += 1}
        });
    }
}

function enterKeyClick() {
    if (event.key == "Enter") {
        plusButtonClick();
    }
}