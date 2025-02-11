import { COUNTER_DISAGREE_CLICKING } from './main.js';

const body = document.getElementById('body');
const MAX_WIDTH = 65;

const createHeartBg = () => {
  const heart = document.createElement('img');

  heart.src = COUNTER_DISAGREE_CLICKING > 1 ? './assets/background/sad.png' : './assets/background/heart.svg';
  heart.setAttribute('class', 'heart');
  heart.style.width = `${Math.random() * MAX_WIDTH}px`;
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${Math.random() * window.innerHeight}px`;

  body.appendChild(heart);

  setTimeout(() => {
    body.removeChild(heart);
  }, 6000);
};

setInterval(createHeartBg, 100);
