import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './views/App';
import Home from './views/Home';
import PageFlexBox from './views/PageFlexBox';
import PageFlex from './views/PageFlex';
import PageButtons from './views/PageButtons';
import PageFlyout from './views/PageFlyout';
import PageScrollView from './views/PageScrollView';
import PageText from './views/PageText';
import PageTabs from './views/PageTabs';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/flexbox' component={PageFlexBox} />
    <Route path='/flex' component={PageFlex} />
    <Route path='/buttons' component={PageButtons} />
    <Route path='/flyout' component={PageFlyout} />
    <Route path='/scrollview' component={PageScrollView} />
    <Route path='/text' component={PageText} />
    <Route path='/tabs' component={PageTabs} />
  </Route>
);

export default routes;
