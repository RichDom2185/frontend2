import FileSystemViewContextMenu from './FileSystemViewContextMenu';
import FileSystemViewIndentationPadding from './FileSystemViewIndentationPadding';
import FileSystemViewList from './FileSystemViewList';
import FileSystemViewPlaceholderNode from './FileSystemViewPlaceholderNode';
import { WorkspaceLocation } from 'src/types/store/workspaces';
import { showSimpleErrorDialog } from 'src/utils/DialogHelper';
import { useAppSelector } from 'src/utils/hooks';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import path from 'path';
import { useState } from 'react';

import classes from 'src/styles/FileSystemView.module.scss';

export type FileSystemViewProps = {
  workspaceLocation: WorkspaceLocation;
  basePath: string;
};

const FileSystemView: React.FC<FileSystemViewProps> = (props: FileSystemViewProps) => {
  const { workspaceLocation, basePath } = props;
  const fileSystem = useAppSelector(state => state.fileSystem.inBrowserFileSystem);

  const [isAddingNewFile, setIsAddingNewFile] = useState<boolean>(false);
  const [isAddingNewDirectory, setIsAddingNewDirectory] = useState<boolean>(false);
  const [fileSystemViewListKey, setFileSystemViewListKey] = useState<number>(0);

  const handleCreateNewFile = () => setIsAddingNewFile(true);
  const handleCreateNewDirectory = () => setIsAddingNewDirectory(true);
  // Forcibly re-render any child components in which the value `key` is passed as the prop `key`.
  // See https://github.com/source-academy/frontend/wiki/File-System#handling-file-system-updates.
  const forceRefreshFileSystemViewList = () =>
    setFileSystemViewListKey((fileSystemViewListKey + 1) % 2);

  if (fileSystem === null) {
    return <div className={classes['file-system-view-error']}>Unable to load file system.</div>;
  }

  const createNewFile = (fileName: string) => {
    const newFilePath = path.join(basePath, fileName);

    // Check whether the new file path already exists to prevent overwriting of existing files & directories.
    fileSystem.exists(newFilePath, newFilePathExists => {
      if (newFilePathExists) {
        showSimpleErrorDialog({
          title: 'Unable to create file',
          contents: (
            <p>
              A file or folder <b>{fileName}</b> already exists in this location. Please choose a
              different name.
            </p>
          ),
          label: 'OK',
        }).then(() => {});
        return;
      }

      fileSystem.writeFile(newFilePath, '', err => {
        if (err) {
          console.error(err);
        }

        forceRefreshFileSystemViewList();
      });
    });
  };
  const createNewDirectory = (directoryName: string) => {
    const newDirectoryPath = path.join(basePath, directoryName);

    // Check whether the new directory path already exists to prevent overwriting of existing files & directories.
    fileSystem.exists(newDirectoryPath, newDirectoryPathExists => {
      if (newDirectoryPathExists) {
        showSimpleErrorDialog({
          title: 'Unable to create directory',
          contents: (
            <p>
              A file or folder <b>{directoryName}</b> already exists in this location. Please choose
              a different name.
            </p>
          ),
          label: 'OK',
        }).then(() => {});
        return;
      }

      fileSystem.mkdir(newDirectoryPath, 777, err => {
        if (err) {
          console.error(err);
        }

        forceRefreshFileSystemViewList();
      });
    });
  };

  return (
    <div className={classes['file-system-view-container']}>
      <FileSystemViewList
        workspaceLocation={workspaceLocation}
        key={fileSystemViewListKey}
        fileSystem={fileSystem}
        basePath={basePath}
        indentationLevel={0}
      />
      {isAddingNewFile && (
        <div className={classes['file-system-view-node-container']}>
          <FileSystemViewIndentationPadding indentationLevel={0} />
          <Icon icon={IconNames.DOCUMENT} />
          <FileSystemViewPlaceholderNode
            processFileName={createNewFile}
            removePlaceholder={() => setIsAddingNewFile(false)}
          />
        </div>
      )}
      {isAddingNewDirectory && (
        <div className={classes['file-system-view-node-container']}>
          <FileSystemViewIndentationPadding indentationLevel={0} />
          <Icon icon={IconNames.CHEVRON_RIGHT} />
          <FileSystemViewPlaceholderNode
            processFileName={createNewDirectory}
            removePlaceholder={() => setIsAddingNewDirectory(false)}
          />
        </div>
      )}
      <FileSystemViewContextMenu
        className={classes['file-system-view-empty-space']}
        createNewFile={handleCreateNewFile}
        createNewDirectory={handleCreateNewDirectory}
      />
    </div>
  );
};

export default FileSystemView;
