import { Language as SourceLanguage, Variant } from 'js-slang/dist/types';

export enum LanguageGroup {
  JAVASCRIPT = 'JavaScript',
  SCHEME = 'Scheme',
  PYTHON = 'Python',
}

// TODO: Remove Partial type when fully migrated
export type LanguageFeatures = Partial<{
  multiFile: boolean;
  repl: boolean;
}>;

/**
 * Language configuration object used app-wide. All references
 * to languages should be made through this object.
 *
 * Ideally, this should be part of js-slang, but since it is not,
 * this interface serves as a bridge and gatekeeper.
 */
export interface LanguageConfig extends SourceLanguage {
  /** The language's group when switching modes */
  group: LanguageGroup;
  /** The text that should be displayed in UI elements */
  displayName: string;
  /** Whether the language supports the given features */
  supports: LanguageFeatures;
}

export const variantDisplay: Record<Variant, string> = {
  [Variant.DEFAULT]: '',
  [Variant.TYPED]: 'Typed',
  [Variant.WASM]: 'WebAssembly',
  [Variant.NON_DET]: 'Non-Det',
  [Variant.CONCURRENT]: 'Concurrent',
  [Variant.LAZY]: 'Lazy',
  [Variant.GPU]: 'GPU',
  [Variant.NATIVE]: 'Native',
  [Variant.EXPLICIT_CONTROL]: 'Explicit-Control',
};
