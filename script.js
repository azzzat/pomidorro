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
            if (state == "start") {
            restRightButtonRest();}
            else{
            stopRightButtonWork()
            }; 
      }
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
