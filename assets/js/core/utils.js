export function hexToRgb(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `${r}, ${g}, ${b}`;
}

export function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;
  let isPanelDrag = false;
  const isControlsPanel = el.id === 'controlsBox';
  let hasMoved = false;

  el.addEventListener('mousedown', start);
  el.addEventListener('touchstart', start, { passive: true });

  function start(e) {
    const target = e.target;

    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'BUTTON' || target.closest('.controls-content-wrapper')) return;

    if (isControlsPanel) {
      const header = el.querySelector('.controls-header');
      if (!header || !header.contains(target)) {
        isPanelDrag = false;
        return;
      }
      isPanelDrag = true;
    }

    isDragging = true;
    hasMoved = false;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', end);
  }

  function move(e) {
    if (!isDragging) return;
    if (isControlsPanel && !isPanelDrag) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    el.style.left = clientX - offsetX + 'px';
    el.style.top = clientY - offsetY + 'px';
    el.style.transform = 'none';

    hasMoved = true;
    e.preventDefault();
  }

  function end(e) {
    if (hasMoved) {
      if (e.type === 'touchend' && e.target === el) {
        e.preventDefault();
      }
    }

    isDragging = false;
    isPanelDrag = false;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
  }
}