// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LinkButton from './LinkButton';

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className='banner'><span>Welcome to the SAFC Budget Tool</span></div>
        <div className='buttons'>
        <div className='btn-group'>
          <div><LinkButton text='Create a New Budget' link={`/durable`}/></div>
          <div><LinkButton text='Edit/View an Existing Budget' link={`/`}/></div>
          <div><LinkButton text='Help' link={`/`}/></div>
        </div>
        </div>
      </div>
    );
  }
}
