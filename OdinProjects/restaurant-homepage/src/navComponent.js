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
  const aEl1 = component("a");
  const aEl2 = component("a");
  const aEl3 = component("a");

  addHref(aEl1);
  addHref(aEl2);
  addHref(aEl3);

  aEl1.innerHTML = "Home";
  aEl2.innerHTML = "Menu";
  aEl3.innerHTML = "Contact";

  liEl1.appendChild(aEl1);
  liEl2.appendChild(aEl2);
  liEl3.appendChild(aEl3);

  ulEl.appendChild(liEl1);
  ulEl.appendChild(liEl2);
  ulEl.appendChild(liEl3);

  navEl.appendChild(ulEl);

  return navEl;
};

export default navComponent;
