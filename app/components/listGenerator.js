import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom'


class ListGenerator extends Component {

  constructor(props) {
    super(props)
  }

  renderList({list, title, type}, depth, defaultType='bullet') {

    if (!list) return;
    switch(depth) {

      case 0:
        var type_ = type ? type : defaultType
        list = list.map(listItem => {
          if (typeof listItem == "object") {
            listItem = <div key={`${listItem.title}_depth`}> {this.renderList(listItem, depth+1, type_)} </div>
          }
          else {
            listItem = <li key={`${listItem}_depth`}> {listItem} </li>
          }
          return listItem
        })



        return (
          <div style={{marginBottom: '15px'}}>
            <div className='page-title text-center' style={{marginBottom: '20px'}}>
              <h2>
              {title ? title : 'Enter Title'}
              </h2>
            </div>
            {list}
          </div>
        )
        break;
      case 1:
        var type = type ? type : defaultType
        list = list.map((listItem, index) => {
          if (typeof listItem == "object") {
            var nextType = listItem.type ? listItem.type : type
            var list_ = type && type=='numeric' ? <ol style={{marginBottom: 0}}>{this.renderList(listItem, depth+1, nextType)}</ol> : <ul style={{marginBottom: 0}}>{this.renderList(listItem, depth+1)}</ul>
            listItem = <div key={`${listItem.title}_depth`}> <li>{listItem.title}</li> {list_} </div>
          }
          else {
            listItem = <li key={`${listItem}_depth`}> {listItem} </li>
          }
          return listItem
        })


        // Render Depth 0
        list = type && type=='numeric' ? <ol>{list}</ol> : <ul>{list}</ul>

        return (
          <div style={{marginBottom: '15px'}}>
            <div className='page-title text-center' style={{marginBottom: '2px'}}>
              <h3>
              {title ? title : 'Enter Title'}
              </h3>
            </div>
            {list}
          </div>
        )
        break;
      default:
        var type = type ? type : defaultType
        list = list.map(listItem => {
          if (typeof listItem == "object" ) {
            var nextType = listItem.type ? listItem.type : type
            var list_ = type && type=='numeric' ? <ol key={`${listItem.title}_depth`} style={{marginBottom: 0}}>{this.renderList(listItem, depth+1, nextType)}</ol> : <ul key={`${listItem.title}_depth`} style={{marginBottom: 0}}>{this.renderList(listItem, depth+1)}</ul>
            listItem = <div key={`${listItem.title}_depth`}> <li>{listItem.title}</li> {list_} </div>
          }
          else {
            listItem = <li key={`${listItem}_depth`}> {listItem} </li>
          }
          return listItem
        })

        list = type && type=='numeric' ? <ol>{list}</ol> : <ul>{list}</ul>
        // If this is the first part of a list, we may want a title. Make one if it is present
        var optionalTitle = this.props.depth && depth==this.props.depth && title && title!='' ? <div>{title}</div> : <div/>

        return (
        <div>
          {optionalTitle}
          {list}
        </div>
      )
    }
  }

  render() {

    var depth = this.props.depth ? this.props.depth : 0
    var className = this.props.depth && this.props.depth >= 2 ? '' : 'lower-page'


    var links = <div/>;
    console.log(this.props)
    if (this.props.links) {
      links =
      <div style={{marginTop: '40px', border: 'solid 1px', marginBottom: '5px'}}>
      <h4 style={{textAlign: 'center', textDecoration: 'underline', verticalAlign: 'center'}}> Useful Links </h4>
      {this.props.links.map(({label, link}) => {
        // Convert link to href
        link = '/' + link
        return (
          <div key={label}><Link className='btn btn-secondary btn-link btn-block' style={{fontSize: '15px'}} to={link}>{label}</Link></div>
        )
      })}
      </div>
    }

    return (
      <div className={className}>
        {this.renderList(this.props.list, depth, this.props.list.type)}
        {links}
      </div>
    );
  }
}

export default ListGenerator;
