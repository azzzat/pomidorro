'use strict';

function getTime(workTime) {
    let time = Date.parse(workTime) - Date.parse(new Date());
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor((time / 1000 / 60) % 60);

    return{
        "time" : time,
        "sec" : sec,
        "min" : min
    };
    };

let pomidorroInterval; //переменная для setInterval
let remainingTime; // оставшееся время для того чтобы можно было ставить на паузу
let state; // состояние режима работы - рабочее либо отдых
let newWorkTime; // переменная для работы с launchPomidorro()
let pomidorroDuration = 0.5*60*1000;
let stortRestDuration = 0.1*60*1000;
let longRestDuration = 0.2*60*1000;

stopRightButtonWork();

//отображение времени
function showTime(timeValue) {
        let minute = ("0" + timeValue.min).slice(-2);
        let second = ("0" + timeValue.sec).slice(-2);
        document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML =  minute + ":" + second + "";
}

// действие при истечении времени таймера:
function checkTime(timeValue) {
        if (timeValue.time <= 0) {
            clearInterval(pomidorroInterval);
            checkState();
      }
}

function checkState() {
    if (state == "start") {
        restRightButtonRest();}
        else{
        stopRightButtonWork()
        };
}

function initiatePomidorro(workTime) {
        newWorkTime = workTime; //перезапись переменной для работы с launchPomidorro()
        launchPomidorro();
        pomidorroInterval = setInterval(launchPomidorro, 1000);
    };

function launchPomidorro() {
        let timeValue = getTime(newWorkTime); 
        showTime(timeValue); //отображаем время
        checkTime(timeValue); //проверят не закончилось ли время
        remainingTime = timeValue.time; //запись в переменную оставшегося времени
}

function leftButtonClick(){
    if (state == "startWork"){
        pauseLeftButtonWork();
    } else 
    if (state == "pauseWork") {
        resumeLeftButtonWork();
    } else 
    if (state == "resumeWork") {
        pauseLeftButtonWork();
    } else 
    if (state == "stopWork"){
        startLeftButtonWork();
    } else 
    if (state == "restRest") {
        pauseLeftButtonRest();
    } else 
    if (state == "pauseRest") {
        resumeLeftButtonRest();
    } else 
    if (state == "resumeRest") {
        pauseLeftButtonRest();
    }
};

function rightButtonClick(){
    if (state == "startWork"){
        stopRightButtonWork();
    } else 
    if (state == "pauseWork") {
        restRightButtonRest();
    } else 
    if (state == "resumeWork") {
        stopRightButtonWork();
    } else 
    if (state == "restRest") {
        stopRightButtonWork();
    } else 
    if (state == "pauseRest") {
        stopRightButtonWork();
    } else 
    if (state == "resumeRest") {
        stopRightButtonWork();
    } else {}
};


function startLeftButtonWork() { 
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    idValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + pomidorroDuration));
    state = "startWork";
};

function pauseLeftButtonWork() {
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    idValueRightButton("buttonRightRed");
    setRightButtonValue("СДЕЛАНО");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    state = "pauseWork";
};

function resumeLeftButtonWork() {
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    idValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
    
    state = "resumeWork";
}

function stopRightButtonWork() {
    document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = "00:00";

    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("СТАРТ");

    idValueRightButton("buttonRightStop");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    clearInterval(pomidorroInterval);
    
    state= "stopWork";
}

function restRightButtonRest() {
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + stortRestDuration));
    state = "restRest";
}

function pauseLeftButtonRest() {
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval);
    
    state = "pauseRest";
}

function resumeLeftButtonRest() {
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval); 
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
    
    state = "resumeRest";
}

// цвет фонa
function setBackgroundColor(color) {
    document.querySelector(".count-border-main").style.backgroundColor = color;
}

// надпись на правой кнопке
function setRightButtonValue(buttonValue) {
    document.querySelector(".right-button").innerHTML = buttonValue;
}

//надпись на левой кнопке
function setLeftButtonValue(buttonValue) {
    document.querySelector(".left-button").innerHTML = buttonValue;
}

//надпись на верхней части блока помидорро
function setTitleValue(value) {
    document.querySelector(".title").innerHTML = value;
}

//задаем значение id для правой кнопки
function idValueRightButton(value) {
    document.querySelector(".right-button").setAttribute('id', value);
}

//задаем значение id для левой кнопки
function idValueLeftButton(value) {
    document.querySelector(".left-button").setAttribute('id', value);
}

//всё для механизма работы ту-ду листа

//то что происходит при нажатии на кнопку плюс:

//создаем массив для помещения в него todo дел

let totalInformationList = {};
//тут информация остальная:
let todoList = [];

// вызов функции при нажатии на кнопку
function plusButtonClick() {
    
    let categoryTodo = document.querySelector(".todo-category-value").value;
    let descriptionTodo = document.querySelector(".todo-description-value").value;
    
     
    checkTodo(categoryTodo, descriptionTodo);
    createToDo();
    createMassiveBox();
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

//происходит создание строки ToDo
function createToDo() {
 
    let createdLists = "";

    for (let key in todoList) {
        createdLists += '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
        createdLists += todoList[key].todoCat;
        createdLists += '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
        createdLists += todoList[key].todoDesc;
        createdLists += '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button"> <inon class="number-icon">';
        createdLists += todoList[key].quantity;
        createdLists += '</inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>';
    }
    document.querySelector(".todo-item-list").innerHTML = createdLists;
    }


// создание блоков с группировкой задач
function createMassiveBox() {
    let grouppedTodo = todoList.reduce((acc, cur)=>{
        acc[cur.todoCat] = acc[cur.todoCat] || {
            todoCat: cur.todoCat
        }
        return acc;
    },{})
    
    createToDoBox(grouppedTodo);
}

function createToDoBox(grouppedTodo) {
    let createdBox = "";
    
    for (let key in grouppedTodo) {
        createdBox += '<button class="category-box">';
        createdBox += grouppedTodo[key].todoCat;
        createdBox += '</button>';
    }
    document.querySelector(".category-boxes-todo").innerHTML = createdBox;
}


// перенос строки в сделанное 
let doneTodoList = []; 

function lastItemDone() {
    let date = new Date;
    if (todoList[0].quantity == 1) {
        doneTodoList.unshift(todoList.shift());
        doneTodoList[0].date = date.getHours() + ":" + date.getMinutes();
    } else {
        doneTodoList.unshift(todoList[0]);
        doneTodoList[0].quantity = doneTodoList[0].quantity - 1;
        doneTodoList[0].date = date.getHours() + ":" + date.getMinutes();
    }
    
    createToDo();
    createMassiveBox();
    createDoneItems();
    createDoneMassiveBox();
}

// сделанные задания
function createDoneItems() {

    let createdLists = '';

    for (let key in doneTodoList) {
        createdLists += '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <div class="todo-case-category-text">';
        createdLists += doneTodoList[key].todoCat;
        createdLists += '</div> </div> <div class="todo-case-description"> <div class="todo-case-description-text">';
        createdLists += doneTodoList[key].todoDesc;
        createdLists += '</div> </div> <div class="todo-case-tail"> <span class="todo-time">';
        createdLists += doneTodoList[key].date;
        createdLists += '</span> <button class="todo-button todo-right-button" onclick="repeatTask(';
        createdLists += key;
        createdLists += ')"> <icon class="return-icon"> &#x21bb; </icon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div> '
    }
    
    document.querySelector(".todo-case-category-done").innerHTML = createdLists;
    
    let doneListLength = doneTodoList.length;
    document.querySelector(".done-todo-quantiti").innerText = doneListLength;
    }

//создать боксы done
function createDoneMassiveBox() {
    let grouppedDoneTodo = doneTodoList.reduce((acc, cur)=>{
        acc[cur.todoCat] = acc[cur.todoCat] || {
            todoCat: cur.todoCat
        }
        return acc;
    },{})
    
    createTodoDoneBox(grouppedDoneTodo);
}

function createTodoDoneBox(grouppedDoneTodo) {
    let createdBox = "";
    
    for (let key in grouppedDoneTodo) {
        createdBox += '<button class="category-box">';
        createdBox += grouppedDoneTodo[key].todoCat;
        createdBox += '</button>';
    }
    document.querySelector(".category-boxes-done-todo").innerHTML = createdBox;
}


// повтор задания 
function repeatTask(key) {
    let categoryTodo = doneTodoList[key].todoCat;
    let descriptionTodo = doneTodoList[key].todoDesc;
    
    checkTodo(categoryTodo, descriptionTodo);
    createToDo();
    createMassiveBox();
}

//подсчет количества сделанных заданий


// клик на бокс - оставляет нужные дела;
// количество сделанных заданий
// очищаем список
// запуск задания при кликах
// перетаскивание заданий - верх-низ
// текущее задание на мониторе
// настроить появление длинного перерыва
// передвижение длинного переыва
// линия - сколько до длинного переыва
// оформить бокс
// время окончания очередного задания