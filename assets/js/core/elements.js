let els = null;

export function getElements() {
  if (els) return els;

  els = {
    box: document.getElementById('box'),
    controls: document.getElementById('controlsBox'),
    closeControls: document.getElementById('closeControls'),
    controlsIcon: document.getElementById('controlsIcon'),
    body: document.body,
    root: document.documentElement,
    boxText: document.getElementById('boxText'),
    bgColor: document.getElementById('bgColor'),
    textColor: document.getElementById('textColor'),
    boxWidth: document.getElementById('boxWidth'),
    borderRadius: document.getElementById('borderRadius'),
    blur: document.getElementById('blur'),
    transparency: document.getElementById('transparency'),
    resetBtn: document.getElementById('resetBtn'),
    panelBg: document.getElementById('panelBg'),
    panelText: document.getElementById('panelText'),
    panelWidth: document.getElementById('panelWidth'),
    panelRadius: document.getElementById('panelRadius'),
    panelBlur: document.getElementById('panelBlur'),
    panelTransparency: document.getElementById('panelTransparency'),
    resetPanelBtn: document.getElementById('resetPanelBtn'),
    tabGeneralBtn: document.getElementById('tabGeneral'),
    tabBoxBtn: document.getElementById('tabBox'),
    tabControlsBtn: document.getElementById('tabControls'),
    tabIconBtn: document.getElementById('tabIcon'),
    generalSettings: document.getElementById('generalSettings'),
    boxSettings: document.getElementById('boxSettings'),
    panelSettings: document.getElementById('panelSettings'),
    iconSettings: document.getElementById('iconSettings'),
    iconColor: document.getElementById('iconColor'),
    iconBg: document.getElementById('iconBg'),
    iconTransparency: document.getElementById('iconTransparency'),
    iconBlur: document.getElementById('iconBlur'),
    iconRadius: document.getElementById('iconRadius'),
    resetIconBtn: document.getElementById('resetIconBtn'),
    lightModeBtn: document.getElementById('lightModeBtn'),
    darkModeBtn: document.getElementById('darkModeBtn'),
    resetAllBtn: document.getElementById('resetAllBtn'),
  };

  return els;
}
