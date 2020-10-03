const settingsPath = (...suffix: readonly string[]) => ['settings', ...suffix];

export const THEME_NAME_PATH = settingsPath('theme');
