import Constants from './constants';
import SicpAnchorLink from 'src/components/sicp/SicpAnchorLink';
import SicpCodeSnippet from 'src/components/sicp/SicpCodeSnippet';
import SicpExercise from 'src/components/sicp/SicpExercise';
import SicpLatex from 'src/components/sicp/SicpLatex';
import { Blockquote, Code, H1, H2, H4, OL, Pre, UL } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

// Custom error class for errors when parsing JSON files.
export class ParseJsonError extends Error {}

/**
 * Functions to handle parsing of JSON files into JSX elements.
 */
export type JsonType = {
  child?: Array<JsonType>;
  tag?: string;
  body?: string;
  output?: string;
  scale?: string;
  snippet?: JsonType;
  table?: JsonType;
  images?: Array<JsonType>;
  src?: string;
  captionHref?: string;
  captionName?: string;
  captionBody?: Array<JsonType>;
  latex?: boolean;
  author?: string;
  date?: string;
  title?: string;
  solution?: Array<JsonType>;
  id?: string;
  program?: string;
  href?: string;
  count?: number;
  eval?: boolean;
  prependLength?: number;
};

export type RefType = React.MutableRefObject<Record<string, HTMLElement | null>>;

const handleFootnote = (obj: JsonType, refs: RefType) => {
  return (
    <>
      {obj.count === 1 && <hr />}
      <div className="sicp-footnote">
        <div ref={ref => (refs.current[obj.id!] = ref)} />
        <a href={obj.href}>{'[' + obj.count + '] '}</a>
        {parseArr(obj.child!, refs)}
      </div>
    </>
  );
};

const handleRef = (obj: JsonType, refs: RefType) => {
  return (
    <Link ref={ref => (refs.current[obj.id!] = ref)} to={obj.href!}>
      {obj.body}
    </Link>
  );
};

const handleEpigraph = (obj: JsonType, refs: RefType) => {
  const { child, author, title, date } = obj;

  const hasAttribution = author || title || date;

  const attribution = [];
  attribution.push(<Fragment key="attribution">-</Fragment>);

  if (author) {
    attribution.push(<Fragment key="author">{author}</Fragment>);
  }

  if (title) {
    attribution.push(<i key="title">{title}</i>);
  }

  if (date) {
    attribution.push(<Fragment key="date">{date}</Fragment>);
  }

  const text = child && parseArr(child, refs);

  return text ? (
    <Blockquote className="sicp-epigraph">
      {text}
      {hasAttribution && <div className="sicp-attribution">{attribution}</div>}
    </Blockquote>
  ) : (
    <>{hasAttribution && <div className="sicp-attribution">{attribution}</div>}</>
  );
};

const handleSnippet = (obj: JsonType) => {
  if (obj.latex) {
    return <Pre>{handleLatex(obj.body!)}</Pre>;
  } else if (typeof obj.eval === 'boolean' && !obj.eval) {
    return (
      <>
        {obj.body && <Pre>{obj.body}</Pre>}
        {obj.output && (
          <Pre>
            <em>{obj.output}</em>
          </Pre>
        )}
      </>
    );
  } else {
    if (!obj.body) {
      return <></>;
    }

    const codeSnippetProps = {
      body: obj.body,
      id: obj.id!,
      initialEditorValueHash: obj.program!,
      prependLength: obj.prependLength!,
      output: obj.output!,
    };
    return <SicpCodeSnippet {...codeSnippetProps} />;
  }
};

const handleFigure = (obj: JsonType, refs: RefType) => (
  <SicpAnchorLink id={obj.id} refs={refs} top={36}>
    <div className="sicp-figure">
      {obj.src && handleImage(obj, refs)}
      {obj.snippet && processingFunctions['SNIPPET'](obj.snippet, refs)}
      {obj.table && processingFunctions['TABLE'](obj.table, refs)}
      {obj.captionName && (
        <h5 className="sicp-caption">
          {obj.captionName}
          {parseArr(obj.captionBody!, refs)}
        </h5>
      )}
    </div>
  </SicpAnchorLink>
);

const handleImage = (obj: JsonType, _refs: RefType) => {
  return <img src={Constants.sicpBackendUrl + obj.src} alt={obj.id} width={obj.scale || '100%'} />;
};

const handleTR = (obj: JsonType, refs: RefType, index: number) => {
  return <tr key={index}>{obj.child!.map((x, index) => handleTD(x, refs, index))}</tr>;
};

const handleTD = (obj: JsonType, refs: RefType, index: number) => {
  return <td key={index}>{parseArr(obj.child!, refs)}</td>;
};

const handleExercise = (obj: JsonType, refs: RefType) => {
  return (
    <SicpAnchorLink id={obj.id} refs={refs} top={5}>
      <SicpExercise
        title={obj.title!}
        body={parseArr(obj.child!, refs)}
        solution={obj.solution && parseArr(obj.solution, refs)}
      />
    </SicpAnchorLink>
  );
};

const handleTitle = (obj: JsonType, refs: RefType) => {
  return (
    <SicpAnchorLink id={obj.id} refs={refs} top={6}>
      <H1>{obj.body}</H1>
    </SicpAnchorLink>
  );
};

const handleReference = (obj: JsonType, refs: RefType) => {
  return <div className="sicp-reference">{parseArr(obj.child!, refs)}</div>;
};

const handleText = (text: string) => {
  return <>{text}</>;
};

const handleLatex = (math: string) => {
  return <SicpLatex math={math} />;
};

export const processingFunctions: Record<string, (obj: JsonType, refs: RefType) => JSX.Element> = {
  '#text': (obj, _refs) => handleText(obj.body!),
  B: (obj, refs) => <b>{parseArr(obj.child!, refs)}</b>,
  BR: (_obj, _refs) => <br />,
  DISPLAYFOOTNOTE: handleFootnote,
  EM: (obj, refs) => <em>{parseArr(obj.child!, refs)}</em>,
  EPIGRAPH: handleEpigraph,
  EXERCISE: handleExercise,
  FIGURE: handleFigure,
  FOOTNOTE_REF: (obj, refs) => (
    <sup ref={ref => (refs.current[obj.id!] = ref)}>{handleRef(obj, refs)}</sup>
  ),
  JAVASCRIPTINLINE: (obj, _refs) => <Code>{obj.body}</Code>,
  LATEX: (obj, _refs) => handleLatex(obj.body!),
  LI: (obj, refs) => <li>{parseArr(obj.child!, refs)}</li>,
  LINK: (obj, _refs) => <a href={obj.href}>{obj.body}</a>,
  META: (obj, _refs) => <em>{obj.body}</em>,
  OL: (obj, refs) => <OL>{parseArr(obj.child!, refs)}</OL>,
  REF: handleRef,
  REFERENCE: handleReference,
  SNIPPET: (obj, _refs) => handleSnippet(obj),
  SUBHEADING: (obj, refs) => (
    <SicpAnchorLink id={obj.id} refs={refs} top={2}>
      <H2>{parseArr(obj.child!, refs)}</H2>
    </SicpAnchorLink>
  ),
  SUBSUBHEADING: (obj, refs) => (
    <SicpAnchorLink id={obj.id} refs={refs} top={16}>
      <H4>{parseArr(obj.child!, refs)}</H4>
    </SicpAnchorLink>
  ),
  TABLE: (obj, refs) => (
    <table>
      <tbody>{obj.child!.map((x, index) => handleTR(x, refs, index))}</tbody>
    </table>
  ),
  TEXT: (obj, refs) => (
    <SicpAnchorLink id={obj.id} refs={refs} top={-3}>
      <p className="sicp-text">{parseArr(obj.child!, refs)}</p>
    </SicpAnchorLink>
  ),
  TITLE: handleTitle,
  TT: (obj, refs) => <Code>{parseArr(obj.child!, refs)}</Code>,
  UL: (obj, refs) => <UL>{parseArr(obj.child!, refs)}</UL>,
};

// Parse array of objects. An array of objects represent sibling nodes.
export const parseArr = (arr: Array<JsonType>, refs: RefType) => {
  if (!arr) {
    return <></>;
  }

  return <>{arr.map((item, index) => parseObj(item, index, refs))}</>;
};

// Parse an object.
export const parseObj = (obj: JsonType, index: number | undefined, refs: RefType) => {
  if (obj.tag) {
    if (processingFunctions[obj.tag]) {
      return <Fragment key={index}>{processingFunctions[obj.tag](obj, refs)}</Fragment>;
    } else {
      throw new ParseJsonError('Unrecognised Tag: ' + obj.tag);
    }
  } else {
    // Handle case where tag does not exists. Should not happen if json file is created properly.
    return <Fragment key={index}>{parseArr(obj.child!, refs)}</Fragment>;
  }
};
