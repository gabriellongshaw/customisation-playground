import { getElements } from '../core/elements.js';
import { updateSliderFill } from '../core/sliders.js';

const DEFAULT_IMAGE_URL = 'assets/images/background.jpeg';

let currentType = 'image';

export function applyBackground() {
  const { body, bgImageUrl, bgSolidColour, bgGradientStart, bgGradientEnd, bgGradientAngle } = getElements();

  if (currentType === 'image') {
    const url = bgImageUrl.value.trim() || DEFAULT_IMAGE_URL;
    body.style.backgroundImage = `url('${url}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
  } else if (currentType === 'colour') {
    body.style.backgroundImage = 'none';
    body.style.backgroundColor = bgSolidColour.value;
    body.style.backgroundSize = '';
  } else if (currentType === 'gradient') {
    const angle = bgGradientAngle.value;
    const start = bgGradientStart.value;
    const end = bgGradientEnd.value;
    body.style.backgroundImage = `linear-gradient(${angle}deg, ${start}, ${end})`;
    body.style.backgroundSize = '';
  }
}

export function getBgState() {
  const { bgImageUrl, bgSolidColour, bgGradientStart, bgGradientEnd, bgGradientAngle } = getElements();
  return {
    type: currentType,
    imageUrl: bgImageUrl.value,
    solidColour: bgSolidColour.value,
    gradientStart: bgGradientStart.value,
    gradientEnd: bgGradientEnd.value,
    gradientAngle: bgGradientAngle.value,
  };
}

export function setBgState(state, { apply = true } = {}) {
  const { bgImageUrl, bgSolidColour, bgGradientStart, bgGradientEnd, bgGradientAngle,
    bgTypeImage, bgTypeColour, bgTypeGradient, bgImageOptions, bgColourOptions, bgGradientOptions } = getElements();

  currentType = state.type || 'image';
  if (bgImageUrl) bgImageUrl.value = state.imageUrl || '';
  if (bgSolidColour) bgSolidColour.value = state.solidColour || '#222222';
  if (bgGradientStart) bgGradientStart.value = state.gradientStart || '#222222';
  if (bgGradientEnd) bgGradientEnd.value = state.gradientEnd || '#000000';
  if (bgGradientAngle) { bgGradientAngle.value = state.gradientAngle || 180; updateSliderFill(bgGradientAngle); }

  [bgTypeImage, bgTypeColour, bgTypeGradient].forEach(b => b && b.classList.remove('active'));
  if (currentType === 'image' && bgTypeImage) bgTypeImage.classList.add('active');
  if (currentType === 'colour' && bgTypeColour) bgTypeColour.classList.add('active');
  if (currentType === 'gradient' && bgTypeGradient) bgTypeGradient.classList.add('active');

  if (bgImageOptions) bgImageOptions.style.display = currentType === 'image' ? '' : 'none';
  if (bgColourOptions) bgColourOptions.style.display = currentType === 'colour' ? '' : 'none';
  if (bgGradientOptions) bgGradientOptions.style.display = currentType === 'gradient' ? '' : 'none';

  if (apply) applyBackground();
}

export function resetBackground() {
  setBgState({ type: 'image', imageUrl: '', solidColour: '#222222', gradientStart: '#222222', gradientEnd: '#000000', gradientAngle: 180 });
}

export function initBackground() {
  const { bgTypeImage, bgTypeColour, bgTypeGradient, bgImageUrl, bgSolidColour,
    bgGradientStart, bgGradientEnd, bgGradientAngle, bgImageOptions, bgColourOptions, bgGradientOptions } = getElements();

  function setType(type) {
    currentType = type;
    [bgTypeImage, bgTypeColour, bgTypeGradient].forEach(b => b && b.classList.remove('active'));
    if (type === 'image' && bgTypeImage) bgTypeImage.classList.add('active');
    if (type === 'colour' && bgTypeColour) bgTypeColour.classList.add('active');
    if (type === 'gradient' && bgTypeGradient) bgTypeGradient.classList.add('active');

    bgImageOptions.style.display = type === 'image' ? '' : 'none';
    bgColourOptions.style.display = type === 'colour' ? '' : 'none';
    bgGradientOptions.style.display = type === 'gradient' ? '' : 'none';

    applyBackground();
  }

  bgTypeImage && bgTypeImage.addEventListener('click', () => setType('image'));
  bgTypeColour && bgTypeColour.addEventListener('click', () => setType('colour'));
  bgTypeGradient && bgTypeGradient.addEventListener('click', () => setType('gradient'));

  bgImageUrl && bgImageUrl.addEventListener('input', applyBackground);
  bgSolidColour && bgSolidColour.addEventListener('input', applyBackground);
  bgGradientStart && bgGradientStart.addEventListener('input', applyBackground);
  bgGradientEnd && bgGradientEnd.addEventListener('input', applyBackground);
  bgGradientAngle && bgGradientAngle.addEventListener('input', () => { updateSliderFill(bgGradientAngle); applyBackground(); });

  applyBackground();
}