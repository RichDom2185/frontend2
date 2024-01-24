import { LanguageConfig, LanguageGroup } from '../../types/languages';
import { Chapter, Variant } from 'js-slang/dist/types';

const pySubLanguages: Array<Pick<LanguageConfig, 'chapter' | 'variant' | 'displayName'>> = [
  { chapter: Chapter.PYTHON_1, variant: Variant.DEFAULT, displayName: 'Python \xa71' },
  //{ chapter: Chapter.PYTHON_2, variant: Variant.DEFAULT, displayName: 'Python \xa72' },
  //{ chapter: Chapter.PYTHON_3, variant: Variant.DEFAULT, displayName: 'Python \xa73' },
  //{ chapter: Chapter.PYTHON_4, variant: Variant.DEFAULT, displayName: 'Python \xa74' }
  //{ chapter: Chapter.FULL_PYTHON, variant: Variant.DEFAULT, displayName: 'Full Python' }
];

export const pyLanguages: LanguageConfig[] = pySubLanguages.map(sublang => {
  return { ...sublang, group: LanguageGroup.PYTHON, supports: { repl: true } };
});
