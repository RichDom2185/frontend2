import Constants from '../constants';
import { pyLanguages } from './python';
import { schemeLanguages } from './scheme';
import { fullJsLanguage, fullTsLanguage, htmlLanguage, sourceLanguages } from './source';
import { LanguageConfig } from 'src/types/languages';

const enabledLanguages: LanguageConfig[] = [];

if (Constants.featureFlags.enableSource) {
  enabledLanguages.push(...sourceLanguages);
}

if (Constants.featureFlags.enableFullJs) {
  enabledLanguages.push(fullJsLanguage);
}
if (Constants.featureFlags.enableFullTs) {
  enabledLanguages.push(fullTsLanguage);
}
if (Constants.featureFlags.enableHtml) {
  enabledLanguages.push(htmlLanguage);
}

export const allLanguages = enabledLanguages.concat(
  Constants.featureFlags.enablePython ? pyLanguages : [],
  Constants.featureFlags.enableScheme ? schemeLanguages : []
);

// Re-export all languages
export * from './source';
export * from './python';
export * from './scheme';
