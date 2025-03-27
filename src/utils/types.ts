export type PropsType<T extends React.Component> = T extends React.Component<infer P> ? P : never;
