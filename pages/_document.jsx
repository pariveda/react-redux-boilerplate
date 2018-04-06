import 'core-js/es7/object'; // tslint:disable-line no-submodule-imports
import GlobalStyles from 'helpers/global-styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
// inject global styles (e.g. font-faces)
GlobalStyles.injectGlobalStyles();
// added styles to prevent scrolling in background when modal is open
const Body = styled.body `
  &.ReactModal__Body--open {
    overflow-y: hidden;
  }
`;
export default class MyDocument extends Document {
    render() {
        const sheet = new ServerStyleSheet();
        const main = sheet.collectStyles(<Main />);
        const styleTags = sheet.getStyleElement();
        return (<html>
        <Head>
          <title>HS ABC Order</title>
          <link rel="stylesheet" type="text/css" href="/static/external-stylesheets/date-picker/style.css"/>
          {styleTags}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"/>
        </Head>
        <Body>
          {main}
          <NextScript />
        </Body>
      </html>);
    }
}
//# sourceMappingURL=_document.jsx.map