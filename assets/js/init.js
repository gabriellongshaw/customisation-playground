import { getElements } from './core/elements.js';
import { makeDraggable } from './core/utils.js';
import { syncSliders } from './core/sliders.js';
import { initTheme } from './core/theme.js';
import { initBox } from './components/box.js';
import { initPanel } from './components/panel.js';
import { initIcon } from './components/icon.js';
import { initTabs } from './components/tabs.js';
import { initThemeControls } from './components/themeControls.js';

const { box, controlsIcon, controls, resetBtn, resetPanelBtn, resetIconBtn } = getElements();

initBox();
initPanel();
initIcon();
initTabs();
initThemeControls();

makeDraggable(box);
makeDraggable(controlsIcon);
makeDraggable(controls);

resetBtn.click();
resetPanelBtn.click();
if (resetIconBtn) resetIconBtn.click();

syncSliders();
initTheme();
