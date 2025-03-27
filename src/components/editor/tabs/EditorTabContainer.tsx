import { getShortestUniqueFilePaths } from '../../../utils/editor/tabs';
import EditorTab from './EditorTab';
import { Button, Tooltip } from '@blueprintjs/core';

import classes from 'src/styles/EditorTab.module.scss';

type Props = {
  baseFilePath: string;
  filePaths: string[];
  activeEditorTabIndex: number;
  setActiveEditorTabIndex: (activeEditorTabIndex: number | null) => void;
  removeEditorTabByIndex: (editorTabIndex: number) => void;
  /** Will only show menu button when defined */
  onMenuButtonClick?: () => void;
};

const EditorTabContainer: React.FC<Props> = ({
  baseFilePath,
  filePaths,
  activeEditorTabIndex,
  setActiveEditorTabIndex,
  removeEditorTabByIndex,
  onMenuButtonClick,
}) => {
  const handleHorizontalScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY,
    });
  };

  const relativeFilePaths = filePaths.map(filePath => filePath.replace(baseFilePath, ''));
  const shortenedFilePaths = getShortestUniqueFilePaths(relativeFilePaths);

  return (
    <div className={classes['editor-tab-container']} onWheel={handleHorizontalScroll}>
      {onMenuButtonClick && (
        <Tooltip content="Show/Hide File Explorer">
          <Button minimal icon="menu" onClick={onMenuButtonClick} />
        </Tooltip>
      )}
      {shortenedFilePaths.map((filePath, index) => (
        <EditorTab
          key={index}
          filePath={filePath}
          isActive={index === activeEditorTabIndex}
          setActive={() => setActiveEditorTabIndex(index)}
          remove={() => removeEditorTabByIndex(index)}
        />
      ))}
    </div>
  );
};

export default EditorTabContainer;
