import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import GlobalStyles from 'helpers/global-styles';
import { ThemeProvider } from 'styled-components';
import Theme from 'components/layout/themes';

const ThemeDecorator = story => (
  <ThemeProvider theme={Theme}>{story()}</ThemeProvider>
);
addDecorator(ThemeDecorator);

setOptions({
  sortStoriesByKind: true,
});

// inject global styles (e.g. font-faces)
GlobalStyles.injectGlobalStyles();

const req = require.context('../app', true, /stories\.tsx?$/);

function loadStories() {
  req.keys().forEach(path => {
    try {
      return req(path);
    } catch (exception) {
      console.error(`Error when rendering story: ${path}`, exception);
    }
  });
}

configure(loadStories, module);
