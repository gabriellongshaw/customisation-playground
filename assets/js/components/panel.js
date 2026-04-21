import { hexToRgb } from '../core/utils.js';
import { updateSliderFill, syncSliders } from '../core/sliders.js';
import { getElements } from '../core/elements.js';
import { currentThemeSource } from '../core/theme.js';

export function updatePanel() {
  const { controls, panelBg, panelText, panelWidth, panelRadius, panelBlur, panelTransparency } = getElements();

  controls.style.setProperty('--color-panel-bg-base', hexToRgb(panelBg.value));
  controls.style.backgroundColor = `rgba(${hexToRgb(panelBg.value)}, ${panelTransparency.value / 100})`;
  controls.style.color = panelText.value;
  controls.style.width = panelWidth.value + 'px';
  controls.style.borderRadius = panelRadius.value + 'px';
  controls.style.backdropFilter = `blur(${panelBlur.value}px)`;
}

export function initPanel() {
  const { panelBg, panelText, panelWidth, panelRadius, panelBlur, panelTransparency, resetPanelBtn } = getElements();

  [panelBg, panelText, panelWidth, panelRadius, panelBlur, panelTransparency].forEach(input => {
    input.addEventListener('input', () => {
      updatePanel();
      updateSliderFill(input);
    });
  });

  resetPanelBtn.addEventListener('click', () => {
    if (currentThemeSource === 'light' || currentThemeSource === 'system') {
      panelBg.value = '#ffffff';
      panelText.value = '#000000';
      panelBlur.value = 30;
      panelTransparency.value = 70;
    } else {
      panelBg.value = '#222222';
      panelText.value = '#ffffff';
      panelBlur.value = 12;
      panelTransparency.value = 90;
    }

    panelWidth.value = 300;
    panelRadius.value = 12;

    updatePanel();
    syncSliders();
  });
}
