// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"to-do/create-boxes-under-todolist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMassiveBox = createMassiveBox;
exports.createToDoBox = createToDoBox;

var _scriptTodo = require("../scriptTodo.js");

var _makeTodoByGroup = require("./make-todo-by-group.js");

// создание блоков с группировкой задач
function createMassiveBox() {
  var grouppedTodo = _scriptTodo.todoList.reduce(function (acc, cur) {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat,
      quantity: cur.quantity
    };
    return acc;
  }, {});

  createToDoBox(grouppedTodo);
}

function createToDoBox(grouppedTodo) {
  var createdBox = "";
  var indexNumber = 0;

  for (var key in grouppedTodo) {
    createdBox += '<button class="category-box">';
    createdBox += '<div class="makeList">&#35;</div> <a class="boxTodoA boxTodo';
    createdBox += indexNumber++;
    createdBox += '">';
    createdBox += grouppedTodo[key].todoCat;
    createdBox += "</a> - ";
    createdBox += grouppedTodo[key].quantity; //неправильное отображение

    createdBox += "</button>";
  }

  document.querySelector(".category-boxes-todo").innerHTML = createdBox;
  var boxesTodo = document.querySelector(".category-boxes-todo").querySelectorAll(".category-box");

  var _loop = function _loop(i) {
    boxesTodo[i].onclick = function () {
      (0, _makeTodoByGroup.makeTodoSmaller)(i);
    };
  };

  for (var i = 0; i < boxesTodo.length; i++) {
    _loop(i);
  }
}
},{"../scriptTodo.js":"scriptTodo.js","./make-todo-by-group.js":"to-do/make-todo-by-group.js"}],"to-do/make-todo-by-group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTodoSmaller = makeTodoSmaller;
exports.tmpTodoList = void 0;

var _scriptTodo = require("../scriptTodo.js");

var _createBoxesUnderTodolist = require("./create-boxes-under-todolist.js");

var tmpTodoList = []; // переделать всё!!!!!!!!!!

exports.tmpTodoList = tmpTodoList;

function makeTodoSmaller(boxNumber) {
  exports.tmpTodoList = tmpTodoList = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _scriptTodo.todoList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (key.todoCat === document.querySelector(".boxTodo".concat(boxNumber)).innerText) {
        tmpTodoList.push(key);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  (0, _scriptTodo.createToDo)(tmpTodoList); // tmpTodoList = JSON.parse(JSON.stringify(todoList));
  // while (0 < todoList.length) {
  //   todoList.pop();
  // }
  // for (let key of tmpTodoList) {
  //   if (
  //     key.todoCat === document.querySelector(`.boxTodo${boxNumber}`).innerText
  //   ) {
  //     todoList.push(key);
  //   }
  // }
  // createToDo(todoList);
  // createMassiveBox();
  // let boxesTodo = document
  //   .querySelector(".category-boxes-todo")
  //   .querySelectorAll(".category-box");
  // for (let i = 0; i < boxesTodo.length; i++) {
  //   boxesTodo[i].onclick = console.log();
  // }
  // for (let i = 0; i < boxesTodo.length; i++) {
  //   boxesTodo[i].querySelector(".makeList").innerHTML = "&#10060;";
  // }
  // for (let i = 0; i < boxesTodo.length; i++) {
  //   boxesTodo[i]
  //     .querySelector(".makeList")
  //     .addEventListener("mouseover", makeTodoBigger, { once: true });
  // }
} // export function makeTodoSmaller(boxNumber) {
//   tmpTodoList = JSON.parse(JSON.stringify(todoList));
//   while (0 < todoList.length) {
//     todoList.pop();
//   }
//   for (let key of tmpTodoList) {
//     if (
//       key.todoCat === document.querySelector(`.boxTodo${boxNumber}`).innerText
//     ) {
//       todoList.push(key);
//     }
//   }
//   createToDo(todoList);
//   createMassiveBox();
//   let boxesTodo = document
//     .querySelector(".category-boxes-todo")
//     .querySelectorAll(".category-box");
//   for (let i = 0; i < boxesTodo.length; i++) {
//     boxesTodo[i].onclick = console.log();
//   }
//   for (let i = 0; i < boxesTodo.length; i++) {
//     boxesTodo[i].querySelector(".makeList").innerHTML = "&#10060;";
//   }
//   for (let i = 0; i < boxesTodo.length; i++) {
//     boxesTodo[i]
//       .querySelector(".makeList")
//       .addEventListener("mouseover", makeTodoBigger, { once: true });
//   }
// }
// export function makeTodoBigger(event) {
//   event.currentTarget.onmousedown = function() {
//     while (0 < todoList.length) {
//       // если добавят в todoList
//       todoList.pop();
//     }
//     todoList.push(...tmpTodoList);
//     createToDo(todoList);
//     createMassiveBox();
//     let boxesTodo = document
//       .querySelector(".category-boxes-todo")
//       .querySelectorAll(".category-box");
//     for (let i = 0; i < boxesTodo.length; i++) {
//       boxesTodo[i]
//         .querySelector(".makeList")
//         .removeEventListener("mouseover", makeTodoBigger, { once: true });
//     }
//     tmpTodoList = [];
//   };
// }
//всё должно меняться с todoList
},{"../scriptTodo.js":"scriptTodo.js","./create-boxes-under-todolist.js":"to-do/create-boxes-under-todolist.js"}],"to-do/choseList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.choseList = choseList;

var _makeTodoByGroup = require("./make-todo-by-group");

var _scriptTodo = require("../scriptTodo");

function choseList() {
  if (_makeTodoByGroup.tmpTodoList[0]) {
    return _makeTodoByGroup.tmpTodoList;
  } else {
    return _scriptTodo.todoList;
  }
}
},{"./make-todo-by-group":"to-do/make-todo-by-group.js","../scriptTodo":"scriptTodo.js"}],"to-do/drag-and-drop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;
exports.divElem = void 0;

var _scriptTodo = require("../scriptTodo.js");

var _choseList = require("./choseList.js");

var divElem = document.querySelectorAll(".todo-case-bl");
exports.divElem = divElem;

document.onselectstart = function () {
  return false;
};

var todoRightButton = document.querySelectorAll(".todo-right-button");

function handler() {
  //if ( event.target !== document.querySelector(`.button-number`)){
  //    console.log("ytttttt");
  //} else if(event.target === document.querySelector(`.button-number`)){
  //    event.target.onmousedown = function() {todoTaskRepeat(rowNumber); console.log("working");};
  //} else {};
  //document.querySelector(`.repeat-button-${key}`).addEventListener("click", function() {todoTaskRepeat(key)});
  event.currentTarget.onmousedown = function (event) {
    exports.divElem = divElem = document.querySelectorAll(".todo-case-bl");

    for (var i = 0; i < divElem.length; i++) {
      divElem[i].removeEventListener("mouseover", handler);
    }

    var cloneDiv = event.currentTarget.cloneNode(true);
    var elementsStyle = getComputedStyle(event.currentTarget);
    cloneDiv.style.position = "absolute";
    cloneDiv.style.opacity = 0.5;
    cloneDiv.style.zIndex = 100;
    cloneDiv.style.top = event.currentTarget.offsetTop + "px";
    cloneDiv.style.left = event.currentTarget.offsetLeft + "px";
    cloneDiv.style.width = elementsStyle.width;
    cloneDiv.style.height = elementsStyle.height;
    var newDiv = document.querySelector(".todo-item-list").appendChild(cloneDiv); //поменять

    document.body.append(newDiv);
    var newTodoList = (0, _choseList.choseList)()[cloneDiv.id];

    cloneDiv.ondragstart = function () {
      return false;
    }; //не показывает


    for (var _i = 0; _i < divElem.length; _i++) {
      divElem[_i].addEventListener("mouseover", change);
    }

    function change() {
      (0, _choseList.choseList)().splice(cloneDiv.getAttribute("id"), 1);
      cloneDiv.setAttribute("id", this.id); // id добавить

      (0, _choseList.choseList)().splice(this.id, 0, newTodoList);

      function makeNewList() {
        //убрать линию
        for (var _i2 = 0; _i2 < divElem.length; _i2++) {
          divElem[_i2].setAttribute("id", _i2);
        }

        for (var _i3 = 0; _i3 < divElem.length; _i3++) {
          divElem[_i3].querySelector(".todo-case-category").querySelector(".todo-case-text").innerHTML = (0, _choseList.choseList)()[_i3].todoCat;
          divElem[_i3].querySelector(".todo-case-description").querySelector(".todo-case-text").innerHTML = (0, _choseList.choseList)()[_i3].todoDesc;

          var ars1 = divElem[_i3].querySelector(".todo-case-tail");

          ars1.querySelector(".number-icon").innerHTML = (0, _choseList.choseList)()[_i3].quantity;
        }
      }

      makeNewList();
    }

    document.onmouseup = function () {
      document.onmousemove = function () {};

      for (var _i4 = 0; _i4 < divElem.length; _i4++) {
        divElem[_i4].removeEventListener("mouseover", change);
      }

      for (var _i5 = 0; _i5 < divElem.length; _i5++) {
        divElem[_i5].addEventListener("mouseover", handler);
      }

      cloneDiv.style.pointerEvents = "auto";
      newDiv.remove();
    };

    document.onmousemove = function (newEvent) {
      var posLeft = newEvent.pageX - newDiv.offsetLeft;
      var posTop = newEvent.pageY - newDiv.offsetTop;

      document.onmousemove = function (newEvent) {
        newDiv.style.top = newEvent.pageY - posTop + "px";
        newDiv.style.left = newEvent.pageX - posLeft + "px";
        cloneDiv.style.pointerEvents = "none";
      };
    };
  };
}
},{"../scriptTodo.js":"scriptTodo.js","./choseList.js":"to-do/choseList.js"}],"to-do/task-repeate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatTask = repeatTask;
exports.plusButtonClick = plusButtonClick;
exports.enterKeyClick = enterKeyClick;

var _scriptTodo = require("../scriptTodo.js");

var _createBoxesUnderTodolist = require("./create-boxes-under-todolist.js");

var _choseList = require("./choseList.js");

function repeatTask(list, key) {
  var categoryTodo = list[key].todoCat;
  var descriptionTodo = list[key].todoDesc;
  checkTodo(categoryTodo, descriptionTodo);
  (0, _scriptTodo.createToDo)(_scriptTodo.todoList);
  (0, _createBoxesUnderTodolist.createMassiveBox)();
} //повтор задания при клике
//export function todoTaskRepeat(key) {
//    let categoryTodo = todoList[key].todoCat;
//    let descriptionTodo = todoList[key].todoDesc;
//
//    checkTodo(categoryTodo, descriptionTodo);
//    createToDo(todoList);
//    createMassiveBox();
//}
//повтор задания при клике на плюс


function plusButtonClick() {
  var categoryTodo = document.querySelector(".todo-category-value").value;
  var descriptionTodo = document.querySelector(".todo-description-value").value;
  checkTodo(categoryTodo, descriptionTodo, (0, _choseList.choseList)());
  (0, _scriptTodo.createToDo)((0, _choseList.choseList)());
  (0, _createBoxesUnderTodolist.createMassiveBox)(); // может убрать

  clearTodoDescription();
}

function clearTodoDescription() {
  document.querySelector(".todo-description-value").value = "";
} // тут пока не стал ничего менять


function checkTodo(categoryTodo, descriptionTodo, todoList) {
  if (checkTodoCondition(categoryTodo, descriptionTodo)) {
    var newTodoItem = {};
    newTodoItem.todoCat = categoryTodo;
    newTodoItem.todoDesc = descriptionTodo;
    newTodoItem.quantity = 1;
    var i = todoList.length;
    (0, _choseList.choseList)()[i] = newTodoItem;
  } else {
    (0, _choseList.choseList)().forEach(function (item, index, array) {
      if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
        item.quantity += 1;
      }
    });
  }
}

function checkTodoCondition(categoryTodo, descriptionTodo) {
  console.log("работает");
  return _scriptTodo.todoList.find(function (item, index, array) {
    return item.todoCat == categoryTodo && item.todoDesc == descriptionTodo;
  }) == undefined;
}

function enterKeyClick() {
  if (event.key == "Enter") {
    plusButtonClick();
  }
}
},{"../scriptTodo.js":"scriptTodo.js","./create-boxes-under-todolist.js":"to-do/create-boxes-under-todolist.js","./choseList.js":"to-do/choseList.js"}],"to-do/make-short-long-rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restSettings = restSettings;
exports.setLongRestLine = setLongRestLine;
exports.setRestLine = setRestLine;
exports.restDuration = exports.longRestDuration = exports.shortRestDuration = exports.longRest = void 0;

var _scriptTodo = require("../scriptTodo");

var longRest = 4;
exports.longRest = longRest;
var shortRestDuration = 0.1 * 60 * 1000;
exports.shortRestDuration = shortRestDuration;
var longRestDuration = 0.2 * 60 * 1000;
exports.longRestDuration = longRestDuration;
var restDuration = shortRestDuration;
exports.restDuration = restDuration;

function restSettings() {
  if (longRest <= 1) {
    exports.restDuration = restDuration = longRestDuration;
    exports.longRest = longRest = 4;
  } else {
    exports.longRest = longRest = longRest - 1;
  }
}

function setLongRestLine(todoList) {
  if (todoList[0] && todoList[0].quantity >= longRest) {
    setRestLine(longRest, 1);
  } else if (todoList[0] && todoList[1] && todoList[0].quantity + todoList[1].quantity >= longRest) {
    setRestLine(longRest, 2);
  } else if (todoList[0] && todoList[1] && todoList[2] && todoList[0].quantity + todoList[1].quantity + todoList[2].quantity >= longRest) {
    setRestLine(longRest, 3);
  } else if (todoList[0] && todoList[1] && todoList[2] && todoList[3] && todoList[0].quantity + todoList[1].quantity + todoList[2].quantity + todoList[3].quantity >= longRest) {
    setRestLine(longRest, 4);
  } else if (!todoList[0] || !todoList[1] || !todoList[2] || !todoList[3]) {}
}

function setRestLine(number, position) {
  var restLine = '<h7 class="todo-border-header todo-border-header-rest"> <a>Длинный перерыв -</a> <span> - Осталось ';
  restLine += number;
  restLine += " </span> </h7>";
  document.querySelector(".todo-item-list .todo-case-body:nth-child(" + position + ")").insertAdjacentHTML("afterEnd", restLine);
}
},{"../scriptTodo":"scriptTodo.js"}],"to-do/create-boxes-under-doneList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDoneMassiveBox = createDoneMassiveBox;

var _scriptTodo = require("../scriptTodo.js");

//создать боксы done
function createDoneMassiveBox() {
  var grouppedDoneTodo = _scriptTodo.doneTodoList.reduce(function (acc, cur) {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat
    };
    return acc;
  }, {});

  createToDoDoneBox(grouppedDoneTodo);
}

function createToDoDoneBox(grouppedDoneTodo) {
  var createdBox = "";

  for (var key in grouppedDoneTodo) {
    createdBox += '<button class="category-box">';
    createdBox += "#";
    createdBox += grouppedDoneTodo[key].todoCat;
    createdBox += "</button>";
  }

  document.querySelector(".category-boxes-done-todo").innerHTML = createdBox;
}
},{"../scriptTodo.js":"scriptTodo.js"}],"scriptTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToDo = createToDo;
exports.lastItemDone = lastItemDone;
exports.deleteItemFromTodoList = deleteItemFromTodoList;
exports.createDoneItems = createDoneItems;
exports.deletTodoTasks = deletTodoTasks;
exports.deletDoneTodoTasks = deletDoneTodoTasks;
exports.doneTodoList = exports.todoList = void 0;

var _dragAndDrop = require("./to-do/drag-and-drop.js");

var _makeTodoByGroup = require("./to-do/make-todo-by-group.js");

var _taskRepeate = require("./to-do/task-repeate.js");

var _createBoxesUnderTodolist = require("./to-do/create-boxes-under-todolist.js");

var _makeShortLongRest = require("./to-do/make-short-long-rest.js");

var _createBoxesUnderDoneList = require("./to-do/create-boxes-under-doneList.js");

var _main = require("./main.js");

var _choseList = require("./to-do/choseList.js");

var todoList = [];
exports.todoList = todoList;
document.querySelector(".todo-input-button").addEventListener("click", _taskRepeate.plusButtonClick); //addEventPlusButtonClick();

document.querySelector(".todo-description-value").addEventListener("keypress", _taskRepeate.enterKeyClick); //addEventEnterKeyClick();
//происходит создание строки ToDo

function createToDo(todoList) {
  //let createdLists = "";
  var createdLists = document.querySelector(".todo-item-list");
  createdLists.innerHTML = "";

  var _loop = function _loop(key) {
    if (document.querySelector(".repeat-button-".concat(key))) {
      document.querySelector(".repeat-button-".concat(key)).removeEventListener("click", function () {
        (0, _taskRepeate.repeatTask)(todoList, key);
      });
    } //removeEventTodoTaskRepeat();
    //let createdLists = document.querySelector(".todo-item-list");


    function element(el) {
      return document.createElement(el);
    }

    var firstDiv = createdLists.appendChild(element("div"));
    firstDiv.className = "todo-body todo-case-body todo-case-bl";
    firstDiv.id = key;
    var innerFirstDiv = firstDiv.appendChild(element("div"));
    innerFirstDiv.className = "todo-case-category";
    var innerFirstDivInput = innerFirstDiv.appendChild(element("input"));
    innerFirstDivInput.className = "todo-input";
    innerFirstDivInput.setAttribute("style", "display:none");
    var innerFirstDivDiv = innerFirstDiv.appendChild(element("div"));
    innerFirstDivDiv.className = "todo-case-text";
    innerFirstDivDiv.innerHTML = todoList[key].todoCat;
    var innerSecondDiv = firstDiv.appendChild(element("div"));
    innerSecondDiv.className = "todo-case-description";
    var innerSecondDivDiv = innerSecondDiv.appendChild(element("div"));
    innerSecondDivDiv.className = "todo-case-text";
    innerSecondDivDiv.innerHTML = todoList[key].todoDesc;
    var innerThirdDiv = firstDiv.appendChild(element("div"));
    innerThirdDiv.className = "todo-case-tail";
    var innerThirdDivSpan = innerThirdDiv.appendChild(element("span"));
    innerThirdDivSpan.className = "todo-time";
    var time = 25 * 60 * 1000 * todoList[key].quantity;
    var min = Math.floor(time / 1000 / 60 % 60);
    var hr = Math.floor(time / 1000 / 60 / 60 % 60);
    innerThirdDivSpan.innerHTML = hr + ":" + min;
    var innerThirdDivFirstButton = innerThirdDiv.appendChild(element("button"));
    innerThirdDivFirstButton.className = "todo-button todo-right-button button-number repeat-button-".concat(key);
    var innerThirdDivFirstButtonIcon = innerThirdDivFirstButton.appendChild(element("icon"));
    innerThirdDivFirstButtonIcon.className = "number-icon";
    innerThirdDivFirstButtonIcon.innerHTML = todoList[key].quantity;
    var innerThirdDivSecondButton = firstDiv.appendChild(element("button"));
    innerThirdDivSecondButton.className = "todo-button todo-right-button";
    var innerThirdDivSecondButtonIcon = innerThirdDivSecondButton.appendChild(element("icon"));
    innerThirdDivSecondButtonIcon.className = "three-points-icon";
    innerThirdDivSecondButtonIcon.innerHTML = "&#183;&#183;&#183"; // createdLists += '<div class="todo-body todo-case-body todo-case-bl"  id="';
    // createdLists += key;
    // createdLists +=
    //  '"> <div class="todo-case-category"> <input class="todo-input" style="display: none;"> <div class="todo-case-text"> ';
    // createdLists += todoList[key].todoCat;
    // createdLists +=
    //  '</div> </div> <div class="todo-case-description"> <div class="todo-case-text">';
    // createdLists += todoList[key].todoDesc;
    // createdLists +=
    //  '</div> </div> <div class="todo-case-tail"> <span class="todo-time"> 59:84 </span><button class="todo-button todo-right-button button-number repeat-button-';
    // createdLists += key;
    // createdLists += '")> <icon class="number-icon">';
    // createdLists += todoList[key].quantity;
    // createdLists +=
    //  '</inon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div>';
  };

  for (var key in todoList) {
    _loop(key);
  } // document.querySelector(".todo-item-list").innerHTML = createdLists;


  if (_makeShortLongRest.longRest == undefined) {
    _makeShortLongRest.longRest = (4, function () {
      throw new Error('"' + "longRest" + '" is read-only.');
    }());
  }

  var _loop2 = function _loop2(_key) {
    //перенес в make-toto-smaller
    document.querySelector(".repeat-button-".concat(_key)).addEventListener("mousedown", function () {
      (0, _taskRepeate.repeatTask)(todoList, _key);
    });
  };

  for (var _key in todoList) {
    _loop2(_key);
  } //    addEventTodoTaskRepeat(todoList);


  var divElem = document.querySelectorAll(".todo-case-bl"); // добавил для dragAndDropp - ДОБАВИТЬ

  for (var i = 0; i < divElem.length; i++) {
    divElem[i].addEventListener("mouseover", function () {
      (0, _dragAndDrop.handler)();
    });
  } //    addEventHandler();


  (0, _makeShortLongRest.setLongRestLine)(todoList);
} // перенос строки в сделанное


var doneTodoList = [];
exports.doneTodoList = doneTodoList;

function lastItemDone(todoList) {
  var date = new Date();
  var minute = ("0" + date.getHours()).slice(-2);
  var second = ("0" + date.getMinutes()).slice(-2); //убирает текущее задание

  if (todoList.length == 0) {} else if (todoList[0].quantity == 1) {
    console.log(todoList[0].quantity);
    doneTodoList.unshift(todoList.shift());
    doneTodoList[0].date = minute + ":" + second + "";
  } else {
    doneTodoList.unshift(todoList[0]);
    todoList[0].quantity = todoList[0].quantity - 1;
    doneTodoList[0].date = minute + ":" + second + "";
  }

  (0, _makeShortLongRest.restSettings)();
  createToDo(todoList);
  (0, _createBoxesUnderTodolist.createMassiveBox)();
  createDoneItems();
  (0, _createBoxesUnderDoneList.createDoneMassiveBox)();
}

function deleteItemFromTodoList() {
  if ((0, _choseList.choseList)() == _makeTodoByGroup.tmpTodoList && todoList.length !== 0) {
    todoList.forEach(function (item, i, arr) {
      if (arr[i].todoCat == _makeTodoByGroup.tmpTodoList[0].todoCat && arr[i].todoDesc == _makeTodoByGroup.tmpTodoList[0].todoDesc) {
        if (arr[i].quantity == 1) {
          arr.splice(i, 1);
        } else {//arr[i].quantity = arr[i].quantity - 1;
        }
      }
    });
  }
} // сделанные задания


function createDoneItems() {
  // let createdLists = "";
  var createdList = document.querySelector(".todo-case-category-done");
  createdList.innerHTML = "";

  var _loop3 = function _loop3(key) {
    if (document.querySelector(".todo-done-button-".concat(key))) {
      document.querySelector(".todo-done-button-".concat(key)).removeEventListener("click", function () {
        (0, _taskRepeate.repeatTask)(doneTodoList, key);
      });
    } //removeEventTodoTaskRepeat();


    function element(el) {
      return document.createElement(el);
    }

    var parentDiv = createdList.appendChild(element("div"));
    parentDiv.className = "todo-body todo-case-body";
    var firstChildDiv = parentDiv.appendChild(element("div"));
    firstChildDiv.className = "todo-case-category";
    var firstChildDivDiv = firstChildDiv.appendChild(element("div"));
    firstChildDivDiv.className = "todo-case-category-text";
    firstChildDivDiv.innerHTML = doneTodoList[key].todoCat;
    var secondChildDiv = parentDiv.appendChild(element("div"));
    secondChildDiv.className = "todo-case-description";
    var secondChildDivDiv = secondChildDiv.appendChild(element("div"));
    secondChildDivDiv.className = "todo-case-description-text";
    secondChildDivDiv.innerText = doneTodoList[key].todoDesc;
    var thirdChildDiv = parentDiv.appendChild(element("div"));
    thirdChildDiv.className = "todo-case-tail";
    var thirdChildDivSpan = thirdChildDiv.appendChild(element("span"));
    thirdChildDivSpan.className = "todo-time";
    thirdChildDivSpan.innerHTML = doneTodoList[key].date;
    var thirdChildDivFirstButton = thirdChildDiv.appendChild(element("button"));
    thirdChildDivFirstButton.className = "todo-button todo-right-button todo-done-button-".concat(key);
    var thirdChildDivFirstButtonSpan = thirdChildDivFirstButton.appendChild(element("icon"));
    thirdChildDivFirstButtonSpan.className = "return-icon";
    thirdChildDivFirstButtonSpan.innerHTML = "&#x21bb;";
    var thirdChildDivSecondButton = thirdChildDiv.appendChild(element("button"));
    thirdChildDivSecondButton.className = "todo-button todo-right-button";
    var thirdChildDivSecondButtonSpan = thirdChildDivSecondButton.appendChild(element("icon"));
    thirdChildDivSecondButtonSpan.className = "three-points-icon";
    thirdChildDivSecondButtonSpan.innerHTML = "&#183;&#183;&#183;"; // createdLists +=
    //   '<div class="todo-body todo-case-body"> <div class="todo-case-category"> <div class="todo-case-category-text">';
    // createdLists += doneTodoList[key].todoCat;
    // createdLists +=
    //   '</div> </div> <div class="todo-case-description"> <div class="todo-case-description-text">';
    // createdLists += doneTodoList[key].todoDesc;
    // createdLists +=
    //   '</div> </div> <div class="todo-case-tail"> <span class="todo-time">';
    // createdLists += doneTodoList[key].date;
    // createdLists +=
    //   '</span> <button class="todo-button todo-right-button todo-done-button-';
    // createdLists += key;
    // createdLists +=
    //   '"> <icon class="return-icon"> &#x21bb; </icon> </button> <button class="todo-button todo-right-button"> <icon class="three-points-icon"> &#183;&#183;&#183; </icon> </button> </div> </div> ';
  };

  for (var key in doneTodoList) {
    _loop3(key);
  } // document.querySelector(".todo-case-category-done").innerHTML = createdLists;


  var _loop4 = function _loop4(_key2) {
    document.querySelector(".todo-done-button-".concat(_key2)).addEventListener("click", function () {
      (0, _taskRepeate.repeatTask)(doneTodoList, _key2);
    });
  };

  for (var _key2 in doneTodoList) {
    _loop4(_key2);
  } //    addEventRepeatTask();
  //подсчет количества сделанных заданий


  var doneListLength = doneTodoList.length;
  document.querySelector(".done-todo-quantiti").innerText = doneListLength;
} //удалить задания


function deletTodoTasks() {
  exports.todoList = todoList = [];
  createToDo(todoList);
  (0, _createBoxesUnderTodolist.createMassiveBox)();
}

document.querySelector(".category-box-delete-border").addEventListener("click", deletTodoTasks); //addEventRepeatTask();
// удалить сделанные задания

function deletDoneTodoTasks() {
  exports.doneTodoList = doneTodoList = [];
  createDoneItems();
  (0, _createBoxesUnderDoneList.createDoneMassiveBox)();
}

document.querySelector(".category-box-delete-done").addEventListener("click", deletDoneTodoTasks); //повтор задания в пустой todoList
//поправить работу со tmpTodo
// убрать, добавить комменты
},{"./to-do/drag-and-drop.js":"to-do/drag-and-drop.js","./to-do/make-todo-by-group.js":"to-do/make-todo-by-group.js","./to-do/task-repeate.js":"to-do/task-repeate.js","./to-do/create-boxes-under-todolist.js":"to-do/create-boxes-under-todolist.js","./to-do/make-short-long-rest.js":"to-do/make-short-long-rest.js","./to-do/create-boxes-under-doneList.js":"to-do/create-boxes-under-doneList.js","./main.js":"main.js","./to-do/choseList.js":"to-do/choseList.js"}],"scriptTop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiatePomidorro = initiatePomidorro;
exports.checkState = checkState;
exports.leftButtonClick = leftButtonClick;
exports.rightButtonClick = rightButtonClick;
exports.setCountborderViewFirstInwork = setCountborderViewFirstInwork;
exports.setCountborderViewPausework = setCountborderViewPausework;
exports.setCountborderViewInworkAfterPause = setCountborderViewInworkAfterPause;
exports.setCountborderViewWorkNotStarted = setCountborderViewWorkNotStarted;
exports.setCountdorderViewInRest2 = setCountdorderViewInRest2;
exports.setCountborderViewInRest = setCountborderViewInRest;
exports.setCounborderViewRestInPause = setCounborderViewRestInPause;
exports.showTodoDescription = showTodoDescription;
exports.pomidorroInterval = exports.remainingTime = exports.pomidorroDuration = exports.state = void 0;

var _scriptTodo = require("./scriptTodo.js");

var _makeTodoByGroup = require("./to-do/make-todo-by-group.js");

var _choseList = require("./to-do/choseList.js");

var state; // состояние режима работы - рабочее либо отдых

exports.state = state;
var pomidorroDuration = 25 * 60 * 1000; // новый модуль

exports.pomidorroDuration = pomidorroDuration;
var newWorkTime; // переменная для работы с launchPomidorro()

var remainingTime; // оставшееся время для того чтобы можно было ставить на паузу

exports.remainingTime = remainingTime;
var pomidorroInterval; //переменная для setInterval

exports.pomidorroInterval = pomidorroInterval;

function getTime(workTime) {
  var time = Date.parse(workTime) - Date.parse(new Date());
  var sec = Math.floor(time / 1000 % 60);
  var min = Math.floor(time / 1000 / 60 % 60);
  return {
    time: time,
    sec: sec,
    min: min
  };
}

function showTime(timeValue) {
  var minute = ("0" + timeValue.min).slice(-2);
  var second = ("0" + timeValue.sec).slice(-2);
  document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = minute + ":" + second + "";
  showTodoDescription((0, _choseList.choseList)());
}

function checkTime(timeValue) {
  if (timeValue.time <= 0) {
    clearInterval(pomidorroInterval);
    checkState();
  }
}

function initiatePomidorro(workTime) {
  newWorkTime = workTime; //перезапись переменной для работы с launchPomidorro()

  launchPomidorro();
  exports.pomidorroInterval = pomidorroInterval = setInterval(launchPomidorro, 1000);
}

function launchPomidorro() {
  var timeValue = getTime(newWorkTime);
  showTime(timeValue); //отображаем время

  checkTime(timeValue); //проверят не закончилось ли время

  exports.remainingTime = remainingTime = timeValue.time; //запись в переменную оставшегося времени
} // этот модуль


setCountborderViewWorkNotStarted(); //отображение времени
// действие при истечении времени таймера:

function checkState() {
  if (state == "startWork") {
    setCountdorderViewInRest2();
  } else {
    setCountborderViewWorkNotStarted();
  }
}

function leftButtonClick() {
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

document.querySelector(".left-button").addEventListener("click", leftButtonClick);

function rightButtonClick() {
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
  } else {}
}

document.querySelector(".right-button").addEventListener("click", rightButtonClick);

function setCountborderViewFirstInwork() {
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("ПАУЗА");
  setIdValueRightButton("buttonRightRed");
  setRightButtonValue("СТОП");
  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");
  initiatePomidorro(new Date(Date.parse(new Date()) + pomidorroDuration));
  exports.state = state = "startWork";
}

function setCountborderViewPausework() {
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("ПРОДОЛЖИТЬ");
  setIdValueRightButton("buttonRightRed");
  setRightButtonValue("СДЕЛАНО");
  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");
  clearInterval(pomidorroInterval);
  exports.state = state = "pauseWork";
}

function setCountborderViewInworkAfterPause() {
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("ПАУЗА");
  setIdValueRightButton("buttonRightRed");
  setRightButtonValue("СТОП");
  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");
  clearInterval(pomidorroInterval);
  initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
  exports.state = state = "resumeWork";
}

function setCountborderViewWorkNotStarted() {
  document.querySelector(".count-border-main").querySelector(".timer-clock").innerHTML = "00:00";
  setIdValueLeftButton("buttonLeftRed");
  setLeftButtonValue("СТАРТ");
  setIdValueRightButton("buttonRightStop");
  setRightButtonValue("СТОП");
  setBackgroundColor("#d03540");
  setTitleValue("ПОМИДОР");
  clearInterval(pomidorroInterval);
  exports.state = state = "stopWork";
}

function setCountdorderViewInRest2() {
  setIdValueLeftButton("buttonLeftGreen");
  setLeftButtonValue("ПАУЗА");
  setIdValueRightButton("buttonRightGreen");
  setRightButtonValue("ПРОПУСТИТЬ");
  setBackgroundColor("rgb(86, 189, 86)");
  setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
  initiatePomidorro(new Date(Date.parse(new Date()) + 5 * 60 * 1000));
  exports.state = state = "restRest";
  (0, _scriptTodo.deleteItemFromTodoList)();
  (0, _scriptTodo.lastItemDone)((0, _choseList.choseList)());
}

function setCountborderViewInRest() {
  setIdValueLeftButton("buttonLeftGreen");
  setLeftButtonValue("ПРОДОЛЖИТЬ");
  setIdValueRightButton("buttonRightGreen");
  setRightButtonValue("ПРОПУСТИТЬ");
  setBackgroundColor("rgb(86, 189, 86)");
  setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
  clearInterval(pomidorroInterval);
  exports.state = state = "pauseRest";
}

function setCounborderViewRestInPause() {
  setIdValueLeftButton("buttonLeftGreen");
  setLeftButtonValue("ПАУЗА");
  setIdValueRightButton("buttonRightGreen");
  setRightButtonValue("ПРОПУСТИТЬ");
  setBackgroundColor("rgb(86, 189, 86)");
  setTitleValue("СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ");
  clearInterval(pomidorroInterval);
  initiatePomidorro(new Date(Date.parse(new Date()) + remainingTime));
  exports.state = state = "resumeRest";
} // цвет фонa


function setBackgroundColor(color) {
  document.querySelector(".count-border-main").style.backgroundColor = color;
} // надпись на правой кнопке


function setRightButtonValue(buttonValue) {
  document.querySelector(".right-button").innerHTML = buttonValue;
} //надпись на левой кнопке


function setLeftButtonValue(buttonValue) {
  document.querySelector(".left-button").innerHTML = buttonValue;
} //надпись на верхней части блока помидорро


function setTitleValue(value) {
  document.querySelector(".title").innerHTML = value;
} //задаем значение id для правой кнопки


function setIdValueRightButton(value) {
  document.querySelector(".right-button").setAttribute("id", value);
} //задаем значение id для левой кнопки


function setIdValueLeftButton(value) {
  document.querySelector(".left-button").setAttribute("id", value);
}

function showTodoDescription(todoList) {
  if (todoList[0] == undefined) {
    document.querySelector(".processing-todo-task").innerHTML = "";
  } else if (state == "startWork" || state == "pauseWork" || state == "resumeWork" || state == "stopWork") {
    document.querySelector(".processing-todo-task").innerHTML = todoList[0].todoDesc;
  } else if (state == "restRest" || state == "pauseRest" || state == "resumeRest") {
    document.querySelector(".processing-todo-task").innerHTML = "";
  }
}
},{"./scriptTodo.js":"scriptTodo.js","./to-do/make-todo-by-group.js":"to-do/make-todo-by-group.js","./to-do/choseList.js":"to-do/choseList.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./scriptTop.js");

require("./scriptTodo.js");
},{"./scriptTop.js":"scriptTop.js","./scriptTodo.js":"scriptTodo.js"}],"../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52442" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map