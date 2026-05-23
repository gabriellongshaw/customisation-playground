import { getElements } from '../core/elements.js';
import { updateBox } from './box.js';
import { updatePanel } from './panel.js';
import { updateIcon } from './icon.js';
import { syncSliders } from '../core/sliders.js';
import { getBgState, setBgState } from './background.js';

const STORAGE_KEY = 'customisation-playground-settings';

function gatherSettings() {
  const { boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency, boxBorderColor, boxBorderWidth,
    panelBg, panelText, panelWidth, panelHeight, panelRadius, panelBlur, panelTransparency, panelBorderColor, panelBorderWidth,
    iconColor, iconBg, iconTransparency, iconBlur, iconRadius, iconBorderColor, iconBorderWidth } = getElements();

  return {
    box: {
      text: boxText.value,
      bgColor: bgColor.value,
      textColor: textColor.value,
      width: boxWidth.value,
      borderRadius: borderRadius.value,
      blur: blur.value,
      transparency: transparency.value,
      borderColor: boxBorderColor.value,
      borderWidth: boxBorderWidth.value,
    },
    panel: {
      bg: panelBg.value,
      text: panelText.value,
      width: panelWidth.value,
      height: panelHeight.value,
      radius: panelRadius.value,
      blur: panelBlur.value,
      transparency: panelTransparency.value,
      borderColor: panelBorderColor.value,
      borderWidth: panelBorderWidth.value,
    },
    icon: {
      color: iconColor.value,
      bg: iconBg.value,
      transparency: iconTransparency.value,
      blur: iconBlur.value,
      radius: iconRadius.value,
      borderColor: iconBorderColor.value,
      borderWidth: iconBorderWidth.value,
    },
    background: getBgState(),
  };
}

function applySettings(s) {
  const { boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency, boxBorderColor, boxBorderWidth,
    panelBg, panelText, panelWidth, panelHeight, panelRadius, panelBlur, panelTransparency, panelBorderColor, panelBorderWidth,
    iconColor, iconBg, iconTransparency, iconBlur, iconRadius, iconBorderColor, iconBorderWidth } = getElements();

  if (s.box) {
    boxText.value = s.box.text ?? boxText.value;
    bgColor.value = s.box.bgColor ?? bgColor.value;
    textColor.value = s.box.textColor ?? textColor.value;
    boxWidth.value = s.box.width ?? boxWidth.value;
    borderRadius.value = s.box.borderRadius ?? borderRadius.value;
    blur.value = s.box.blur ?? blur.value;
    transparency.value = s.box.transparency ?? transparency.value;
    boxBorderColor.value = s.box.borderColor ?? boxBorderColor.value;
    boxBorderWidth.value = s.box.borderWidth ?? boxBorderWidth.value;
    updateBox();
  }

  if (s.panel) {
    panelBg.value = s.panel.bg ?? panelBg.value;
    panelText.value = s.panel.text ?? panelText.value;
    panelWidth.value = s.panel.width ?? panelWidth.value;
    panelHeight.value = s.panel.height ?? panelHeight.value;
    panelRadius.value = s.panel.radius ?? panelRadius.value;
    panelBlur.value = s.panel.blur ?? panelBlur.value;
    panelTransparency.value = s.panel.transparency ?? panelTransparency.value;
    panelBorderColor.value = s.panel.borderColor ?? panelBorderColor.value;
    panelBorderWidth.value = s.panel.borderWidth ?? panelBorderWidth.value;
    updatePanel();
  }

  if (s.icon) {
    iconColor.value = s.icon.color ?? iconColor.value;
    iconBg.value = s.icon.bg ?? iconBg.value;
    iconTransparency.value = s.icon.transparency ?? iconTransparency.value;
    iconBlur.value = s.icon.blur ?? iconBlur.value;
    iconRadius.value = s.icon.radius ?? iconRadius.value;
    iconBorderColor.value = s.icon.borderColor ?? iconBorderColor.value;
    iconBorderWidth.value = s.icon.borderWidth ?? iconBorderWidth.value;
    updateIcon();
  }

  if (s.background) {
    setBgState(s.background);
  }

  syncSliders();
}

function flashBtn(btn, msg) {
  const label = btn.querySelector('.btn-label');
  if (!label) return;
  label.classList.add('hide');
  setTimeout(() => {
    label.textContent = msg;
    label.classList.remove('hide');
    setTimeout(() => {
      label.classList.add('hide');
      setTimeout(() => {
        label.textContent = btn.dataset.originalLabel;
        label.classList.remove('hide');
      }, 150);
    }, 1100);
  }, 150);
}

export function initSaveLoad() {
  const { saveSettingsBtn, loadSettingsBtn, clearSettingsBtn } = getElements();

  [saveSettingsBtn, loadSettingsBtn, clearSettingsBtn].forEach(btn => {
    if (!btn) return;
    const label = document.createElement('span');
    label.className = 'btn-label';
    label.textContent = btn.textContent.trim();
    btn.dataset.originalLabel = btn.textContent.trim();
    btn.textContent = '';
    btn.appendChild(label);
  });

  saveSettingsBtn && saveSettingsBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gatherSettings()));
    flashBtn(saveSettingsBtn, 'Saved!');
  });

  loadSettingsBtn && loadSettingsBtn.addEventListener('click', () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      flashBtn(loadSettingsBtn, 'Nothing saved yet');
      return;
    }
    try {
      applySettings(JSON.parse(raw));
      flashBtn(loadSettingsBtn, 'Loaded!');
    } catch (_) {}
  });

  clearSettingsBtn && clearSettingsBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    flashBtn(clearSettingsBtn, 'Cleared!');
  });
}