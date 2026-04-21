import { getElements } from '../core/elements.js';

function showOnly(elToShow) {
  const { generalSettings, boxSettings, panelSettings, iconSettings } = getElements();
  const allTabs = [generalSettings, boxSettings, panelSettings, iconSettings];

  allTabs.filter(el => el !== elToShow).forEach(el => {
    if (!el) return;
    if (el.style.display !== 'none') {
      el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
      el.style.maxHeight = '0';
      el.style.opacity = '0';
      setTimeout(() => { el.style.display = 'none'; }, 200);
    }
  });

  if (elToShow) {
    elToShow.style.display = 'block';
    elToShow.style.maxHeight = '0';
    elToShow.style.opacity = '0';
    requestAnimationFrame(() => {
      elToShow.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      elToShow.style.maxHeight = elToShow.scrollHeight + 'px';
      elToShow.style.opacity = '1';
    });
  }
}

function setActiveTab(btn) {
  const { tabGeneralBtn, tabBoxBtn, tabControlsBtn, tabIconBtn } = getElements();
  [tabGeneralBtn, tabBoxBtn, tabControlsBtn, tabIconBtn].forEach(b => b && b.classList.remove('active'));
  btn && btn.classList.add('active');
}

export function initTabs() {
  const { tabGeneralBtn, tabBoxBtn, tabControlsBtn, tabIconBtn,
    generalSettings, boxSettings, panelSettings, iconSettings } = getElements();

  setActiveTab(tabGeneralBtn);
  showOnly(generalSettings);

  if (tabGeneralBtn && generalSettings) {
    tabGeneralBtn.addEventListener('click', () => {
      setActiveTab(tabGeneralBtn);
      showOnly(generalSettings);
    });
  }

  tabBoxBtn.addEventListener('click', () => {
    setActiveTab(tabBoxBtn);
    showOnly(boxSettings);
  });

  tabControlsBtn.addEventListener('click', () => {
    setActiveTab(tabControlsBtn);
    showOnly(panelSettings);
  });

  if (tabIconBtn && iconSettings) {
    tabIconBtn.addEventListener('click', () => {
      setActiveTab(tabIconBtn);
      showOnly(iconSettings);
    });
  }
}
