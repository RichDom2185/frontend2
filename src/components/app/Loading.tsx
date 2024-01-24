import { useAppDispatch } from 'src/utils/hooks';
import { Thunk } from 'src/utils/store';
import { Card } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';

type Props<T> = {
  loader: Thunk<T>;
  message?: string;
  children: (data: T, refresh: (after?: number) => Promise<void>) => React.ReactNode;
};

const Loading = <T,>({ message = 'Loading…', loader, children: render }: Props<T>) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(loader).then(data => {
        setData(data);
        setIsLoading(false);
      });
    }
  }, [dispatch, isLoading, loader]);

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card compact>
          <span>{message}</span>
        </Card>
      </div>
    );
  }

  return render(data as any, async (after = 0) => {
    await new Promise(resolve => setTimeout(resolve, after));
    setIsLoading(true);
  });
};

export default Loading;
