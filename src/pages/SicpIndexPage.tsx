import SicpToc from 'src/components/sicp/SicpToc';
import { Divider, H1, H2, H4 } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

import classes from 'src/styles/Sicp.module.scss';

const originalAuthors = 'Harold Abelson and Gerald Jay Sussman';
const originalWithAuthors = 'with Julie Sussman';
const adaptedAuthors = 'Martin Henz and Tobias Wrigstad';
const adaptedWithAuthors = 'with Julie Sussman';
const developers = 'Samuel Fang';

const ExternalLink: React.FC<{ to: string; children: React.ReactNode }> = props => (
  <a href={props.to} target="_blank" rel="noreferrer noopener nofollow">
    {props.children}
  </a>
);

const authors = (
  <div className={classes['sicp-authors']}>
    <H4>{originalAuthors}</H4>
    <p>
      {originalWithAuthors}
      <i> – original authors</i>
    </p>
    <H4>{adaptedAuthors}</H4>
    <p>
      {adaptedWithAuthors}
      <i> – adapters to JavaScript</i>
    </p>
    <H4>{developers}</H4>
    <p>
      <i> – designer and developer of this Interactive SICP JS edition</i>
    </p>
  </div>
);

const bookTitle = (
  <div>
    <H1>Structure and Interpretation of Computer Programs</H1>
    <H2>— JavaScript Edition</H2>
  </div>
);

const licenses = (
  <table className={classes['sicp-licenses']}>
    <tbody>
      <tr>
        <td>
          <ExternalLink to="http://creativecommons.orsg/licenses/by-sa/4.0/">
            <img src="https://licensebuttons.net/l/by-sa/4.0/88x31.png" alt="CC BY-SA 4.0" />
          </ExternalLink>
        </td>
        <td>
          This work is licensed under a{' '}
          <ExternalLink to="http://creativecommons.org/licenses/by-sa/4.0/">
            Creative Commons Attribution-ShareAlike 4.0 International License
          </ExternalLink>
          .
        </td>
      </tr>
      <tr>
        <td>
          <ExternalLink to="https://www.gnu.org/licenses/gpl-3.0.en.html">
            <img
              src="https://camo.githubusercontent.com/46d38fe6087a9b9bdf7e45458901b818765b8391/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f372f37392f4c6963656e73655f69636f6e2d67706c2e7376672f353070782d4c6963656e73655f69636f6e2d67706c2e7376672e706e67"
              alt="GPL 3"
              data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/License_icon-gpl.svg/50px-License_icon-gpl.svg.png"
            />
          </ExternalLink>
        </td>
        <td>
          All JavaScript programs in this work are licensed under the{' '}
          <ExternalLink to="https://www.gnu.org/licenses/gpl-3.0.en.html">
            GNU General Public License Version 3
          </ExternalLink>
          .
        </td>
      </tr>
      <tr>
        <td>
          <ExternalLink to="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <img src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png" alt="CC BY-NC-SA 4.0" />
          </ExternalLink>
        </td>
        <td>
          <ExternalLink to="https://mitpress.mit.edu/books/structure-and-interpretation-computer-programs-1">
            Print and Kindle versions of this work
          </ExternalLink>{' '}
          are published by The MIT Press under a{' '}
          <ExternalLink to="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
          </ExternalLink>
          .
        </td>
      </tr>
    </tbody>
  </table>
);

const SicpIndexPage: React.FC = () => {
  return (
    <div className={classNames(classes['sicp-index-page'], classes['sicp-body'])}>
      <div className={classes['sicp-cover']}>
        <img src="http://source-academy.github.io/sicp/sicpjs.png" alt="SICP" />
        <div className={classes['sicp-cover-text']}>
          {bookTitle}
          {authors}
        </div>
      </div>
      <Divider />
      <H2 style={{ textAlign: 'center' }}>Contents</H2>
      <SicpToc />
      <Divider />
      <H2 style={{ textAlign: 'center' }}>Licenses</H2>
      {licenses}
    </div>
  );
};

export default SicpIndexPage;
