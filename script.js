"use strict";

//Elements;
const mainSignUp = document.querySelector("#signup");
const mainLogin = document.querySelector("#login");
const mainCongrats = document.querySelector(".congrats");

const date = document.querySelector(".date");

const toSignUp = document.querySelector("#clickToSignUp");
const loginToAccount = document.querySelector("#loginToAccount");

const passwordLogin = document.querySelector("#passwordLogin");
const userLogin = document.querySelector("#userLogin");
const clickToOpenAccount = document.querySelector("#clickToOpenAccount");

const signUpfirstName = document.querySelector("#SignUpfirstName");
const signUplastName = document.querySelector("#SignUplastName");
const signUpgender = document.querySelector("#SignUpgender");
const signUpbirthYear = document.querySelector("#SignUpbirthYear");
const signUpuserName = document.querySelector("#SignUpuserName");
const signUpPassword = document.querySelector("#SignUppassword");
const signUpcPassword = document.querySelector("#SignUppassword_");

const showHome = document.querySelector("#showHome");

//Variables:
let currentIndex;
let activePage;
const loginEleArray = [passwordLogin, userLogin];
const signUpEleArray = [
  signUpfirstName,
  signUplastName,
  signUpgender,
  signUpbirthYear,
  signUpuserName,
  signUpPassword,
  signUpcPassword,
];

//Functions:
const init = function () {
  const today = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
  date.textContent = `${today}`;
  showLoginPage();
};

const checkCorrectLogin = function () {
  const userTocheck = userLogin.value.trim();
  const passwordTocheck = passwordLogin.value;
  const potentialUser = __accountList.find(function (user, i) {
    currentIndex = i;
    return (
      user.getUsername() === userTocheck &&
      user.getPassword() === passwordTocheck
    );
  });
  if (potentialUser) {
    //Use of database is required here.
    localStorage.setItem("currentuserName", userTocheck);
  } else {
    if (userTocheck === "") {
      displayErrorSignUp("Please Enter Username", userLogin, loginEleArray);
      return;
    } else if (passwordTocheck === "") {
      displayErrorSignUp("Please Enter Password", passwordLogin, loginEleArray);
      return;
    } else if (
      __accountList.every(function (usr) {
        return userTocheck !== usr.getUsername();
      })
    ) {
      displayErrorSignUp("Username isn't found", userLogin, loginEleArray);
      return;
    } else {
      displayErrorSignUp("Password is incorrect", passwordLogin, loginEleArray);
      return;
    }
  }
  window.location.href = "list.html";
};

const checkCorrectSignUp = function () {
  const firstName = signUpfirstName.value.trim();
  const lastName = signUplastName.value.trim();
  const gender = signUpgender.value;
  const birthDate = signUpbirthYear.value;
  const username = signUpuserName.value.trim();
  const password = signUpPassword.value;
  const cpassword = signUpcPassword.value;
  if (
    errorSignUp(
      firstName,
      lastName,
      gender,
      birthDate,
      username,
      password,
      cpassword
    )
  )
    return;
  createNewUser(firstName, lastName, gender, birthDate, username, password);
  showCongratsPage();
};

const errorSignUp = function (f, l, g, b, u, p, cp) {
  if (f === "") {
    displayErrorSignUp(
      "Please Enter First Name",
      signUpfirstName,
      signUpEleArray
    );
    return true;
  }
  if (!onlyLetters(f)) {
    displayErrorSignUp(
      "Enter correct First Name",
      signUpfirstName,
      signUpEleArray
    );
    return true;
  }
  if (l === "") {
    displayErrorSignUp(
      "Please Enter Last Name",
      signUplastName,
      signUpEleArray
    );
    return true;
  }
  if (!onlyLetters(l)) {
    displayErrorSignUp(
      "Enter correct Last Name",
      signUplastName,
      signUpEleArray
    );
    return true;
  }
  if (g === "") {
    displayErrorSignUp("Enter correct gender", signUpgender, signUpEleArray);
    return true;
  }
  if (b === "") {
    displayErrorSignUp("Enter correct Date", signUpbirthYear, signUpEleArray);
    return true;
  }
  if (u === "") {
    displayErrorSignUp("Please Enter Username", signUpuserName, signUpEleArray);
    return true;
  }
  if (
    __accountList.find(function (usr) {
      return u === usr.getUsername();
    })
  ) {
    displayErrorSignUp(
      "Username already taken",
      signUpuserName,
      signUpEleArray
    );
    return true;
  }
  if (p === "") {
    displayErrorSignUp("Please Enter Password", signUpPassword, signUpEleArray);
    return true;
  }
  if (p.length < 6) {
    displayErrorSignUp("Password To Weak", signUpPassword, signUpEleArray);
    return true;
  }
  if (cp === "") {
    displayErrorSignUp(
      "Please Enter Password",
      signUpcPassword,
      signUpEleArray
    );
    return true;
  }
  if (cp !== p) {
    displayErrorSignUp(
      "Password Doesn't Match",
      signUpcPassword,
      signUpEleArray
    );
    return true;
  }
  return false;
};

function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

const displayErrorSignUp = function (mess, ele, arr) {
  arr.forEach((element) => {
    if (element.nextElementSibling.tagName === "B") {
      element.nextElementSibling.remove();
      element.style.borderColor = "#eee";
    }
  });
  const showMistake = `<b>${mess}</b>`;
  ele.insertAdjacentHTML("afterend", showMistake);
  ele.style.borderColor = "brown";
};

const showSignUpPage = function () {
  mainLogin.classList.add("hidden");
  mainCongrats.classList.add("hidden");
  mainSignUp.classList.remove("hidden");
  clearFields(signUpEleArray);
  activePage = "SignUpPage";
};

const showLoginPage = function () {
  mainLogin.classList.remove("hidden");
  mainCongrats.classList.add("hidden");
  mainSignUp.classList.add("hidden");
  clearFields(loginEleArray);
  activePage = "LoginPage";
};

const showCongratsPage = function () {
  mainLogin.classList.add("hidden");
  mainCongrats.classList.remove("hidden");
  mainSignUp.classList.add("hidden");
  activePage = "CongratsPage";
};

const clearFields = function (arr) {
  arr.forEach((ele) => {
    ele.value = "";
    ele.style.borderColor = "#eee";
    if (ele.nextElementSibling.tagName === "B") {
      ele.nextElementSibling.remove();
    }
  });
};

//function Calls:

init();

//Event Listeners:
toSignUp.addEventListener("click", function (e) {
  e.preventDefault();
  showSignUpPage();
});

loginToAccount.addEventListener("click", function (e) {
  e.preventDefault();
  checkCorrectLogin();
});

clickToOpenAccount.addEventListener("click", function (e) {
  e.preventDefault();
  checkCorrectSignUp();
});

showHome.addEventListener("click", function (e) {
  e.preventDefault();
  showLoginPage();
});

window.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key === "Enter") {
    if (activePage === "LoginPage") {
      checkCorrectLogin();
    }
    if (activePage === "SignUpPage") {
      checkCorrectSignUp();
    }
    if (activePage === "CongratsPage") return;
  }
});
