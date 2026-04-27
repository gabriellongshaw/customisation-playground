import { hexToRgb, makeDraggable } from '../core/utils.js';
import { updateSliderFill, syncSliders } from '../core/sliders.js';
import { getElements } from '../core/elements.js';
import { getEffectiveTheme } from '../core/theme.js';

export function updateIcon() {
  const { controlsIcon, iconColor, iconBg, iconTransparency, iconBlur, iconRadius } = getElements();
  const iconSvg = controlsIcon ? controlsIcon.querySelector('svg') : null;

  if (iconSvg && iconColor) iconSvg.style.color = iconColor.value;

  if (controlsIcon && iconBg) {
    controlsIcon.style.setProperty('--color-icon-bg-base', hexToRgb(iconBg.value));
    controlsIcon.style.backgroundColor = `rgba(${hexToRgb(iconBg.value)}, ${iconTransparency.value / 100})`;
  }

  if (controlsIcon && iconBlur) controlsIcon.style.backdropFilter = `blur(${iconBlur.value}px)`;
  if (controlsIcon && iconRadius) controlsIcon.style.borderRadius = iconRadius.value + 'px';
}

export function initIcon() {
  const { controlsIcon, controls, closeControls, iconColor, iconBg, iconTransparency, iconBlur, iconRadius, resetIconBtn } = getElements();

  if (iconColor && iconBg && iconTransparency && iconBlur && iconRadius) {
    [iconColor, iconBg, iconTransparency, iconBlur, iconRadius].forEach(input => {
      input.addEventListener('input', () => {
        updateIcon();
        updateSliderFill(input);
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
    let currentIconAnim = null;

    function getOrigin() {
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
      if (currentIconAnim) currentIconAnim.cancel();

      controls.style.display = 'block';
      controls.classList.add('open');
      // Force a layout flush so getBoundingClientRect() in getOrigin() is accurate
      void controls.offsetWidth;

      currentIconAnim = controlsIcon.animate(
        [
          { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          { transform: 'scale(0.6) rotate(45deg)', opacity: '0' }
        ],
        { duration: DURATION * 0.7, easing: 'ease-in', fill: 'forwards' }
      );
      currentIconAnim.onfinish = () => {
        controlsIcon.style.opacity = '0';
        controlsIcon.style.pointerEvents = 'none';
        currentIconAnim = null;
      };
      controlsIcon.style.pointerEvents = 'none';

      const origin = getOrigin();
      controls.style.transformOrigin = origin;

      currentAnim = controls.animate(
        [
          { transform: 'scale(0.3)', opacity: '0' },
          { transform: 'scale(1)',   opacity: '1' }
        ],
        { duration: DURATION, easing: EASING, fill: 'forwards' }
      );

      currentAnim.onfinish = () => {
        controls.style.transform = '';
        controls.style.opacity = '';
        currentAnim = null;
      };
    }

    function closePanel() {
      if (!isOpen) return;
      isOpen = false;

      if (currentAnim) currentAnim.cancel();
      if (currentIconAnim) currentIconAnim.cancel();

      const origin = getOrigin();
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
        controls.style.transform = '';
        controls.style.opacity = '';
        controls.classList.remove('open');
        currentAnim = null;
      };

      controlsIcon.style.opacity = '';
      controlsIcon.style.pointerEvents = 'auto';
      currentIconAnim = controlsIcon.animate(
        [
          { transform: 'scale(0.6) rotate(45deg)', opacity: '0' },
          { transform: 'scale(1) rotate(0deg)',     opacity: '1' }
        ],
        { duration: CLOSE_DURATION, easing: EASING, fill: 'forwards' }
      );
      currentIconAnim.onfinish = () => {
        controlsIcon.style.transform = '';
        currentIconAnim = null;
      };
    }

    controlsIcon.addEventListener('click', openPanel);
    closeControls.addEventListener('click', closePanel);
  }
}