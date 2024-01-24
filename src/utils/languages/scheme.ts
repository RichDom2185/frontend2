import { LanguageConfig, LanguageGroup } from '../../types/languages';
import { Chapter, Variant } from 'js-slang/dist/types';

const schemeSubLanguages: Array<Pick<LanguageConfig, 'chapter' | 'variant' | 'displayName'>> = [
  { chapter: Chapter.SCHEME_1, variant: Variant.DEFAULT, displayName: 'Scheme \xa71' },
  { chapter: Chapter.SCHEME_2, variant: Variant.DEFAULT, displayName: 'Scheme \xa72' },
  { chapter: Chapter.SCHEME_3, variant: Variant.DEFAULT, displayName: 'Scheme \xa73' },
  { chapter: Chapter.SCHEME_4, variant: Variant.DEFAULT, displayName: 'Scheme \xa74' },
  { chapter: Chapter.FULL_SCHEME, variant: Variant.DEFAULT, displayName: 'Full Scheme' },
];

export const schemeLanguages: LanguageConfig[] = schemeSubLanguages.map(sublang => {
  return { ...sublang, group: LanguageGroup.SCHEME, supports: { repl: true } };
});
