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
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.5*60*1000));
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
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.1*60*1000));
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
let todoList = [];

function plusButtonClick() {
    let categoryTodo = document.querySelector(".todo-category-value").value;
    let descriptionTodo = document.querySelector(".todo-description-value").value;
    
    let todoListNew = {};
    todoListNew.todoCat = categoryTodo;
    todoListNew.todoDesc = descriptionTodo;
    
    let i = todoList.length;
    todoList[i] = todoListNew;
    
    createToDo();
    createMassiveBox();
}


//происходит создание строки ToDo
function createToDo() {
    let createdLists = "";

    for (let key in todoList) {
        createdLists += '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
        createdLists += todoList[key].todoCat;
        createdLists += '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
        createdLists += todoList[key].todoDesc;
        createdLists += '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button"> <inon class="number-icon"> 1 </inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>'
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

// удаление строк
    

// перенос строки в сделанное 

// группировка строк 


// 