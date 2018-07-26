/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Topbar from './components/Topbar'
import {durable as Durable} from './components/budgetSections/sectionGenerator'
import {travel as Travel} from './components/budgetSections/sectionGenerator'

import {commonGoods} from './components/lists'

// import CounterPage from './containers/CounterPage';
import { DURABLE } from './constants'


export default () => (
  <App>
    <div className='root'>
    <Topbar/>
    <div className="lowerBlock">
    <Switch>
      <Route path={`/${DURABLE}/common`} component={commonGoods} />
      <Route path="/travel" component={Travel} />
      <Route path={`/${DURABLE}`} component={Durable} />
      <Route path="/" component={Home} />
    </Switch>
    </div>
    </div>
  </App>
);
