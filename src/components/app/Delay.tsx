import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  waitInMsBeforeRender: number;
};

/**
 * Delays the rendering of child components by a set time.
 */
const Delay: React.FC<Props> = props => {
  const { children, waitInMsBeforeRender } = props;

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsRendered(true), waitInMsBeforeRender);
    return () => clearTimeout(timeoutId);
  }, [waitInMsBeforeRender]);

  return isRendered ? children : <></>;
};

export default Delay;
