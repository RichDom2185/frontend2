import FileSystemViewContextMenu from './FileSystemViewContextMenu';
import FileSystemViewFileName from './FileSystemViewFileName';
import FileSystemViewIndentationPadding from './FileSystemViewIndentationPadding';
import FileSystemViewList from './FileSystemViewList';
import FileSystemViewPlaceholderNode from './FileSystemViewPlaceholderNode';
import { WorkspaceLocation } from 'src/types/store/workspaces';
import { showSimpleConfirmDialog, showSimpleErrorDialog } from 'src/utils/DialogHelper';
import { rmdirRecursively } from 'src/utils/fileSystem/utils';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { FSModule } from 'browserfs/dist/node/core/FS';
import path from 'path';
import { useState } from 'react';

import classes from 'src/styles/FileSystemView.module.scss';

export type FileSystemViewDirectoryNodeProps = {
  workspaceLocation: WorkspaceLocation;
  fileSystem: FSModule;
  basePath: string;
  directoryName: string;
  indentationLevel: number;
  refreshParentDirectory: () => void;
};

const FileSystemViewDirectoryNode: React.FC<FileSystemViewDirectoryNodeProps> = (
  props: FileSystemViewDirectoryNodeProps
) => {
  const {
    workspaceLocation,
    fileSystem,
    basePath,
    directoryName,
    indentationLevel,
    refreshParentDirectory,
  } = props;
  const fullPath = path.join(basePath, directoryName);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNewFile, setIsAddingNewFile] = useState(false);
  const [isAddingNewDirectory, setIsAddingNewDirectory] = useState(false);
  const [fileSystemViewListKey, setFileSystemViewListKey] = useState(0);
  // const dispatch = useDispatch();

  const toggleIsExpanded = () => {
    if (isEditing) {
      return;
    }
    setIsExpanded(!isExpanded);
  };
  const handleCreateNewFile = () => {
    setIsExpanded(true);
    setIsAddingNewFile(true);
  };
  const handleCreateNewDirectory = () => {
    setIsExpanded(true);
    setIsAddingNewDirectory(true);
  };
  const handleRenameDirectory = () => setIsEditing(true);
  const handleRemoveDirectory = () => {
    showSimpleConfirmDialog({
      icon: 'warning-sign',
      title: `Are you sure you want to delete '${directoryName}' and its contents?`,
      contents: (
        <p>
          This will result in all of its contained files & subdirectories being deleted. Once a
          directory is deleted, its contents cannot be recovered!
          <br />
          <br />
          <strong>Do you still want to proceed?</strong>
        </p>
      ),
      positiveIntent: 'danger',
      positiveLabel: 'Proceed',
      negativeLabel: 'Cancel',
    }).then((shouldProceed: boolean) => {
      if (!shouldProceed) {
        return;
      }

      // dispatch(removeEditorTabsForDirectory(workspaceLocation, fullPath));
      rmdirRecursively(fileSystem, fullPath).then(refreshParentDirectory);
    });
  };
  // Forcibly re-render any child components in which the value `key` is passed as the prop `key`.
  // See https://github.com/source-academy/frontend/wiki/File-System#handling-file-system-updates.
  const forceRefreshFileSystemViewList = () =>
    setFileSystemViewListKey((fileSystemViewListKey + 1) % 2);

  const createNewFile = (fileName: string) => {
    const newFilePath = path.join(basePath, directoryName, fileName);

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
  const createNewDirectory = (subdirectoryName: string) => {
    const newDirectoryPath = path.join(basePath, directoryName, subdirectoryName);

    // Check whether the new directory path already exists to prevent overwriting of existing files & directories.
    fileSystem.exists(newDirectoryPath, newDirectoryPathExists => {
      if (newDirectoryPathExists) {
        showSimpleErrorDialog({
          title: 'Unable to create directory',
          contents: (
            <p>
              A file or folder <b>{subdirectoryName}</b> already exists in this location. Please
              choose a different name.
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
    <div className={classes['file-system-view-directory-node-container']}>
      <FileSystemViewContextMenu
        createNewFile={handleCreateNewFile}
        createNewDirectory={handleCreateNewDirectory}
        rename={handleRenameDirectory}
        remove={handleRemoveDirectory}
      >
        <div className={classes['file-system-view-node-container']} onClick={toggleIsExpanded}>
          <FileSystemViewIndentationPadding indentationLevel={indentationLevel} />
          {isExpanded && <Icon icon={IconNames.CHEVRON_DOWN} />}
          {!isExpanded && <Icon icon={IconNames.CHEVRON_RIGHT} />}
          <FileSystemViewFileName
            workspaceLocation={workspaceLocation}
            fileSystem={fileSystem}
            basePath={basePath}
            fileName={directoryName}
            isDirectory
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            refreshDirectory={refreshParentDirectory}
          />
        </div>
      </FileSystemViewContextMenu>
      {isAddingNewFile && (
        <div className={classes['file-system-view-node-container']}>
          <FileSystemViewIndentationPadding indentationLevel={indentationLevel + 1} />
          <Icon icon={IconNames.DOCUMENT} />
          <FileSystemViewPlaceholderNode
            processFileName={createNewFile}
            removePlaceholder={() => setIsAddingNewFile(false)}
          />
        </div>
      )}
      {isAddingNewDirectory && (
        <div className={classes['file-system-view-node-container']}>
          <FileSystemViewIndentationPadding indentationLevel={indentationLevel + 1} />
          <Icon icon={IconNames.CHEVRON_RIGHT} />
          <FileSystemViewPlaceholderNode
            processFileName={createNewDirectory}
            removePlaceholder={() => setIsAddingNewDirectory(false)}
          />
        </div>
      )}
      {isExpanded && (
        <FileSystemViewList
          workspaceLocation={workspaceLocation}
          key={fileSystemViewListKey}
          fileSystem={fileSystem}
          basePath={fullPath}
          indentationLevel={indentationLevel + 1}
        />
      )}
    </div>
  );
};

export default FileSystemViewDirectoryNode;
