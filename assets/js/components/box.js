import { hexToRgb } from '../core/utils.js';
import { updateSliderFill, syncSliders } from '../core/sliders.js';
import { getElements } from '../core/elements.js';
import { getEffectiveTheme } from '../core/theme.js';

export function updateBox() {
  const { box, boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency } = getElements();

  box.textContent = boxText.value;
  box.style.setProperty('--color-box-bg-base', hexToRgb(bgColor.value));
  box.style.backgroundColor = `rgba(${hexToRgb(bgColor.value)}, ${transparency.value / 100})`;
  box.style.color = textColor.value;
  box.style.width = boxWidth.value + 'px';
  box.style.borderRadius = borderRadius.value + 'px';
  box.style.backdropFilter = `blur(${blur.value}px)`;
}

export function initBox() {
  const { boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency, resetBtn } = getElements();

  [boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency].forEach(input => {
    input.addEventListener('input', () => {
      updateBox();
      updateSliderFill(input);
    });
  });

  resetBtn.addEventListener('click', () => {
    if (getEffectiveTheme() === 'dark') {
      boxText.value = 'Customisable Button';
      bgColor.value = '#111111';
      textColor.value = '#eeeeee';
      blur.value = 12;
      transparency.value = 50;
    } else {
      boxText.value = 'Customisable Button';
      bgColor.value = '#ffffff';
      textColor.value = '#ffffff';
      blur.value = 3;
      transparency.value = 5;
    }

    boxWidth.value = 200;
    borderRadius.value = 8;

    updateBox();
    syncSliders();
  });
}