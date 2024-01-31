export type EditorFile = {
  name: string;
  code: string;
  highlightedLines: number[];
  highlightedLinesColour: string;
  readonly: boolean;
};
