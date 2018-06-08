import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Topbar extends Component {

  constructor(props) {
    super(props)
    this.text = props.text
    this.link = props.link
    this.className = props.className
  }

  render() {
    return (
      <div className={this.className}>
      <button>
      <Link style={{display: 'block', color: 'inherit', textDecoration: 'none'}} to={this.link}>{this.text}</Link>
      </button>
      </div>
    );
  }
}
