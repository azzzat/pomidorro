'use strict';


export let longRest = 4;
export let shortRestDuration = 0.1*60*1000;
export let longRestDuration = 0.2*60*1000;

export let restDuration = shortRestDuration;

export let totalInformationList = {};
//тут информация остальная:
export let todoList = [];

export function plusButtonClick() {
    
    let categoryTodo = document.querySelector(".todo-category-value").value;
    let descriptionTodo = document.querySelector(".todo-description-value").value;
    
     
    checkTodo(categoryTodo, descriptionTodo);
    createToDo();
    createMassiveBox();
    descriptionTodoClear();
}

export function enterKeyClick() {
    if (event.key == "Enter") {
        plusButtonClick();
    }
}

document.querySelector(".todo-input-button").addEventListener("click", plusButtonClick);

document.querySelector(".todo-description-value").addEventListener("keypress", enterKeyClick);

export function descriptionTodoClear(){
    document.querySelector(".todo-description-value").value="";
}

export function checkTodo(categoryTodo, descriptionTodo) {
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

//происходит создание строки ToDo
export function createToDo() {
 
    let createdLists = "";

    for (let key in todoList) {
        if ( document.querySelector(`.repeat-button-${key}`) )
           {document.querySelector(`.repeat-button-${key}`).removeEventListener("click", function() {todoTaskRepeat(key)});}
        
        createdLists += '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
        createdLists += todoList[key].todoCat;
        createdLists += '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
        createdLists += todoList[key].todoDesc;
        createdLists += '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button repeat-button-';
        createdLists += key;
        createdLists += '")> <inon class="number-icon">';
        createdLists += todoList[key].quantity;
        createdLists += '</inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>';
        

    }
    
    document.querySelector(".todo-item-list").innerHTML = createdLists;
    
    if(longRest == undefined) {
        longRest = 4;
    }
    
    for (let key in todoList) {
        document.querySelector(`.repeat-button-${key}`).addEventListener("click", function() {todoTaskRepeat(key)});
    };
    
    setLongRestLine();
    }


// создание блоков с группировкой задач
export function createMassiveBox() {
    let grouppedTodo = todoList.reduce((acc, cur)=>{
        acc[cur.todoCat] = acc[cur.todoCat] || {
            todoCat: cur.todoCat,
            quantity: cur.quantity
        }
        return acc;
    },{})
    
    createToDoBox(grouppedTodo);
}

export function createToDoBox(grouppedTodo) {
    let createdBox = "";
    
    for (let key in grouppedTodo) {
        createdBox += '<button class="category-box">';
        createdBox += '#';
        createdBox += grouppedTodo[key].todoCat;
        createdBox += " - ";
        createdBox += grouppedTodo[key].quantity;
        createdBox += '</button>';
    }
    document.querySelector(".category-boxes-todo").innerHTML = createdBox;
}


// перенос строки в сделанное 
export let doneTodoList = []; 

export function lastItemDone() {
    let date = new Date;
    let minute = ("0" + date.getHours()).slice(-2);
    let second = ("0" + date.getMinutes()).slice(-2);
    
    if (todoList.length == 0) {
        console.log("отсчёт без дел");
    } else if (todoList[0].quantity == 1){
        doneTodoList.unshift(todoList.shift());
        // doneTodoList[0].date = date.getHours() + ":" + date.getMinutes();
        doneTodoList[0].date =  minute + ":" + second + "";
    } else {
        doneTodoList.unshift(todoList[0]);
        doneTodoList[0].quantity = doneTodoList[0].quantity - 1;
       // doneTodoList[0].date = date.getHours() + ":" + date.getMinutes();
        doneTodoList[0].date =  minute + ":" + second + "";
    }
    
    restSettings();
    createToDo();
    createMassiveBox();
    createDoneItems();
    createDoneMassiveBox();
}


// настройка перерывов
export function restSettings() {
    if (longRest <= 1) {
       restDuration = longRestDuration;
       longRest = 4;
    } else{
        longRest -= 1;
        //restDuration = shortRestDuration;
    }
}

export function setLongRestLine() {
    if( (todoList[0]) && (todoList[0].quantity >= longRest)){
        setRestLine(longRest, 1);
    } else if ((todoList[0]) && (todoList[1]) && ((todoList[0].quantity + todoList[1].quantity) >= longRest)) {
        setRestLine(longRest, 2);
    } else if ((todoList[0]) && (todoList[1]) && (todoList[2]) && ((todoList[0].quantity + todoList[1].quantity + todoList[2].quantity) >= longRest)) {
        setRestLine(longRest, 3);
    } else if ((todoList[0]) && (todoList[1]) && (todoList[2]) && (todoList[3]) && ((todoList[0].quantity + todoList[1].quantity + todoList[2].quantity + todoList[3].quantity) >= longRest)) {
        setRestLine(longRest, 4);
    } else if (!(todoList[0]) || !(todoList[1]) || !(todoList[2]) || !(todoList[3])) {
        //console.log("нет");
        }
    }


export function setRestLine(number, position) {
    let restLine = '<h7 class="todo-border-header todo-border-header-rest"> <a>Длинный перерыв -</a> <span> - Осталось ';
    restLine += number;
    restLine += ' </span> </h7>';

    document.querySelector(".todo-item-list .todo-case-body:nth-child("+position+")").insertAdjacentHTML("afterEnd", restLine);
}

// сделанные задания
export function createDoneItems() {

    let createdLists = '';

    for (let key in doneTodoList) {
        if ( document.querySelector(`.todo-done-button-${key}`) )
           {document.querySelector(`.todo-done-button-${key}`).removeEventListener("click", function() {repeatTask(key)});}
        
        createdLists += '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <div class="todo-case-category-text">';
        createdLists += doneTodoList[key].todoCat;
        createdLists += '</div> </div> <div class="todo-case-description"> <div class="todo-case-description-text">';
        createdLists += doneTodoList[key].todoDesc;
        createdLists += '</div> </div> <div class="todo-case-tail"> <span class="todo-time">';
        createdLists += doneTodoList[key].date;
        createdLists += '</span> <button class="todo-button todo-right-button todo-done-button-';
        createdLists += key;
        createdLists += '"> <icon class="return-icon"> &#x21bb; </icon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div> '
        
    }
    
    document.querySelector(".todo-case-category-done").innerHTML = createdLists;
    
    for (let key in doneTodoList) {
        document.querySelector(`.todo-done-button-${key}`).addEventListener("click", function() {repeatTask(key)});
    };
    
    //подсчет количества сделанных заданий
    let doneListLength = doneTodoList.length;
    document.querySelector(".done-todo-quantiti").innerText = doneListLength;
    }

//сделать подсчитанный todoDone

//создать боксы done
export function createDoneMassiveBox() {
    let grouppedDoneTodo = doneTodoList.reduce((acc, cur)=>{
        acc[cur.todoCat] = acc[cur.todoCat] || {
            todoCat: cur.todoCat,
        }
        return acc;
    },{})
    
    createTodoDoneBox(grouppedDoneTodo);
}

export function createTodoDoneBox(grouppedDoneTodo) {
    let createdBox = "";
    
    for (let key in grouppedDoneTodo) {
        createdBox += '<button class="category-box">';
        createdBox += '#';
        createdBox += grouppedDoneTodo[key].todoCat;
        createdBox += '</button>';
    }
    document.querySelector(".category-boxes-done-todo").innerHTML = createdBox;
}


// повтор задания 
export function repeatTask(key) {
    let categoryTodo = doneTodoList[key].todoCat;
    let descriptionTodo = doneTodoList[key].todoDesc;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo();
    createMassiveBox();
}

//повтор задания при клике
export function todoTaskRepeat(key) {
    let categoryTodo = todoList[key].todoCat;
    let descriptionTodo = todoList[key].todoDesc;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo();
    createMassiveBox();
}


//удалить задания
export function deletTodoTasks() {
    todoList = [];
    
    createToDo();
    createMassiveBox();
}

document.querySelector(".category-box-delete-border").addEventListener("click", deletTodoTasks);

// удалить сделанные задания
export function deletDoneTodoTasks() {
    doneTodoList = [];
    
    createDoneItems();
    createDoneMassiveBox();
}

document.querySelector(".category-box-delete-done").addEventListener("click", deletDoneTodoTasks);
