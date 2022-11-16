const activeAccount = __accountList.find(function (ele) {
  return ele.getUsername() === localStorage.getItem("currentuserName");
});

//Elements:
const user = document.querySelector(".user");
const date = document.querySelector(".top-date");

const optionEl = document.querySelector(".option");

const activeEl = document.querySelector(".active");
const holdEl = document.querySelector(".hold");
const completedEl = document.querySelector(".completed");
const deletedEl = document.querySelector(".deleted");

const NameEl = document.querySelector(".name");
const addListEl = document.querySelector(".addlist");
const listSearch = document.querySelector("#list-search");

const err = document.querySelector(".error");

const allVisibleList = document.querySelector(".alllists");

const shownListRow = document.querySelector(".listrow");
const hEl = document.querySelector(".h");
const cEl = document.querySelector(".c");
const dEl = document.querySelector(".d");
const uEl = document.querySelector(".u");

const logOut = document.querySelector(".logoout");

//Data Variables:
const optionArray = [activeEl, holdEl, completedEl, deletedEl];
let runningEl;

//Functions:
const init = function () {
  user.textContent = activeAccount.getFirstName();
  const today = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
  date.textContent = `${today}`;
  runningEl = activeEl;
  showActiveEl(runningEl);
};

const showActiveEl = function (runningEl) {
  optionArray.forEach((el) => {
    el.style.backgroundColor = "#adadad";
    el.firstElementChild.style.color = "black";
  });
  runningEl.style.backgroundColor = "black";
  runningEl.firstElementChild.style.color = "white";
  NameEl.textContent = `${runningEl.dataset.name} List`;
  if (runningEl.dataset.name === "Active") {
    addListEl.textContent = "Add to list";
    listSearch.placeholder = "Add any task to the list";
  } else {
    addListEl.textContent = "Search";
    listSearch.placeholder = "Search any task in the list";
  }
  showTaskList(runningEl);
};

const showTaskList = function (runningEl, sth = "") {
  if (runningEl.dataset.name === "Active") {
    const curActive = activeAccount.getactiveList();
    allVisibleList.innerHTML = "";
    curActive.forEach(function (el, i) {
      const htmlToShow = `<div class="listrow" data-index="${i}">
      <p class="number">${i + 1})</p>
      <p class="date">${el[0]}</p>
      <p class="task">${el[1]}</p>
      <p class="h">↓</p>
      <p class="c">✔</p>
      <p class="d">✕</p>
    </div>`;
      allVisibleList.insertAdjacentHTML("beforeend", htmlToShow);
    });
  } else if (runningEl.dataset.name === "On Hold") {
    const curActive = activeAccount.getonHoldList();
    allVisibleList.innerHTML = "";
    curActive.forEach(function (el, i) {
      const htmlToShow = `<div class="listrow y" data-index="${i}">
      <p class="number">${i + 1})</p>
      <p class="date">${el[0]}</p>
      <p class="task">${el[1]}</p>
      <p class="u">↑</p>
      <p class="d">✕</p>
    </div>`;
      if (el[1].includes(sth)) {
        allVisibleList.insertAdjacentHTML("beforeend", htmlToShow);
      }
    });
  } else if (runningEl.dataset.name === "Completed") {
    const curActive = activeAccount.getcompletedList();
    allVisibleList.innerHTML = "";
    curActive.forEach(function (el, i) {
      const htmlToShow = `<div class="listrow g" data-index="${i}">
      <p class="number" >${i + 1})</p>
      <p class="date">${el[0]}</p>
      <p class="task">${el[1]}</p>
      <p class="d">✕</p>
    </div>`;
      if (el[1].includes(sth)) {
        allVisibleList.insertAdjacentHTML("beforeend", htmlToShow);
      }
    });
  } else if (runningEl.dataset.name === "Deleted") {
    const curActive = activeAccount.getdeletedList();
    allVisibleList.innerHTML = "";
    curActive.forEach(function (el, i) {
      const htmlToShow = `<div class="listrow b" data-index="${i}">
      <p class="number">${i + 1})</p>
      <p class="date">${el[0]}</p>
      <p class="task">${el[1]}</p>
      <p class="d">✕</p>
    </div>`;
      if (el[1].includes(sth)) {
        allVisibleList.insertAdjacentHTML("beforeend", htmlToShow);
      }
    });
  } else {
    return;
  }
};

const showError = function (mes) {
  err.classList.remove("hidden");
  err.textContent = `${mes}`;
  listSearch.classList.add("shake");
  setTimeout(() => {
    err.classList.add("hidden");
    listSearch.classList.remove("shake");
  }, 2500);
};

const addToTheUserArray = function (v) {
  const today = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date());
  const arrayTopass = [today, v];
  activeAccount.setActiveList(arrayTopass);
  showTaskList(runningEl);
  persistData();
};

const taskToHold = function (el) {
  const indexOfTask = el.dataset.index;
  activeAccount.setHoldList(indexOfTask);
  persistData();
  showTaskList(runningEl, listSearch.value);
};

const taskTounHold = function (el) {
  const indexOfTask = el.dataset.index;
  activeAccount.offHoldList(indexOfTask);
  persistData();
  showTaskList(runningEl, listSearch.value);
};

const taskToComplete = function (el) {
  const indexOfTask = el.dataset.index;
  activeAccount.setCompletedList(indexOfTask);
  persistData();
  showTaskList(runningEl, listSearch.value);
};

const taskToDeleted = function (el) {
  const indexOfTask = el.dataset.index;
  activeAccount.setDeletedList(indexOfTask, runningEl.dataset.name);
  persistData();
  showTaskList(runningEl, listSearch.value);
};

const searchbox = function () {
  if (runningEl.dataset.name === "Active") {
    const valueToadd = listSearch.value;
    listSearch.value = "";
    if (valueToadd === "") {
      showError("Enter Something To Add");
      return;
    }
    if (valueToadd.length > 60) {
      showError("Max Letters Reached");
      return;
    }
    addToTheUserArray(valueToadd);
  }
  if (
    runningEl.dataset.name === "On Hold" ||
    runningEl.dataset.name === "Completed" ||
    runningEl.dataset.name === "Deleted"
  ) {
    const valueToadd = listSearch.value;
    listSearch.value = "";
    if (valueToadd.length > 60) {
      showError("Max Letters Reached");
      return;
    }
    showTaskList(runningEl, valueToadd);
  }
};

const logOutUser = function () {
  persistData();
  window.location.href = "index.html";
};
//function calls:
init();

//Event Listeners:
optionEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("opt") || e.target.tagName === "A") {
    runningEl = e.target.closest("div");
    showActiveEl(runningEl);
  }
});

addListEl.addEventListener("click", searchbox);
allVisibleList.addEventListener("click", function (e) {
  const key = e.target;
  const actualBox = key.closest(".listrow");
  if (key.classList.contains("h")) {
    taskToHold(actualBox);
  }
  if (key.classList.contains("c")) {
    taskToComplete(actualBox);
  }
  if (key.classList.contains("d")) {
    taskToDeleted(actualBox);
  }
  if (key.classList.contains("u")) {
    taskTounHold(actualBox);
  }
});

window.addEventListener("keydown", function (e) {
  const keyPressed = e.key;
  if (keyPressed === "ArrowUp") {
    if (optionArray.indexOf(runningEl) <= 0) return;
    runningEl = optionArray[optionArray.indexOf(runningEl) - 1];
    showActiveEl(runningEl);
  }
  if (keyPressed === "ArrowDown") {
    if (optionArray.indexOf(runningEl) >= optionArray.length - 1) return;
    runningEl = optionArray[optionArray.indexOf(runningEl) + 1];
    showActiveEl(runningEl);
  }
  if (keyPressed === "Enter") {
    searchbox();
  }
  if (keyPressed === "Escape") {
    logOutUser();
  }
});

logOut.addEventListener("click", logOutUser);
