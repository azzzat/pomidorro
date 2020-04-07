"use strict";

import { lastItemDone, todoList } from "./todo-border.js";

export let state;
export let pomidorroDuration = 25 * 60 * 1000;
let newWorkTime;
export let remainingTime;
export let pomidorroInterval;

function getTime(workTime) {
  let time = Date.parse(workTime) - Date.parse(new Date());
  let sec = Math.floor((time / 1000) % 60);
  let min = Math.floor((time / 1000 / 60) % 60);

  return {
    time: time,
    sec: sec,
    min: min
  };
}

function showTime(timeValue) {
  let minute = ("0" + timeValue.min).slice(-2);
  let second = ("0" + timeValue.sec).slice(-2);
  document
    .querySelector(".count-border-main")
    .querySelector(".timer-clock").innerHTML = minute + ":" + second + "";

  showTodoDescription(todoList);
}

function checkTime(timeValue) {
  if (timeValue.time <= 0) {
    clearInterval(pomidorroInterval);
    checkState();
  }
}

export function initiatePomidorro(workTime) {
  newWorkTime = workTime;
  launchPomidorro();
  pomidorroInterval = setInterval(launchPomidorro, 1000);
}

function launchPomidorro() {
  let timeValue = getTime(newWorkTime);
  showTime(timeValue);
  checkTime(timeValue);
  remainingTime = timeValue.time;
}

setCountborderViewWorkNotStarted();

export function checkState() {
  if (state == "startWork") {
    setCountdorderViewInRest2();
  } else {
    setCountborderViewWorkNotStarted();
  }
}

export function leftButtonClick() {
  if (state == "startWork") {
    setCountborderViewPausework();
  } else if (state == "pauseWork") {
    setCountborderViewInworkAfterPause();
  } else if (state == "resumeWork") {
    setCountborderViewPausework();
  } else if (state == "stopWork") {
    setCountborderViewFirstInwork();
  } else if (state == "restRest") {
    setCountborderViewInRest();
  } else if (state == "pauseRest") {
    setCounborderViewRestInPause();
  } else if (state == "resumeRest") {
    setCountborderViewInRest();
  }
}
document
  .querySelector(".left-button")
  .addEventListener("click", leftButtonClick);

export function rightButtonClick() {
  if (state == "startWork") {
    setCountborderViewWorkNotStarted();
  } else if (state == "pauseWork") {
    setCountdorderViewInRest2();
  } else if (state == "resumeWork") {
    setCountborderViewWorkNotStarted();
  } else if (state == "restRest") {
    setCountborderViewWorkNotStarted();
  } else if (state == "pauseRest") {
    setCountborderViewWorkNotStarted();
  } else if (state == "resumeRest") {
    setCountborderViewWorkNotStarted();
  } else {
  }
}
document
  .querySelector(".right-button")
  .addEventListener("click", rightButtonClick);

export function setCountborderViewFirstInwork() {
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("ПАУЗА");

  setIdValueRightButton("buttonRightRed");
  setRightButtonValue("СТОП");

  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");

  initiatePomidorro(new Date(Date.parse(new Date()) + pomidorroDuration));
  state = "startWork";
}

export function setCountborderViewPausework() {
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("ПРОДОЛЖИТЬ");

  setIdValueRightButton("buttonRightRed");
  setRightButtonValue("СДЕЛАНО");

  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");

  clearInterval(pomidorroInterval);

  state = "pauseWork";
}

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
  document
    .querySelector(".count-border-main")
    .querySelector(".timer-clock").innerHTML = "00:00";

  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("СТАРТ");

  setIdValueRightButton("buttonRightStop");
  setRightButtonValue("СТОП");

  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");

  clearInterval(pomidorroInterval);

  state = "stopWork";
}

export function setCountdorderViewInRest2() {
  setIdValueLeftButton("buttonLeftGreen");
  setLeftButtonValue("ПАУЗА");

  setIdValueRightButton("buttonRightGreen");
  setRightButtonValue("ПРОПУСТИТЬ");

  setBackgroundColor("rgb(86, 189, 86)");
  setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");

  initiatePomidorro(new Date(Date.parse(new Date()) + 5 * 60 * 1000));
  state = "restRest";

  lastItemDone(todoList);
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

function setBackgroundColor(color) {
  document.querySelector(".count-border-main").style.backgroundColor = color;
}

function setRightButtonValue(buttonValue) {
  document.querySelector(".right-button").innerHTML = buttonValue;
}

function setLeftButtonValue(buttonValue) {
  document.querySelector(".left-button").innerHTML = buttonValue;
}

function setTitleValue(value) {
  document.querySelector(".title").innerHTML = value;
}

function setIdValueRightButton(value) {
  document.querySelector(".right-button").setAttribute("id", value);
}

function setIdValueLeftButton(value) {
  document.querySelector(".left-button").setAttribute("id", value);
}

export function showTodoDescription(todoList) {
  if (todoList[0] == undefined) {
    document.querySelector(".processing-todo-task").innerHTML = "";
  } else if (
    state == "startWork" ||
    state == "pauseWork" ||
    state == "resumeWork" ||
    state == "stopWork"
  ) {
    document.querySelector(".processing-todo-task").innerHTML =
      todoList[0].todoDesc;
  } else if (
    state == "restRest" ||
    state == "pauseRest" ||
    state == "resumeRest"
  ) {
    document.querySelector(".processing-todo-task").innerHTML = "";
  }
}
