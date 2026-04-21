export function updateSliderFill(slider) {
  const min = Number(slider.min || 0);
  const max = Number(slider.max || 100);
  const val = Number(slider.value || 0);
  const percent = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--value', `${percent}%`);
}

export function syncSliders() {
  document.querySelectorAll('input[type="range"]').forEach(updateSliderFill);
}
