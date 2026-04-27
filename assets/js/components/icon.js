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

    function setTransformOriginToIcon() {
      const iconRect = controlsIcon.getBoundingClientRect();
      const panelRect = controls.getBoundingClientRect();
      const originX = ((iconRect.left + iconRect.width / 2) - panelRect.left) / panelRect.width * 100;
      const originY = ((iconRect.top + iconRect.height / 2) - panelRect.top) / panelRect.height * 100;
      controls.style.transformOrigin = `${originX}% ${originY}%`;
    }

    function openPanel() {
      controls.style.display = 'block';

      requestAnimationFrame(() => {
        setTransformOriginToIcon();
        controls.style.transform = 'scale(0.4)';
        controls.style.opacity = '0';

        requestAnimationFrame(() => {
          controls.style.transform = '';
          controls.style.opacity = '';
          controls.classList.add('open');
        });
      });

      controlsIcon.style.transition = 'transform 0.3s cubic-bezier(0.25,1,0.5,1), opacity 0.3s ease';
      controlsIcon.style.transform = 'scale(0.7) rotate(45deg)';
      controlsIcon.style.opacity = '0';
      controlsIcon.style.pointerEvents = 'none';
    }

    function closePanel() {
      setTransformOriginToIcon();
      controls.classList.remove('open');

      setTimeout(() => {
        controls.style.display = 'none';
        controls.style.transform = '';
        controls.style.opacity = '';
      }, 350);

      controlsIcon.style.pointerEvents = 'auto';
      controlsIcon.style.transform = 'scale(1) rotate(0deg)';
      controlsIcon.style.opacity = '1';
    }

    controlsIcon.addEventListener('click', openPanel);
    closeControls.addEventListener('click', closePanel);
  }
}