const sceneContainer = document.getElementById('scene__container');
const sceneTitle = document.getElementById('scene__title');
const imgContainer = document.getElementById('img__container');
const scene_1 = document.getElementById('img__scene_1');
const scene_2 = document.getElementById('img__scene_2');
const scene_3 = document.getElementById('img__scene_3');
const textContainer = document.getElementById('text__container');
const btnContainer = document.getElementById('btn__container');
const letterContainer = document.getElementById('letter__container');
const heartContainer = document.getElementById('heart__container');
const volumeSound = document.getElementById('sound');
const volumeMute = document.getElementById('mute');
const btnY = document.getElementById('btnY');
const btnN = document.getElementById('btnN');
const btnR = document.getElementById('btnR');
const btnV = document.getElementById('btnV');
const bgSong = document.getElementById('bg-song');
const years = document.getElementById('years');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const START_DATE = new Date('2019-10-07T00:00:00');
export let COUNTER_AGREE_CLICKING = 0;
export let COUNTER_DISAGREE_CLICKING = 0;
let IS_LETTER_ROTATED = false;

bgSong.volume = 0.1;

const showElement = (element, displayProp = 'block') => (element.style.display = displayProp);
const hideElement = (element) => (element.style.display = 'none');
const addLetterS = (counter) => (counter > 1 ? 's' : '');

const counterDate = () => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - START_DATE) / 1000);

  const totalDays = Math.floor(diffInSeconds / (24 * 60 * 60));
  const totalHours = Math.floor(diffInSeconds / (60 * 60));
  const totalMinutes = Math.floor(diffInSeconds / 60);
  const totalSeconds = diffInSeconds;
  const totalYears = Math.floor(totalDays / 365); // Approximate years

  years.innerText = `Year${addLetterS(totalYears)}: ${totalYears}`;
  days.innerText = `Day${addLetterS(totalDays)}: ${totalDays}`;
  hours.innerText = `Hour${addLetterS(totalHours)}: ${totalHours}`;
  minutes.innerText = `Minute${addLetterS(totalMinutes)}: ${totalMinutes}`;
  seconds.innerText = `Second${addLetterS(totalSeconds)}: ${totalSeconds}`;
};
setInterval(counterDate, 1000);

const rotateScene = () => {
  sceneContainer.style.transform = 'rotate(90deg)';
  sceneContainer.style.padding = '0';
};

btnY.addEventListener('click', (e) => {
  e.stopPropagation();

  if (COUNTER_AGREE_CLICKING > 1) return;
  COUNTER_AGREE_CLICKING += 1;

  hideElement(sceneTitle);
  hideElement(imgContainer);
  hideElement(btnContainer);

  sceneContainer.style.minWidth = '362px';
  sceneContainer.style.minHeight = '458px';
  sceneContainer.style.scale = '0.72';
  sceneContainer.style.backgroundColor = '#f05b7e';
  sceneContainer.style.cursor = 'pointer';

  rotateScene();
  showElement(letterContainer, 'flex');

  setTimeout(() => {
    IS_LETTER_ROTATED = true;
    showElement(textContainer, 'flex');
  }, 1500);

  showElement(btnR);
});

sceneContainer.addEventListener('click', () => {
  // is clickable just after textContainer is rotated
  if (!IS_LETTER_ROTATED) return;

  if (COUNTER_AGREE_CLICKING > 0) {
    letterContainer.classList.toggle('flap');

    if (letterContainer.classList.contains('flap')) {
      letterContainer.setAttribute('title', 'Close');
    } else {
      letterContainer.setAttribute('title', 'Open');
    }
  }
});

btnN.addEventListener('click', () => {
  COUNTER_DISAGREE_CLICKING += 1;

  if (COUNTER_DISAGREE_CLICKING === 1) {
    sceneTitle.innerHTML = 'You can lose my heart <br/>Please confirm your choice!';
    btnY.innerHTML = `CATCH!!!`;
    btnN.innerText = 'Confirm';

    showElement(scene_2);
    hideElement(scene_1);
  } else {
    showElement(scene_3, 'flex');
    hideElement(sceneTitle);
    hideElement(scene_1);
    hideElement(scene_2);
    hideElement(btnContainer);
  }

  showElement(btnR);
});

btnR.addEventListener('click', () => window.location.reload());
btnV.addEventListener('click', () => {
  if (bgSong.muted) {
    bgSong.muted = false;
    showElement(volumeSound);
    hideElement(volumeMute);
  } else {
    bgSong.muted = true;
    showElement(volumeMute);
    hideElement(volumeSound);
  }
});
