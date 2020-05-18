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
})({"to-do/drag-and-drop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.divElem = void 0;

var _todoBorder = require("../todo-border.js");

var divElem = document.querySelectorAll(".todo-case-bl");
exports.divElem = divElem;

document.onselectstart = function () {
  return false;
};

var todoRightButton = document.querySelectorAll(".todo-right-button");

function handler() {
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
    var newDiv = document.querySelector(".todo-item-list").appendChild(cloneDiv);
    document.body.append(newDiv);
    var newTodoList = _todoBorder.todoList[cloneDiv.id];

    cloneDiv.ondragstart = function () {
      return false;
    };

    for (var _i = 0; _i < divElem.length; _i++) {
      divElem[_i].addEventListener("mouseover", change);
    }

    function change() {
      _todoBorder.todoList.splice(cloneDiv.getAttribute("id"), 1);

      cloneDiv.setAttribute("id", this.id);

      _todoBorder.todoList.splice(this.id, 0, newTodoList);

      function makeNewList() {
        for (var _i2 = 0; _i2 < divElem.length; _i2++) {
          divElem[_i2].setAttribute("id", _i2);
        }

        for (var _i3 = 0; _i3 < divElem.length; _i3++) {
          divElem[_i3].querySelector(".todo-case-category").querySelector(".todo-case-text").innerHTML = _todoBorder.todoList[_i3].todoCat;
          divElem[_i3].querySelector(".todo-case-description").querySelector(".todo-case-text").innerHTML = _todoBorder.todoList[_i3].todoDesc;

          var ars1 = divElem[_i3].querySelector(".todo-case-tail");

          ars1.querySelector(".number-icon").innerHTML = _todoBorder.todoList[_i3].quantity;
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

var _default = handler;
exports.default = _default;
},{"../todo-border.js":"todo-border.js"}],"to-do/boxes-under-todolist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMassiveBox = createMassiveBox;
exports.createToDoBox = createToDoBox;

var _todoBorder = require("../todo-border.js");

function createMassiveBox() {
  var grouppedTodo = _todoBorder.todoList.reduce(function (acc, cur) {
    acc[cur.todoCat] = acc[cur.todoCat] || {
      todoCat: cur.todoCat,
      quantity: cur.quantity
    };
    return acc;
  }, {});

  createToDoBox(grouppedTodo);
}

function createToDoBox(grouppedTodo) {
  var indexNumber = 0;
  var createdBox = document.querySelector(".category-boxes-todo");
  createdBox.innerHTML = "";

  for (var key in grouppedTodo) {
    var firstChildButton = createdBox.appendChild(document.createElement("button"));
    firstChildButton.className = "category-box";
    var firstChildButtonDiv = firstChildButton.appendChild(document.createElement("div"));
    firstChildButtonDiv.className = "makeList";
    firstChildButtonDiv.innerHTML = "&#35;";
    var firstChildButtonFirstA = firstChildButton.appendChild(document.createElement("a"));
    firstChildButtonFirstA.className = "boxTodoA boxTodo".concat(indexNumber++);
    firstChildButtonFirstA.innerHTML = grouppedTodo[key].todoCat;
  }
}
},{"../todo-border.js":"todo-border.js"}],"to-do/task-repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatTask = repeatTask;
exports.plusButtonClick = plusButtonClick;
exports.enterKeyClick = enterKeyClick;

var _todoBorder = require("../todo-border.js");

var _boxesUnderTodolist = require("./boxes-under-todolist.js");

function repeatTask(list, key) {
  var categoryTodo = list[key].todoCat;
  var descriptionTodo = list[key].todoDesc;
  checkTodo(categoryTodo, descriptionTodo, _todoBorder.todoList);
  (0, _todoBorder.createToDo)(_todoBorder.todoList);
  (0, _boxesUnderTodolist.createMassiveBox)();
}

function plusButtonClick() {
  var categoryTodo = document.querySelector(".todo-category-value").value;
  var descriptionTodo = document.querySelector(".todo-description-value").value;
  checkTodo(categoryTodo, descriptionTodo, _todoBorder.todoList);
  (0, _todoBorder.createToDo)(_todoBorder.todoList);
  (0, _boxesUnderTodolist.createMassiveBox)();
  clearTodoDescription();
}

function clearTodoDescription() {
  document.querySelector(".todo-description-value").value = "";
}

function checkTodo(categoryTodo, descriptionTodo, todoList) {
  if (checkTodoCondition(categoryTodo, descriptionTodo)) {
    var newTodoItem = {};
    newTodoItem.todoCat = categoryTodo;
    newTodoItem.todoDesc = descriptionTodo;
    newTodoItem.quantity = 1;
    var i = todoList.length;
    todoList[i] = newTodoItem;
  } else {
    todoList.forEach(function (item, index, array) {
      if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
        item.quantity += 1;
      }
    });
  }
}

function checkTodoCondition(categoryTodo, descriptionTodo) {
  return _todoBorder.todoList.find(function (item, index, array) {
    return item.todoCat == categoryTodo && item.todoDesc == descriptionTodo;
  }) == undefined;
}

function enterKeyClick() {
  if (event.key == "Enter") {
    plusButtonClick();
  }
}
},{"../todo-border.js":"todo-border.js","./boxes-under-todolist.js":"to-do/boxes-under-todolist.js"}],"to-do/task-delete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minusButtonClick = minusButtonClick;

var _todoBorder = require("../todo-border.js");

var _boxesUnderTodolist = require("./boxes-under-todolist.js");

function minusButtonClick(id) {
  var categoryTodo = document.getElementById(id).querySelector(".todo-case-text-category").innerHTML;
  var descriptionTodo = document.getElementById(id).querySelector(".todo-case-text-description").innerHTML;
  checkTodo(categoryTodo, descriptionTodo, id);
  (0, _todoBorder.createToDo)(_todoBorder.todoList);
  (0, _boxesUnderTodolist.createMassiveBox)();
}

function checkTodo(categoryTodo, descriptionTodo, id) {
  _todoBorder.todoList.forEach(function (item, index, array) {
    if (item.todoCat == categoryTodo && item.todoDesc == descriptionTodo) {
      if (item.quantity == 1) {
        _todoBorder.todoList.splice(id, 1);
      } else {
        item.quantity -= 1;
      }
    }
  });
}
},{"../todo-border.js":"todo-border.js","./boxes-under-todolist.js":"to-do/boxes-under-todolist.js"}],"to-do/short-long-rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restSettings = restSettings;
exports.setLongRestLine = setLongRestLine;
exports.setRestLine = setRestLine;
exports.restDuration = exports.longRestDuration = exports.shortRestDuration = exports.longRest = void 0;

var _todoBorder = require("../todo-border");

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
},{"../todo-border":"todo-border.js"}],"to-do/boxes-under-donelist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDoneMassiveBox = createDoneMassiveBox;

var _todoBorder = require("../todo-border.js");

function createDoneMassiveBox() {
  var grouppedDoneTodo = _todoBorder.doneTodoList.reduce(function (acc, cur) {
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
},{"../todo-border.js":"todo-border.js"}],"to-do/deleting-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTaskButtonClick = deleteTaskButtonClick;

var _todoBorder = require("../todo-border.js");

var _boxesUnderDonelist = require("./boxes-under-donelist.js");

function deleteTaskButtonClick(id) {
  _todoBorder.doneTodoList.splice(id, 1);

  (0, _todoBorder.createDoneItems)();
  (0, _boxesUnderDonelist.createDoneMassiveBox)();
}
},{"../todo-border.js":"todo-border.js","./boxes-under-donelist.js":"to-do/boxes-under-donelist.js"}],"todo-border.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToDo = createToDo;
exports.lastItemDone = lastItemDone;
exports.createDoneItems = createDoneItems;
exports.deletTodoTasks = deletTodoTasks;
exports.deletDoneTodoTasks = deletDoneTodoTasks;
exports.doneTodoList = exports.todoList = void 0;

var _dragAndDrop = require("./to-do/drag-and-drop");

var _taskRepeat = require("./to-do/task-repeat.js");

var _taskDelete = require("./to-do/task-delete.js");

var _boxesUnderTodolist = require("./to-do/boxes-under-todolist.js");

var _shortLongRest = require("./to-do/short-long-rest.js");

var _boxesUnderDonelist = require("./to-do/boxes-under-donelist.js");

var _deletingButton = require("./to-do/deleting-button.js");

var todoList = [];
exports.todoList = todoList;
document.querySelector(".todo-input-button").addEventListener("click", _taskRepeat.plusButtonClick);
document.querySelector(".todo-description-value").addEventListener("keypress", _taskRepeat.enterKeyClick);

function createToDo(todoList) {
  var createdLists = document.querySelector(".todo-item-list");
  createdLists.innerHTML = "";

  var _loop = function _loop(key) {
    if (document.querySelector(".repeat-button-".concat(key))) {
      document.querySelector(".repeat-button-".concat(key)).removeEventListener("click", function () {
        (0, _taskRepeat.repeatTask)(todoList, key);
      });
    }

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
    innerFirstDivDiv.className = "todo-case-text todo-case-text-category";
    innerFirstDivDiv.innerHTML = todoList[key].todoCat;
    var innerSecondDiv = firstDiv.appendChild(element("div"));
    innerSecondDiv.className = "todo-case-description";
    var innerSecondDivDiv = innerSecondDiv.appendChild(element("div"));
    innerSecondDivDiv.className = "todo-case-text todo-case-text-description";
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
    innerThirdDivSecondButton.className = "todo-button todo-right-button minus-button-".concat(key);
    var innerThirdDivSecondButtonIcon = innerThirdDivSecondButton.appendChild(element("icon"));
    innerThirdDivSecondButtonIcon.className = "delete-icon";
    innerThirdDivSecondButtonIcon.innerHTML = "&#8722;";
  };

  for (var key in todoList) {
    _loop(key);
  }

  if (_shortLongRest.longRest == undefined) {
    _shortLongRest.longRest = (4, function () {
      throw new Error('"' + "longRest" + '" is read-only.');
    }());
  }

  var _loop2 = function _loop2(_key) {
    document.querySelector(".repeat-button-".concat(_key)).addEventListener("mousedown", function () {
      (0, _taskRepeat.repeatTask)(todoList, _key);
    });
    document.querySelector(".minus-button-".concat(_key)).addEventListener("mousedown", function () {
      (0, _taskDelete.minusButtonClick)(_key);
    });
  };

  for (var _key in todoList) {
    _loop2(_key);
  }

  var divElem = document.querySelectorAll(".todo-case-bl");

  for (var i = 0; i < divElem.length; i++) {
    divElem[i].addEventListener("mouseover", function () {
      (0, _dragAndDrop.handler)();
    });
  }

  (0, _shortLongRest.setLongRestLine)(todoList);
}

var doneTodoList = [];
exports.doneTodoList = doneTodoList;

function lastItemDone(todoList) {
  var date = new Date();
  var minute = ("0" + date.getHours()).slice(-2);
  var second = ("0" + date.getMinutes()).slice(-2);

  if (todoList.length == 0) {} else if (todoList[0].quantity == 1) {
    doneTodoList.unshift(todoList.shift());
    doneTodoList[0].date = minute + ":" + second + "";
  } else {
    doneTodoList.unshift(todoList[0]);
    todoList[0].quantity = todoList[0].quantity - 1;
    doneTodoList[0].date = minute + ":" + second + "";
  }

  (0, _shortLongRest.restSettings)();
  createToDo(todoList);
  (0, _boxesUnderTodolist.createMassiveBox)();
  createDoneItems();
  (0, _boxesUnderDonelist.createDoneMassiveBox)();
}

function createDoneItems() {
  var createdList = document.querySelector(".todo-case-category-done");
  createdList.innerHTML = "";

  var _loop3 = function _loop3(key) {
    if (document.querySelector(".todo-done-button-".concat(key))) {
      document.querySelector(".todo-done-button-".concat(key)).removeEventListener("click", function () {
        (0, _taskRepeat.repeatTask)(doneTodoList, key);
      });
    }

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
    thirdChildDivSecondButton.className = "todo-button todo-right-button delete-done-task-".concat(key);
    var thirdChildDivSecondButtonSpan = thirdChildDivSecondButton.appendChild(element("icon"));
    thirdChildDivSecondButtonSpan.className = "delete-icon";
    thirdChildDivSecondButtonSpan.innerHTML = "&#10007;";
  };

  for (var key in doneTodoList) {
    _loop3(key);
  }

  var _loop4 = function _loop4(_key2) {
    document.querySelector(".todo-done-button-".concat(_key2)).addEventListener("click", function () {
      (0, _taskRepeat.repeatTask)(doneTodoList, _key2);
    });
    document.querySelector(".delete-done-task-".concat(_key2)).addEventListener("click", function () {
      (0, _deletingButton.deleteTaskButtonClick)(_key2);
    });
  };

  for (var _key2 in doneTodoList) {
    _loop4(_key2);
  }

  var doneListLength = doneTodoList.length;
  document.querySelector(".done-todo-quantiti").innerText = doneListLength;
}

function deletTodoTasks() {
  exports.todoList = todoList = [];
  createToDo(todoList);
  (0, _boxesUnderTodolist.createMassiveBox)();
}

document.querySelector(".category-box-delete-border").addEventListener("click", deletTodoTasks);

function deletDoneTodoTasks() {
  exports.doneTodoList = doneTodoList = [];
  createDoneItems();
  (0, _boxesUnderDonelist.createDoneMassiveBox)();
}

document.querySelector(".category-box-delete-done").addEventListener("click", deletDoneTodoTasks);
},{"./to-do/drag-and-drop":"to-do/drag-and-drop.js","./to-do/task-repeat.js":"to-do/task-repeat.js","./to-do/task-delete.js":"to-do/task-delete.js","./to-do/boxes-under-todolist.js":"to-do/boxes-under-todolist.js","./to-do/short-long-rest.js":"to-do/short-long-rest.js","./to-do/boxes-under-donelist.js":"to-do/boxes-under-donelist.js","./to-do/deleting-button.js":"to-do/deleting-button.js"}],"watch-border.js":[function(require,module,exports) {
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

var _todoBorder = require("./todo-border.js");

var state;
exports.state = state;
var pomidorroDuration = 25 * 60 * 1000;
exports.pomidorroDuration = pomidorroDuration;
var newWorkTime;
var remainingTime;
exports.remainingTime = remainingTime;
var pomidorroInterval;
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
  showTodoDescription(_todoBorder.todoList);
}

function checkTime(timeValue) {
  if (timeValue.time <= 0) {
    clearInterval(pomidorroInterval);
    checkState();
  }
}

function initiatePomidorro(workTime) {
  newWorkTime = workTime;
  launchPomidorro();
  exports.pomidorroInterval = pomidorroInterval = setInterval(launchPomidorro, 1000);
}

function launchPomidorro() {
  var timeValue = getTime(newWorkTime);
  showTime(timeValue);
  checkTime(timeValue);
  exports.remainingTime = remainingTime = timeValue.time;
}

setCountborderViewWorkNotStarted();

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
  (0, _todoBorder.lastItemDone)(_todoBorder.todoList);
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

function showTodoDescription(todoList) {
  if (todoList[0] == undefined) {
    document.querySelector(".processing-todo-task").innerHTML = "";
  } else if (state == "startWork" || state == "pauseWork" || state == "resumeWork" || state == "stopWork") {
    document.querySelector(".processing-todo-task").innerHTML = todoList[0].todoDesc;
  } else if (state == "restRest" || state == "pauseRest" || state == "resumeRest") {
    document.querySelector(".processing-todo-task").innerHTML = "";
  }
}
},{"./todo-border.js":"todo-border.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./watch-border.js");

require("./todo-border.js");
},{"./watch-border.js":"watch-border.js","./todo-border.js":"todo-border.js"}],"../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57336" + '/');

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