import { getElements } from '../core/elements.js';
import { applyTheme, handleSystemThemeChange, setThemeSource } from '../core/theme.js';

export function initThemeControls() {
  const { lightModeBtn, darkModeBtn, resetAllBtn, resetBtn, resetPanelBtn, resetIconBtn } = getElements();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (prefersDark.addEventListener) {
    prefersDark.addEventListener('change', handleSystemThemeChange);
  } else if (prefersDark.addListener) {
    prefersDark.addListener(handleSystemThemeChange);
  }

  if (lightModeBtn && darkModeBtn) {
    lightModeBtn.addEventListener('click', () => {
      setThemeSource('light');
      localStorage.setItem('themeSource', 'light');
      applyTheme('light');
    });

    darkModeBtn.addEventListener('click', () => {
      setThemeSource('dark');
      localStorage.setItem('themeSource', 'dark');
      applyTheme('dark');
    });
  }

  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      setThemeSource('system');
      localStorage.removeItem('themeSource');

      resetBtn.click();
      resetPanelBtn.click();
      if (resetIconBtn) resetIconBtn.click();

      handleSystemThemeChange();
    });
  }
}