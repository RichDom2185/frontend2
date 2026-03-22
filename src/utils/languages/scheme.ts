import { LanguageConfig, LanguageGroup } from '../../types/languages';

const schemeSubLanguages: Array<Pick<LanguageConfig, 'chapter' | 'variant' | 'displayName'>> = [
  // Scheme has been removed from js-slang to use conductor
];

export const schemeLanguages: LanguageConfig[] = schemeSubLanguages.map(sublang => {
  return { ...sublang, group: LanguageGroup.SCHEME, supports: { repl: true } };
});
