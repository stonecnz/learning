const component = (el) => {
  const element = document.createElement(el);
  return element;
};

const homeComponent = () => {
  const homeContainer = component("main");

  const heading = component("h1");
  heading.innerText = "B&W Literary Eats";
  heading.classList.add("heading");

  const about = component("p");
  about.innerText =
    "Based on Left Bank Arcade, an erudite side-street off the (in)famous Cuba Street, our eatery boasts a wide selection of curated novels that customers can digest as they digest.";
  about.classList.add("about-desc");

  homeContainer.appendChild(heading);
  homeContainer.appendChild(about);

  return homeContainer;
};

export default homeComponent;
