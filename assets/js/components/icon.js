import { hexToRgb, makeDraggable } from '../core/utils.js';
import { updateSliderFill, syncSliders } from '../core/sliders.js';
import { getElements } from '../core/elements.js';
import { getEffectiveTheme } from '../core/themeState.js';

export function updateIcon() {
  const { controlsIcon, iconColor, iconBg, iconTransparency, iconBlur, iconRadius, iconBorderColor, iconBorderWidth } = getElements();
  const iconSvg = controlsIcon ? controlsIcon.querySelector('svg') : null;

  if (iconSvg && iconColor) iconSvg.style.color = iconColor.value;

  if (controlsIcon && iconBg) {
    controlsIcon.style.setProperty('--color-icon-bg-base', hexToRgb(iconBg.value));
    controlsIcon.style.backgroundColor = `rgba(${hexToRgb(iconBg.value)}, ${iconTransparency.value / 100})`;
  }

  if (controlsIcon && iconBlur) controlsIcon.style.backdropFilter = `blur(${iconBlur.value}px)`;
  if (controlsIcon && iconRadius) controlsIcon.style.borderRadius = iconRadius.value + 'px';

  if (controlsIcon && iconBorderColor && iconBorderWidth) {
    controlsIcon.style.border = iconBorderWidth.value > 0
      ? `${iconBorderWidth.value}px solid ${iconBorderColor.value}`
      : 'none';
  }
}

export function initIcon() {
  const { controlsIcon, controls, closeControls, iconColor, iconBg, iconTransparency, iconBlur, iconRadius, iconBorderColor, iconBorderWidth, resetIconBtn } = getElements();

  if (iconColor && iconBg && iconTransparency && iconBlur && iconRadius) {
    [iconColor, iconBg, iconTransparency, iconBlur, iconRadius, iconBorderColor, iconBorderWidth].forEach(input => {
      input.addEventListener('input', () => {
        updateIcon();
        if (input.type === 'range') updateSliderFill(input);
      });
    });
  }

  if (resetIconBtn) {
    resetIconBtn.addEventListener('click', () => {
      if (getEffectiveTheme() === 'dark') {
        if (iconColor) iconColor.value = '#ffffff';
        if (iconBg) iconBg.value = '#111111';
        if (iconTransparency) iconTransparency.value = 50;
        if (iconBlur) iconBlur.value = 12;
      } else {
        if (iconColor) iconColor.value = '#ffffff';
        if (iconBg) iconBg.value = '#ffffff';
        if (iconTransparency) iconTransparency.value = 5;
        if (iconBlur) iconBlur.value = 3;
      }

      if (iconRadius) iconRadius.value = 50;
      if (iconBorderColor) iconBorderColor.value = '#ffffff';
      if (iconBorderWidth) iconBorderWidth.value = 0;

      updateIcon();
      syncSliders();
    });
  }

  if (controlsIcon && controls) {
    makeDraggable(controlsIcon);

    const DURATION = 320;
    const CLOSE_DURATION = 160;
    const EASING = 'cubic-bezier(0.25, 1, 0.5, 1)';
    let isOpen = false;
    let currentAnim = null;

    function positionNearIcon() {
      const iconRect = controlsIcon.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const panelW = controls.offsetWidth;
      const panelH = controls.offsetHeight;

      const iconCx = iconRect.left + iconRect.width / 2;
      const iconCy = iconRect.top + iconRect.height / 2;

      const gap = 12;
      let left = iconRect.right + gap;
      let top = iconRect.top;

      if (left + panelW > vw - 8) {
        left = iconRect.left - panelW - gap;
      }
      if (left < 8) {
        left = Math.max(8, iconCx - panelW / 2);
      }
      if (top + panelH > vh - 8) {
        top = vh - panelH - 8;
      }
      if (top < 8) {
        top = 8;
      }

      controls.style.left = left + 'px';
      controls.style.top = top + 'px';
      controls.style.transform = 'none';
    }

    function getIconOrigin() {
      const iconRect = controlsIcon.getBoundingClientRect();
      const panelRect = controls.getBoundingClientRect();
      const iconCx = iconRect.left + iconRect.width / 2;
      const iconCy = iconRect.top + iconRect.height / 2;
      const ox = iconCx - panelRect.left;
      const oy = iconCy - panelRect.top;
      return `${ox}px ${oy}px`;
    }

    function openPanel() {
      if (isOpen) return;
      isOpen = true;

      if (currentAnim) currentAnim.cancel();

      controls.style.visibility = 'hidden';
      controls.style.display = 'flex';
      controls.classList.add('open');

      void controls.offsetWidth;

      positionNearIcon();

      void controls.offsetWidth;

      const origin = getIconOrigin();
      controls.style.transformOrigin = origin;
      controls.style.visibility = '';

      currentAnim = controls.animate(
        [
          { transform: 'scale(0.3)', opacity: '0' },
          { transform: 'scale(1)',   opacity: '1' }
        ],
        { duration: DURATION, easing: EASING, fill: 'forwards' }
      );

      currentAnim.onfinish = () => {
        controls.style.transform = 'none';
        controls.style.opacity = '';
        currentAnim = null;
      };
    }

    function closePanel() {
      if (!isOpen) return;
      isOpen = false;

      if (currentAnim) currentAnim.cancel();

      const origin = getIconOrigin();
      controls.style.transformOrigin = origin;

      currentAnim = controls.animate(
        [
          { transform: 'scale(1)',   opacity: '1' },
          { transform: 'scale(0.3)', opacity: '0' }
        ],
        { duration: CLOSE_DURATION, easing: 'ease-in', fill: 'forwards' }
      );

      currentAnim.onfinish = () => {
        controls.style.display = 'none';
        controls.style.transform = 'none';
        controls.style.opacity = '';
        controls.classList.remove('open');
        currentAnim = null;
      };
    }

    controlsIcon.addEventListener('click', () => isOpen ? closePanel() : openPanel());
    closeControls.addEventListener('click', closePanel);
  }
}