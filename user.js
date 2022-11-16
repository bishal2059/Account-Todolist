//Main User class:
class User {
  #firstName;
  #lastName;
  #gender;
  #birthDate;
  #age;
  #userName;
  #activeList;
  #onHoldList;
  #completedList;
  #deletedList;
  #password;
  constructor(
    firstName,
    lastName,
    gender,
    birthDate,
    userName,
    password,
    activeList,
    completedList,
    onHoldList,
    deletedList
  ) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#gender = gender;
    this.#birthDate = birthDate;
    this.#userName = userName;
    this.#password = password;
    this.#age =
      new Date().getFullYear() - new Date(this.#birthDate).getFullYear();
    this.#activeList = activeList;
    this.#completedList = completedList;
    this.#onHoldList = onHoldList;
    this.#deletedList = deletedList;
  }

  getUsername() {
    return this.#userName;
  }
  getPassword() {
    return this.#password;
  }
  getFirstName() {
    return this.#firstName;
  }
  getLastName() {
    return this.#lastName;
  }
  getGender() {
    return this.#gender;
  }
  getbirthDate() {
    return this.#birthDate;
  }
  getactiveList() {
    return this.#activeList;
  }
  getonHoldList() {
    return this.#onHoldList;
  }
  getcompletedList() {
    return this.#completedList;
  }
  getdeletedList() {
    return this.#deletedList;
  }
  setActiveList(val) {
    this.#activeList.push(val);
  }
  setHoldList(index) {
    const [changeTask] = this.#activeList.splice(index, 1);
    this.#onHoldList.push(changeTask);
  }
  offHoldList(index) {
    const [changeTask] = this.#onHoldList.splice(index, 1);
    this.#activeList.push(changeTask);
  }
  setCompletedList(index) {
    const [changeTask] = this.#activeList.splice(index, 1);
    this.#completedList.push(changeTask);
  }
  setDeletedList(index, arrTosplice) {
    if (arrTosplice === "Active") {
      const [changeTask] = this.#activeList.splice(index, 1);
      this.#deletedList.push(changeTask);
    }
    if (arrTosplice === "On Hold") {
      const [changeTask] = this.#onHoldList.splice(index, 1);
      this.#deletedList.push(changeTask);
    }
    if (arrTosplice === "Completed") {
      const [changeTask] = this.#completedList.splice(index, 1);
      this.#deletedList.push(changeTask);
    }
    if (arrTosplice === "Deleted") {
      const [changeTask] = this.#deletedList.splice(index, 1);
      return;
    }
  }
}

//Data variables:
const __accountList = [];

//Functions:
const createNewUser = function (
  firstName,
  lastName,
  gender,
  birthDate,
  username,
  password,
  activeList = [],
  completedList = [],
  onHoldList = [],
  deletedList = []
) {
  const [year, month, date] = birthDate.split("-");
  const DOB = new Date(year, month - 1, date).toISOString();
  __accountList.push(
    new User(
      firstName,
      lastName,
      gender,
      DOB,
      username,
      password,
      activeList,
      completedList,
      onHoldList,
      deletedList
    )
  );
  persistData();
};

const persistData = function () {
  const allUserData = __accountList.map(function (ele) {
    return {
      firstName: ele.getFirstName(),
      lastName: ele.getLastName(),
      gender: ele.getGender(),
      birthDate: ele.getbirthDate(),
      username: ele.getUsername(),
      password: ele.getPassword(),
      activeList: ele.getactiveList(),
      completedList: ele.getcompletedList(),
      onHoldList: ele.getonHoldList(),
      deletedList: ele.getdeletedList(),
    };
  });

  localStorage.setItem("allUsers", JSON.stringify(allUserData));
};

const generateAllUsers = function () {
  const generatingArray = JSON.parse(localStorage.getItem("allUsers"));
  // console.log(generatingArray);
  if (!generatingArray) return;
  generatingArray.forEach(function (ele) {
    // console.log(ele);
    const userDOBgenerator = new Date(ele.birthDate);
    const userDOB = `${userDOBgenerator.getFullYear()}-${
      userDOBgenerator.getMonth() + 1
    }-${userDOBgenerator.getDate()}`;
    createNewUser(
      ele.firstName,
      ele.lastName,
      ele.gender,
      userDOB,
      ele.username,
      ele.password,
      ele.activeList,
      ele.completedList,
      ele.onHoldList,
      ele.deletedList
    );
  });
};

//Function Calls:
generateAllUsers();

//Sample Users:
// createNewUser(
//   "Bishal",
//   "Sapkota",
//   "Male",
//   "2003-01-04",
//   "bishal17",
//   "17isThegolden%",
//   [],
//   [],
//   [],
//   []
// );
// createNewUser(
//   "Indra",
//   "Sapkota",
//   "Male",
//   "2002-12-19",
//   "Admin",
//   "admin17",
//   [],
//   [],
//   [],
//   []
// );

//Sample List:
//['11/12/2022' 'Do exercise every evening']
