import toc from 'src/resources/sicp/toc.json';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import { cloneDeep } from 'es-toolkit';
import { useNavigate } from 'react-router';
import { useCallback, useState } from 'react';

type TocProps = OwnProps;

type OwnProps = {
  handleCloseToc?: () => void;
};

/**
 * Table of contents of SICP.
 */
const SicpToc: React.FC<TocProps> = props => {
  const [sidebarContent, setSidebarContent] = useState(toc as TreeNodeInfo[]);
  const navigate = useNavigate();

  const handleNodeExpand = (_node: TreeNodeInfo, path: number[]) => {
    const newState = cloneDeep(sidebarContent);
    Tree.nodeFromPath(path, newState).isExpanded = true;
    setSidebarContent(newState);
  };

  const handleNodeCollapse = (_node: TreeNodeInfo, path: number[]) => {
    const newState = cloneDeep(sidebarContent);
    Tree.nodeFromPath(path, newState).isExpanded = false;
    setSidebarContent(newState);
  };

  const handleNodeClicked = useCallback(
    (node: TreeNodeInfo) => {
      props.handleCloseToc?.();
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      navigate('/sicp/' + String(node.nodeData));
    },
    [navigate, props]
  );

  return (
    <Tree
      contents={sidebarContent}
      onNodeClick={handleNodeClicked}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
    />
  );
};

export default SicpToc;
