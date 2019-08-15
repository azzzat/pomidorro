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
let timeValue; // переменная для работы с фунциями showTime() checkTimeEnd() launchPomidorro();
let newWorkTime; // переменная для работы с launchPomidorro()

rightButtonStop();

//отображение времени
function showTime() {
        let minute = ("0" + timeValue.min).slice(-2);
        let second = ("0" + timeValue.sec).slice(-2);
        document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML =  minute + ":" + second + "";
}

// действие при истечении времени таймера:
function checkTimeEnd() {
        if (timeValue.time <= 0) {
            clearInterval(pomidorroInterval);
            if (state == "start") {
            rightButtonRest();}
            else{
            rightButtonStop()
            }; 
      }
}

function initiatePomidorro(workTime) {
        newWorkTime = workTime; //перезапись переменной для работы с launchPomidorro()
        launchPomidorro();
        pomidorroInterval = setInterval(launchPomidorro, 1000);
    };

function launchPomidorro() {
        timeValue = getTime(newWorkTime); 
        showTime(); //отображаем время
        checkTimeEnd(); //проверят не закончилось ли время
        remainingTime = timeValue.time; //запись в переменную оставшегося времени
}

function leftButtonStart() { 
    onClickLeftButtonValue("leftButtonPause()")
    idValueLeftButton("buttonLeftRed");
    leftButtonValue("ПАУЗА");

    onClickRighButtontValue("rightButtonStop()");
    idValueRightButton("buttonRightRed");
    rightButtonValue("СТОП");
    
    backgroundColorWork();
    titleValue("ПОМИДОР");
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.5*60*1000));
    state = "start";
};

function leftButtonPause() {
    onClickLeftButtonValue("leftButtonResume()")
    idValueLeftButton("buttonLeftRed");
    leftButtonValue("ПРОДОЛЖИТЬ");

    onClickRighButtontValue('rightButtonRest()');
    idValueRightButton("buttonRightRed");
    rightButtonValue("СДЕЛАНО");
    
    backgroundColorWork();
    titleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
};

function leftButtonResume() {
    onClickLeftButtonValue("leftButtonPause()")
    idValueLeftButton("buttonLeftRed");
    leftButtonValue("ПАУЗА");

    onClickRighButtontValue('rightButtonStop()');
    idValueRightButton("buttonRightRed");
    rightButtonValue("СТОП");
    
    backgroundColorWork();
    titleValue("ПОМИДОР");

    clearInterval(pomidorroInterval);
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
}

function rightButtonStop() {
    document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = "00:00";

    onClickLeftButtonValue("leftButtonStart()")
    idValueLeftButton("buttonLeftRed");
    leftButtonValue("СТАРТ");

    onClickRighButtontValue(' ');
    idValueRightButton("buttonRightStop");
    rightButtonValue("СТОП");
    
    backgroundColorWork();
    titleValue("ПОМИДОР");
    
    clearInterval(pomidorroInterval);
}

function rightButtonRest() {
    onClickLeftButtonValue("leftButtonRestPause()")
    idValueLeftButton("buttonLeftGreen");
    leftButtonValue("ПАУЗА");

    onClickRighButtontValue('rightButtonStop()');
    idValueRightButton("buttonRightGreen");
    rightButtonValue("ПРОПУСТИТЬ");
    
    backgroundColorRest();
    titleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    
    initiatePomidorro(new Date(Date.parse(new Date()) + 0.1*60*1000));
    state = "rest";
}

function leftButtonRestPause() {
    onClickLeftButtonValue("leftButtonRestResum()")
    idValueLeftButton("buttonLeftGreen");
    leftButtonValue("ПРОДОЛЖИТЬ");

    onClickRighButtontValue('rightButtonStop()');
    idValueRightButton("buttonRightGreen");
    rightButtonValue("ПРОПУСТИТЬ");
    
    backgroundColorRest();
    titleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval);    
}

function leftButtonRestResum() {
    onClickLeftButtonValue("leftButtonRestPause()")
    idValueLeftButton("buttonLeftGreen");
    leftButtonValue("ПАУЗА");

    onClickRighButtontValue('rightButtonStop()');
    idValueRightButton("buttonRightGreen");
    rightButtonValue("ПРОПУСТИТЬ");
    
    backgroundColorRest();
    titleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
    
    clearInterval(pomidorroInterval); 
    
    initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
}

// цвет фона в режиме работы
function backgroundColorWork() {
    document.querySelector(".count-border-main").style.backgroundColor = "#d03540";
}

// цвет фона в режиме перерыва
function backgroundColorRest() {
    document.querySelector(".count-border-main").style.backgroundColor = "rgb(86, 189, 86)";
}

// надпись на правой кнопке
function rightButtonValue(buttonValue) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".right-button").innerHTML = buttonValue;
}

//надпись на левой кнопке
function leftButtonValue(ButtonValue) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".left-button").innerHTML = ButtonValue;
}

//надпись на верхней части блока помидорро
function titleValue(value) {
    document.querySelector(".count-border-main").querySelector(".count-border-head").querySelector(".title").innerHTML = value;
}

//задаем функцию при нажатии на правую кнопку
function onClickRighButtontValue(value) {
    document.querySelector(".count-border-main").querySelector(".timer-buttons").querySelector(".right-button").setAttribute('onClick', value);
}

//задаем функцию при нажатии на левую кнопку
function onClickLeftButtonValue(value) {
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
