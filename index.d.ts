/**
 * This file is to handle types for dependencies with no @types or typings.
 * Hopefully we can flesh these out or rely on future work from library authors.
 */

// tslint:disable max-classes-per-file

declare module 'next/document' {
  export default class Document extends React.Component<any, any> {}
  export class Head extends React.Component<any, any> {}
  export class Main extends React.Component<any, any> {}
  export class NextScript extends React.Component<any, any> {}
}

declare module 'next/head' {
  export default class Head extends React.Component<any, any> {}
}

declare module 'next/link' {
  export default class Link extends React.Component<any, any> {}
}

// flexbox grid system
declare module 'react-styled-flexboxgrid' {
  interface IGrid {
    fluid?: boolean;
  }
  interface IRow {
    id?: string;
  }
  interface ICol {
    lg?: number;
    lgOffset?: number;
  }
  export class Grid extends React.Component<IGrid, any> {}
  export class Row extends React.Component<IRow, any> {}
  export class Col extends React.Component<ICol, any> {}
}

// table packages (eventually one will be reomved)
declare module 'react-textarea-autosize';
declare module 'react-scroll';
declare module 'react-table';
declare module 'react-tooltip';
declare module 'next/router';
declare module 'next/error';
declare module 'remote-redux-devtools';
declare module 'styled-components/lib/models/StyleSheet';
declare module 'next-redux-wrapper';
declare module 'odata-query';
declare module 'recharts';
declare module 'react-no-ssr';
declare module '@storybook/addon-storyshots';
declare module 'deepmerge';
declare module '@storybook/addon-actions';
declare module 'styled-components/lib/utils/create-broadcast';
declare module 'optika';
declare module 'react-transition-group';
declare module 'react-sortable-hoc';
declare module 'file-saver';
declare module 'react-sizeme';

// prevent TSLint errors when importing SVG's as components
declare module '*.svg';
declare module '*.json';
declare module '*.png';

// https://github.com/styled-components/polished/pull/154
// Looks like typings are in the works
declare module 'polished';

declare module 'react-dotdotdot' {
  export default class Dotdotdot extends React.Component<any, any> {}
}

declare module 'stickybits';
declare module 'helpers/asset-prefix' {
  const assetPrefix: string;
  export default assetPrefix;
}
