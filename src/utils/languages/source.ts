import {
  LanguageConfig,
  LanguageFeatures,
  LanguageGroup,
  variantDisplay,
} from '../../types/languages';
import { Chapter, Variant } from 'js-slang/dist/types';

const sourceSubLanguages: Array<Pick<LanguageConfig, 'chapter' | 'variant'>> = [
  { chapter: Chapter.SOURCE_1, variant: Variant.DEFAULT },
  { chapter: Chapter.SOURCE_1, variant: Variant.TYPED },
  { chapter: Chapter.SOURCE_1, variant: Variant.WASM },
  { chapter: Chapter.SOURCE_1, variant: Variant.NATIVE },

  { chapter: Chapter.SOURCE_2, variant: Variant.DEFAULT },
  { chapter: Chapter.SOURCE_2, variant: Variant.TYPED },
  { chapter: Chapter.SOURCE_2, variant: Variant.NATIVE },

  { chapter: Chapter.SOURCE_3, variant: Variant.DEFAULT },
  { chapter: Chapter.SOURCE_3, variant: Variant.TYPED },
  { chapter: Chapter.SOURCE_3, variant: Variant.NATIVE },

  { chapter: Chapter.SOURCE_4, variant: Variant.DEFAULT },
  { chapter: Chapter.SOURCE_4, variant: Variant.TYPED },
  { chapter: Chapter.SOURCE_4, variant: Variant.NATIVE },
  { chapter: Chapter.SOURCE_4, variant: Variant.EXPLICIT_CONTROL },
];

export const sourceLanguages: LanguageConfig[] = sourceSubLanguages.map(sublang => {
  const { chapter, variant } = sublang;
  const supportedFeatures: LanguageFeatures = {};

  // Local imports/exports require Source 2+ as Source 1 does not have lists.
  supportedFeatures.multiFile = chapter >= Chapter.SOURCE_2;
  supportedFeatures.repl = true;

  return {
    ...sublang,
    group: LanguageGroup.JAVASCRIPT,
    displayName: `Source \xa7${chapter} ${variantDisplay[variant]}`.trim(),
    supports: supportedFeatures,
  };
});

export const fullJsLanguage: LanguageConfig = {
  group: LanguageGroup.JAVASCRIPT,
  displayName: 'Full JavaScript',
  chapter: Chapter.FULL_JS,
  variant: Variant.DEFAULT,
  supports: { repl: true },
};

export const fullTsLanguage: LanguageConfig = {
  group: LanguageGroup.JAVASCRIPT,
  displayName: 'Full TypeScript',
  chapter: Chapter.FULL_TS,
  variant: Variant.DEFAULT,
  supports: { repl: true },
};

export const htmlLanguage: LanguageConfig = {
  group: LanguageGroup.JAVASCRIPT,
  displayName: 'HTML',
  chapter: Chapter.HTML,
  variant: Variant.DEFAULT,
  supports: {},
};
