import React from 'react';
import { Route, create } from 'react-router-transition-context';
import App from './components/App';

require('normalize-css/normalize.css');
require('buildo-react-components/src/flex/flexView.scss');
require('buildo-react-components/src/loading-spinner/style.scss');
require('buildo-react-components/src/kitchen-sink/style.scss');
require('rc-datepicker/src/style.scss');
require('react-select/dist/default.css');

const routes = (
  <Route path='/' handler={App} />
);

const router = create({ routes });

router.run((Handler, { params, query }) => {
  // RENDERS
  React.render(<Handler {...{ router, params, query }} />, document.getElementById('app'));
});
