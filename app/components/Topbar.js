import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {
  DURABLE,
  TRAVEL,
  ADMIN,
  PUBLICATION,
  LOCAL,
  GENERAL
} from '../constants'

import LinkButton from './LinkButton'


export default class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
      <Link to={'/'} style={{textDecoration: 'none'}}><i className="fa fa-home" style={{color: 'white', fontSize: 28, float: 'left', marginLeft: 30, marginTop: 10}}/></Link>
      <h2 style={{marginBottom: '10px'}}>Welcome to the SAFC</h2>
      <div className='buttons'>
        <div className='topButton'><LinkButton className='topLinkButton' text='General' link={`/${GENERAL}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Administrative' link={`/${ADMIN}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Durable' link={`/${DURABLE}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Local' link={`/${LOCAL}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Travel' link={`/${TRAVEL}`}/></div>
        <div className='topButton'><LinkButton className='topLinkButton' text='Publication' link={`/${PUBLICATION}`}/></div>
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
