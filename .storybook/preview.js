// Gatsby setup docs: via https://www.gatsbyjs.org/docs/visual-testing-with-storybook/

import {createElement} from 'react';
import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import '../src/assets/stylesheets/storybook.scss';
import '../src/assets/stylesheets/theme.scss';

import Story from '../stories/helpers/Story';

// automatically import all files ending in *.stories.js

const reqSrc = require.context('../src', true, /.stories.(js|mdx)/);
const reqExamples = require.context('../examples', true, /.stories.(js|mdx)/);

function loadStories() {
  reqSrc.keys().forEach(filename => reqSrc(filename));
  reqExamples.keys().forEach(filename => reqExamples(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment

global.__PATH_PREFIX__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook

window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
}

configure(loadStories, module);

addDecorator(withInfo({
  source: false,
  propTablesExclude: [ Story ]
}));

addDecorator(createElement);

addParameters({
  info: {}
})