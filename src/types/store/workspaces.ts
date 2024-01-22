// TODO: Support more execution contexts
export type WorkspaceLocation = 'playground';

export type ExecutionEnvironment = {
  code?: string;
  output?: string;
};

export type WorkspacesState = {
  [l in WorkspaceLocation]: ExecutionEnvironment;
};
