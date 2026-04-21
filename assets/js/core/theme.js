import { updateBox } from '../components/box.js';
import { updatePanel } from '../components/panel.js';
import { updateIcon } from '../components/icon.js';
import { syncSliders } from './sliders.js';
import { getElements } from './elements.js';

export const themeState = { source: 'system' };

export function setThemeSource(source) {
  themeState.source = source;
}

export function applyTheme(theme) {
  const { body, root, panelBg, panelText, bgColor, textColor, iconBg, iconColor,
    blur, iconBlur, transparency, iconTransparency, panelBlur, panelTransparency,
    lightModeBtn, darkModeBtn } = getElements();

  const isDark = theme === 'dark';

  if (isDark) {
    body.classList.add('dark');
    lightModeBtn.classList.remove('active');
    darkModeBtn.classList.add('active');
  } else {
    body.classList.remove('dark');
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');
  }

  if (isDark) {
    panelBg.value = '#222222';
    panelText.value = '#ffffff';
    bgColor.value = '#111111';
    textColor.value = '#eeeeee';
    iconBg.value = '#111111';
    iconColor.value = '#ffffff';
    blur.value = 12;
    iconBlur.value = 12;
    transparency.value = 50;
    iconTransparency.value = 50;
    panelBlur.value = 12;
    panelTransparency.value = 90;

    root.style.setProperty('--color-panel-tab-inactive', '#444');
    root.style.setProperty('--color-panel-tab-text', '#ffffff');
    root.style.setProperty('--color-panel-input-bg', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--color-panel-input-border', 'transparent');
    root.style.setProperty('--color-panel-slider-fill', '#ffffff');
    root.style.setProperty('--color-panel-slider-track', '#888');
    root.style.setProperty('--color-panel-slider-thumb', '#ffffff');
    root.style.setProperty('--color-panel-reset-bg', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--color-panel-reset-hover-bg', 'rgba(255, 255, 255, 0.2)');
    root.style.setProperty('--color-box-shadow-inset', 'rgba(0, 0, 0, 0.4)');
    root.style.setProperty('--color-icon-shadow-inset', 'rgba(0, 0, 0, 0.4)');
  } else {
    panelBg.value = '#ffffff';
    panelText.value = '#000000';
    bgColor.value = '#ffffff';
    textColor.value = '#ffffff';
    iconBg.value = '#ffffff';
    iconColor.value = '#ffffff';
    blur.value = 3;
    iconBlur.value = 3;
    transparency.value = 5;
    iconTransparency.value = 5;
    panelBlur.value = 30;
    panelTransparency.value = 70;

    root.style.setProperty('--color-panel-tab-inactive', '#e0e0e0');
    root.style.setProperty('--color-panel-tab-text', '#000000');
    root.style.setProperty('--color-panel-input-bg', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--color-panel-input-border', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--color-panel-slider-fill', '#1e88e5');
    root.style.setProperty('--color-panel-slider-track', '#ccc');
    root.style.setProperty('--color-panel-slider-thumb', '#1e88e5');
    root.style.setProperty('--color-panel-reset-bg', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--color-panel-reset-hover-bg', 'rgba(0, 0, 0, 0.2)');
    root.style.setProperty('--color-box-shadow-inset', 'rgba(255, 255, 255, 0.3)');
    root.style.setProperty('--color-icon-shadow-inset', 'rgba(255, 255, 255, 0.3)');
  }

  updateBox();
  updatePanel();
  updateIcon();
  syncSliders();
}

export function handleSystemThemeChange() {
  if (themeState.source === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(prefersDark.matches ? 'dark' : 'light');
  }
}

export function initTheme() {
  const savedThemeSource = localStorage.getItem('themeSource');

  if (savedThemeSource === 'light' || savedThemeSource === 'dark') {
    themeState.source = savedThemeSource;
    applyTheme(savedThemeSource);
  } else {
    themeState.source = 'system';
    handleSystemThemeChange();
  }
}