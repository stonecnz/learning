const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.classList.add('text')
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const redText = document.createElement('p');
redText.classList.add('text');
redText.style.color = 'red';
redText.textContent = "Hey, I'm red!";

container.appendChild(redText)

const blueText = document.createElement('h3');
blueText.classList.add('text');
blueText.style.color = 'blue';
blueText.textContent = "I'm a blue h3!";

container.appendChild(blueText);

const bordered = document.createElement('div');
bordered.classList.add('bordered');
bordered.style.backgroundColor = 'pink';
bordered.style.border = '5px solid black';

const h1 = document.createElement('h1');
h1.textContent = "I'm in a div";
const p = document.createElement('p');
p.textContent = "ME TOO!";

bordered.appendChild(h1);
bordered.appendChild(p);
container.appendChild(bordered);

