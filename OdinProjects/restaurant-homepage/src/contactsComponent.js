// I wanted to add an image to this page - it would have been nice for it to have been a location map image, but I couldn't find a good one.
import Icon from "./north.png";
const myIcon = new Image();
myIcon.src = Icon;
myIcon.classList.add("location-img");

const contactsComponent = () => {
  const contactsContainer = document.createElement("main");
  contactsContainer.classList.add("contacts-container");

  const contactDetailsContainer = document.createElement("div");
  contactDetailsContainer.classList.add("details-container");

  const detailsName = document.createElement("p");
  detailsName.innerHTML = "Katie 'the face' Stamm";

  const details = document.createElement("p");
  details.innerHTML =
    "+64(22)5555-555</br>theface@yourmumshouse.com</br>123 Mummy's girl Lane, </br>Wellington, NZ";

  contactDetailsContainer.appendChild(detailsName);
  contactDetailsContainer.appendChild(details);

  contactsContainer.appendChild(myIcon);
  contactsContainer.appendChild(contactDetailsContainer);

  return contactsContainer;
};

export default contactsComponent;
