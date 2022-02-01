const component = (el) => {
  const element = document.createElement(el);
  return element;
};

const addHref = (el) => {
  el.href = "#";
};

const navComponent = () => {
  const navEl = component("nav");
  const ulEl = component("ul");
  const liEl1 = component("li");
  const liEl2 = component("li");
  const liEl3 = component("li");

  liEl1.innerHTML = "Home";
  liEl1.classList.add("home-btn");
  liEl2.innerHTML = "Menu";
  liEl2.classList.add("menu-btn");
  liEl3.innerHTML = "Contact";
  liEl3.classList.add("contact-btn");

  ulEl.appendChild(liEl1);
  ulEl.appendChild(liEl2);
  ulEl.appendChild(liEl3);

  navEl.appendChild(ulEl);

  return navEl;
};

export default navComponent;
