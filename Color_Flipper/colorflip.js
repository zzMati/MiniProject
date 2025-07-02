let currentOpacity = 100;  // opacité initiale (1 = 100%)

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const bgColor = window.getComputedStyle(button).backgroundColor;
    colorflipper(bgColor);
  });
});

function colorflipper(color){
  // extraire rgb sans alpha
  if (color.startsWith('rgb(')) {
    const rgbValues = color.slice(4, -1); // "r, g, b"
    document.body.style.backgroundColor = `rgba(${rgbValues}, ${currentOpacity})`;
  } else {
    // si couleur au format hex, etc. on applique directement (pas optimal)
    document.body.style.backgroundColor = color;
  }
}

const opacityInput = document.getElementById('opacity');

opacityInput.addEventListener('keypress', (e) => {
  const allowedkey = '0123456789';
  if (!allowedkey.includes(e.key)) {
    e.preventDefault();
  }
});

opacityInput.addEventListener('change', () => {
  if (opacityInput.value === '') return;
  opacityInput.value = Math.min(100, Math.max(0, opacityInput.value));
  opacityChanger();
});

opacityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (opacityInput.value === '') return;
    opacityInput.value = Math.min(100, Math.max(0, opacityInput.value));
    opacityChanger();
    opacityInput.blur();
  }
});

function opacityChanger() {
  let val = Number(opacityInput.value);
  currentOpacity = val / 100;

  let currentColor = window.getComputedStyle(document.body).backgroundColor;

  if (currentColor.startsWith('rgb(')) {
    const rgbValues = currentColor.slice(4, -1);
    document.body.style.backgroundColor = `rgba(${rgbValues}, ${currentOpacity})`;
  }
}
