import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {
  DURABLE,
  TRAVEL
} from '../constants'

import LinkButton from './LinkButton'


export default class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
      <h1 style={{marginBottom: '10px'}}>Welcome to the SAFC</h1>
      <div className='buttons'>
        <div className='topButton'><LinkButton className='topLinkButton' text='Home' link={`/`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Durable' link={`/${DURABLE}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Travel' link={`/${TRAVEL}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Home' link={`/`}/></div>
      </div>
      </div>
    );
  }
}

// <div className='topButton'><button><Link className='buttonLink' to={`/${DURABLE}`}>Durable</Link></button></div>

// <div className='topButton'><button>Home</Link></button></div>
// <LinkButton className='topButton' text='Durable' link={`/${DURABLE}`}/>
// <div className='topButton'><button>dur href</button></div>
// <div className='topButton'><button><Link className='plainLink' to='/'>Home</Link></button></div>
