import { IconName } from '@blueprintjs/core';

export type TabId =
  | 'editor'
  | 'sideContentStepper'
  | 'sideContentCseMachine'
  | 'sideContentRemoteExecution';

export const tabIdToIconMap = Object.freeze({
  editor: 'code',
  sideContentStepper: 'flow-review',
  sideContentCseMachine: 'diagram-tree',
  sideContentRemoteExecution: 'satellite',
}) satisfies Record<TabId, IconName>;

export const tabIdToLabelMap = Object.freeze({
  editor: 'Editor',
  sideContentStepper: 'Stepper',
  sideContentCseMachine: 'CSE Machine',
  sideContentRemoteExecution: 'Remote Execution',
}) satisfies Record<TabId, string>;
