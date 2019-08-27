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

function startLeftButtonWork() { 
    onClickLeftButton("pauseLeftButtonWork()")
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    onClickRightButton("stopRightButtonWork()");
    idValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.5*60*1000));
    state = "start";
};

function pauseLeftButtonWork() {
    onClickLeftButton("resumeLeftButtonWork()")
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    onClickRightButton('restRightButtonRest()');
    idValueRightButton("buttonRightRed");
    setRightButtonValue("СДЕЛАНО");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
};

function resumeLeftButtonWork() {
    onClickLeftButton("pauseLeftButtonWork()")
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("ПАУЗА");

    onClickRightButton('stopRightButtonWork()');
    idValueRightButton("buttonRightRed");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
}

function stopRightButtonWork() {
    document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = "00:00";

    onClickLeftButton("startLeftButtonWork()")
    idValueLeftButton("buttonLeftRed");
    setLeftButtonValue("СТАРТ");

    onClickRightButton(' ');
    idValueRightButton("buttonRightStop");
    setRightButtonValue("СТОП");
    
    setBackgroundColor("#d03540");
    setTitleValue("ПОМИДОР");
    
    clearInterval(pomidorroInterval);
}

function restRightButtonRest() {
    onClickLeftButton("pauseLeftButtonRest()")
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    onClickRightButton('stopRightButtonWork()');
    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.1*60*1000));
    state = "rest";
}

function pauseLeftButtonRest() {
    onClickLeftButton("resumeLeftButtonRest()")
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПРОДОЛЖИТЬ");

    onClickRightButton('stopRightButtonWork()');
    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval);    
}

function resumeLeftButtonRest() {
    onClickLeftButton("pauseLeftButtonRest()")
    idValueLeftButton("buttonLeftGreen");
    setLeftButtonValue("ПАУЗА");

    onClickRightButton('stopRightButtonWork()');
    idValueRightButton("buttonRightGreen");
    setRightButtonValue("ПРОПУСТИТЬ");
    
    setBackgroundColor("rgb(86, 189, 86)");
    setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval); 
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
}

// цвет фонa
function setBackgroundColor(color) {
    document.querySelector(".count-border-main").style.backgroundColor = color;
}

// надпись на правой кнопке
function setRightButtonValue(buttonValue) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".right-button").innerHTML = buttonValue;
}

//надпись на левой кнопке
function setLeftButtonValue(buttonValue) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".left-button").innerHTML = buttonValue;
}

//надпись на верхней части блока помидорро
function setTitleValue(value) {
    document.querySelector(".count-border-main").querySelector(".count-border-head").querySelector(".title").innerHTML = value;
}

//задаем функцию при нажатии на правую кнопку
function onClickRightButton(value) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".right-button").setAttribute('onClick', value);
}

//задаем функцию при нажатии на левую кнопку
function onClickLeftButton(value) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".left-button").setAttribute('onClick', value);
}

//задаем значение id для правой кнопки
function idValueRightButton(value) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".right-button").setAttribute('id', value);
}

//задаем значение id для левой кнопки
function idValueLeftButton(value) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".left-button").setAttribute('id', value);
}
