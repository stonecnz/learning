import navComponent from "./navComponent.js";
import homeComponent from "./homeComponent.js";
import menuComponent from "./menuComponent.js";
import contactsComponent from "./contactsComponent.js";
import "./style.css";
import Icon from "./book.png";

const myIcon = new Image();
myIcon.src = Icon;
myIcon.classList.add("nav-icon");

const navContainer = document.querySelector(".nav-container");
navContainer.appendChild(myIcon);
navContainer.appendChild(navComponent());

const container = document.querySelector(".container");
container.appendChild(homeComponent());

const changeBody = (e) => {
  container.removeChild(container.childNodes[3]);
  if (e.target.innerHTML === "Menu") container.appendChild(menuComponent());
  if (e.target.innerHTML === "Home") container.appendChild(homeComponent());
  if (e.target.innerHTML === "Contact")
    container.appendChild(contactsComponent());
};

const homeBtn = document.querySelector(".home-btn");
const menuBtn = document.querySelector(".menu-btn");
const contactBtn = document.querySelector(".contact-btn");
homeBtn.addEventListener("click", changeBody);
menuBtn.addEventListener("click", changeBody);
contactBtn.addEventListener("click", changeBody);
