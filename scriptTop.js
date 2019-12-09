'use strict';


import {lastItemDone, todoList} from './scriptTodo.js';
import {tmpTodoList} from './to-do/make-todo-list-smaller.js';

export let state; // состояние режима работы - рабочее либо отдых
export let pomidorroDuration = 0.5*60*1000;


// новый модуль
let newWorkTime; // переменная для работы с launchPomidorro()
export let remainingTime; // оставшееся время для того чтобы можно было ставить на паузу
export let pomidorroInterval; //переменная для setInterval

function getTime(workTime) {
    let time = Date.parse(workTime) - Date.parse(new Date());
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor((time / 1000 / 60) % 60);

    return{
        "time" : time,
        "sec" : sec,
        "min" : min
    };
}

function showTime(timeValue) {
    let minute = ("0" + timeValue.min).slice(-2);
    let second = ("0" + timeValue.sec).slice(-2);
    document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML =  minute + ":" + second + "";
    
    showTodoDescription(todoList);
}

function checkTime(timeValue) {
    if (timeValue.time <= 0) {
        clearInterval(pomidorroInterval);
        checkState();
      }
}

export function initiatePomidorro(workTime) {
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

// этот модуль

setCountborderViewWorkNotStarted();

//отображение времени
// действие при истечении времени таймера:

export function checkState() {
    if (state == "startWork") {
        setCountdorderViewInRest2();}
        else{
        setCountborderViewWorkNotStarted()
        };
}


export function leftButtonClick(){
    if (state == "startWork"){
        setCountborderViewPausework();
    } else 
    if (state == "pauseWork") {
        setCountborderViewInworkAfterPause();
    } else 
    if (state == "resumeWork") {
        setCountborderViewPausework();
    } else 
    if (state == "stopWork"){
        setCountborderViewFirstInwork();
    } else 
    if (state == "restRest") {
        setCountborderViewInRest();
    } else 
    if (state == "pauseRest") {
        setCounborderViewRestInPause();
    } else 
    if (state == "resumeRest") {
        setCountborderViewInRest();
    }
};
document.querySelector(".left-button").addEventListener("click", leftButtonClick);


export function rightButtonClick(){
    if (state == "startWork"){
        setCountborderViewWorkNotStarted();
    } else 
    if (state == "pauseWork") {
        setCountdorderViewInRest2();
    } else 
    if (state == "resumeWork") {
        setCountborderViewWorkNotStarted();
    } else 
    if (state == "restRest") {
        setCountborderViewWorkNotStarted();
    } else 
    if (state == "pauseRest") {
        setCountborderViewWorkNotStarted();
    } else 
    if (state == "resumeRest") {
        setCountborderViewWorkNotStarted();
    } else {}
};
document.querySelector(".right-button").addEventListener("click", rightButtonClick);


export function setCountborderViewFirstInwork() { 
    setIdValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    setIdValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + pomidorroDuration));
    state = "startWork";
};

export function setCountborderViewPausework() {
    setIdValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    setIdValueRightButton("buttonRightRed");
    setRightButtonValue("СДЕЛАНО");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    state = "pauseWork";
};

export function setCountborderViewInworkAfterPause() {
    setIdValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    setIdValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
    
    state = "resumeWork";
}

export function setCountborderViewWorkNotStarted() {
    document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = "00:00";

    setIdValueLeftButton("buttonLeftRed");
    setLeftButtonValue("СТАРТ");

    setIdValueRightButton("buttonRightStop");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    clearInterval(pomidorroInterval);
    
    state= "stopWork";
}


export function setCountdorderViewInRest2() {
    setIdValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    setIdValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.1*60*1000));
    state = "restRest";
    
    lastItemDone();
}

export function setCountborderViewInRest() {
    setIdValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    setIdValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval);
    
    state = "pauseRest";
}

export function setCounborderViewRestInPause() {
    setIdValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    setIdValueRightButton("buttonRightGreen");
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
function setIdValueRightButton(value) {
    document.querySelector(".right-button").setAttribute('id', value);
}

//задаем значение id для левой кнопки
function setIdValueLeftButton(value) {
    document.querySelector(".left-button").setAttribute('id', value);
}

export function showTodoDescription(todoList) {
    if (todoList[0] == undefined) {
        document.querySelector(".processing-todo-task").innerHTML = "";
    } else if( state == "startWork" || state == "pauseWork" || state == "resumeWork" || state == "stopWork") {
        document.querySelector(".processing-todo-task").innerHTML = todoList[0].todoDesc;}
    else if (state == "restRest"|| state == "pauseRest" || state == "resumeRest") {
        document.querySelector(".processing-todo-task").innerHTML = "";
    }
}