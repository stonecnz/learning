import navComponent from "./navComponent.js";
import "./style.css";
import Icon from "./book.png";

const myIcon = new Image();
myIcon.src = Icon;
myIcon.classList.add("nav-icon");

const container = document.querySelector(".container");
container.appendChild(myIcon);
container.appendChild(navComponent());
