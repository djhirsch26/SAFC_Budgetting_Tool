/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Topbar from './components/Topbar'
import {durable as Durable} from './components/sectionGenerator'
import {travel as Travel} from './components/sectionGenerator'
import {admin as Admin} from './components/sectionGenerator'
import {local as Local} from './components/sectionGenerator'
import {speaker_calc as SpeakerCalculator} from './components/sectionGenerator'
import {publication as Publication} from './components/sectionGenerator'
import {general as General} from './components/sectionGenerator'


import {commonGoods} from './components/lists'
import {adminFAQ as AdminFAQ} from './components/lists'
import {localFAQ as LocalFAQ} from './components/lists'
import {publicationFAQ as PublicationFAQ} from './components/lists'

// import CounterPage from './containers/CounterPage';
import {
  DURABLE,
  TRAVEL,
  ADMIN,
  LOCAL,
  PUBLICATION,
  PUBLICATION_FAQ,
  ADMIN_FAQ,
  DURABLE_COMMON,
  LOCAL_CALC,
  LOCAL_FAQ,
  GENERAL
} from './constants'


console.log(SpeakerCalculator)
export default () => (
  <App>
    <div className='root'>
    <Topbar/>
    <div className="lowerBlock">
    <Switch>
      <Route path={`/${ADMIN_FAQ}`} component={AdminFAQ} />
      <Route path={`/${ADMIN}`} component={Admin} />
      <Route path={`/${DURABLE_COMMON}`} component={commonGoods} />
      <Route path={`/${DURABLE}`} component={Durable} />
      <Route path={`/${LOCAL_FAQ}`} component={LocalFAQ} />
      <Route path={`/${LOCAL_CALC}`} component={SpeakerCalculator} />
      <Route path={`/${LOCAL}`} component={Local} />
      <Route path={`/${TRAVEL}`} component={Travel} />
      <Route path={`/${PUBLICATION_FAQ}`} component={PublicationFAQ} />
      <Route path={`/${PUBLICATION}`} component={Publication} />
      <Route path={`/${GENERAL}`} component={General} />
      <Route path="/" component={Home} />
    </Switch>
    </div>
    </div>
  </App>
);
