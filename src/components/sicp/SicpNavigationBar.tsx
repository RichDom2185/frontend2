import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

type Props = {
  handleOpenToc?: () => void;
};

const SicpNavigationBar: React.FC<Props> = ({ handleOpenToc }) => {
  const { chapter } = useParams<{ chapter: string }>();
  const chapterString = chapter === undefined ? 'Cover Page' : `Chapter ${chapter}`;
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Button
          minimal
          style={{ fontWeight: 'bold' }}
          icon="menu"
          onClick={() => handleOpenToc?.()}
        >
          {chapterString}
        </Button>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button small minimal>
          Search
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default SicpNavigationBar;
