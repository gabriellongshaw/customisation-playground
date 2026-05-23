import { hexToRgb } from '../core/utils.js';
import { updateSliderFill, syncSliders } from '../core/sliders.js';
import { getElements } from '../core/elements.js';
import { getEffectiveTheme } from '../core/themeState.js';

export function updatePanel() {
  const { controls, panelBg, panelText, panelWidth, panelHeight, panelRadius, panelBlur, panelTransparency, panelBorderColor, panelBorderWidth } = getElements();

  const maxW = Math.min(panelWidth.value, window.innerWidth - 16);
  const maxH = Math.min(panelHeight.value, window.innerHeight - 60);

  controls.style.setProperty('--color-panel-bg-base', hexToRgb(panelBg.value));
  controls.style.backgroundColor = `rgba(${hexToRgb(panelBg.value)}, ${panelTransparency.value / 100})`;
  controls.style.color = panelText.value;
  controls.style.width = maxW + 'px';
  controls.style.height = maxH + 'px';
  controls.style.borderRadius = panelRadius.value + 'px';
  controls.style.backdropFilter = `blur(${panelBlur.value}px)`;
  controls.style.border = panelBorderWidth.value > 0
    ? `${panelBorderWidth.value}px solid ${panelBorderColor.value}`
    : 'none';
}

export function initPanel() {
  const { panelBg, panelText, panelWidth, panelHeight, panelRadius, panelBlur, panelTransparency, panelBorderColor, panelBorderWidth, resetPanelBtn } = getElements();

  panelWidth.value = window.innerWidth >= 600 ? 360 : Math.min(300, window.innerWidth - 16);
  panelHeight.value = Math.min(500, window.innerHeight - 60);

  [panelBg, panelText, panelWidth, panelHeight, panelRadius, panelBlur, panelTransparency, panelBorderColor, panelBorderWidth].forEach(input => {
    input.addEventListener('input', () => {
      updatePanel();
      if (input.type === 'range') updateSliderFill(input);
    });
  });

  resetPanelBtn.addEventListener('click', () => {
    if (getEffectiveTheme() === 'dark') {
      panelBg.value = '#222222';
      panelText.value = '#ffffff';
      panelBlur.value = 12;
      panelTransparency.value = 90;
    } else {
      panelBg.value = '#ffffff';
      panelText.value = '#000000';
      panelBlur.value = 20;
      panelTransparency.value = 70;
    }

    panelWidth.value = window.innerWidth >= 600 ? 360 : Math.min(300, window.innerWidth - 16);
    panelHeight.value = Math.min(500, window.innerHeight - 60);
    panelRadius.value = 12;
    panelBorderColor.value = '#ffffff';
    panelBorderWidth.value = 0;

    updatePanel();
    syncSliders();
  });
}