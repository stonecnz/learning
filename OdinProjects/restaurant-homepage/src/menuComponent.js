// Create an object to hold your menu objects. These could be in a data file - you could get them via an API and dynamically load them eventually.
const items = {
  item1: {
    name: "Grilled Cheese",
    desc: "A gorgeous combination of Swiss and Cheddar cheese between two slices of Sourdough",
    price: "$4",
  },
  item2: {
    name: "Banana Soup",
    desc: "A warm vomit like soupy substance made from the eviscerated skin of a banana",
    price: "$200",
  },
  item3: {
    name: "Poutine al a mode",
    desc: "Poutine frozen solid and then churned akin to a good gelato - except it's not",
    price: "$1.50",
  },
};

// create the function to put together a menu element with the appended elements for each item on the menu in the object declared above.
const createMenu = (items) => {
  // create an element that will contain all of the menu-item elements
  const menuItems = document.createElement("div");
  menuItems.classList.add("menu-items");

  // For each menu-item in the items object create a container div for the item; create and append the name, description, and price; append them to the container element
  Object.entries(items).forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const menuItemName = document.createElement("p");
    menuItemName.innerHTML = item[1].name;
    const menuItemDescription = document.createElement("p");
    menuItemDescription.innerHTML = item[1].desc;
    const menuItemPrice = document.createElement("p");
    menuItemPrice.innerHTML = item[1].price;

    menuItem.appendChild(menuItemName);
    menuItem.appendChild(menuItemDescription);
    menuItem.appendChild(menuItemPrice);

    menuItems.appendChild(menuItem);
  });

  // return the container element with each menu-item element appended
  return menuItems;
};

// create a function to put together the actual "main" element to be swapped into the web page dynamically
const menuComponent = () => {
  const mainContainer = document.createElement("main");

  const heading = document.createElement("h1");
  heading.innerHTML = "Menu";

  mainContainer.appendChild(heading);
  mainContainer.appendChild(createMenu(items));

  return mainContainer;
};

export default menuComponent;
