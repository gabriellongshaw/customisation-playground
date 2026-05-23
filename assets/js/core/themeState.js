export const themeState = { source: 'system' };

export function setThemeSource(source) {
  themeState.source = source;
}

export function getEffectiveTheme() {
  if (themeState.source === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return themeState.source;
}