"use strict";
// all inputs
let signUpName = document.getElementById("signUpName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");
let mesg = document.querySelector(".message");
let signUpBtn = document.querySelector(".signUp");
let mesgLogIn = document.querySelector(".messageLogIn");
let welcomeMesg = document.querySelector(".welcomeMesg");
let toggleBtn = document.querySelector(".toggleBtn");
let logoutBtn = document.querySelector(".logoutBtn");

let users;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}
let sessionName = localStorage.getItem("sessionName");
if (sessionName) {
  welcomeMesg.textContent = `Welcome ${sessionName}`;
}

function signEmpty() {
  console.log("adel");
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function signingUp() {
  if (signEmpty() == false) {
    mesg.innerHTML = `<span class="text-danger">All inputs is required</span>`;
    return;
  }
  if (isEmailExist()) {
    mesg.innerHTML = `<span class="text-danger">Email already exists</span>`;
    return;
  }

  let user = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  mesg.innerHTML = `<span class="text-success">Success</span>`;

  location.assign(`http://${location.hostname}:${location.port}/login.html`);
}

function login() {
  for (let i = 0; i < users.length; i++) {
    if (
      signInEmail.value == users[i].email &&
      signInPassword.value == users[i].password
    ) {
      localStorage.setItem("sessionName", users[i].name);

      location.assign(
        `http://${location.hostname}:${location.port}/welcome.html`
      );
      welcomeMesg.textContent = "adel";
    } else {
      mesgLogIn.innerHTML = `<span class="text-danger">incorrect email or password</span>`;
    }
  }
}

function displayBtns() {
  logoutBtn.classList.toggle("w-100");
  logoutBtn.classList.toggle("d-block");
  logoutBtn.classList.toggle("d-none");
}

function logout() {
  location.assign(`http://${location.hostname}:${location.port}/login.html`);
}
