import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class ListGenerator extends Component {

  constructor(props) {
    super(props)
  }

  renderList({list, title}, depth) {
    switch(depth) {

      case 0:
        list = list.map(listItem => {
          listItem = typeof listItem == "object" ? <div key={`${listItem.title}_depth`}> {this.renderList(listItem, depth+1)} </div> : <li key={`${listItem}_depth`}> {listItem} </li>
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
      case 1:
        list = list.map((listItem, index) => {
          listItem = typeof listItem == "object" ? <div key={`${listItem.title}_depth`}> <li>{listItem.title}</li> <ol style={{marginBottom: 0}}>{this.renderList(listItem, depth+1)}</ol> </div> : <li key={`${listItem}_depth`}> {listItem} </li>
          return listItem
        })
        return (
          <div style={{marginBottom: '15px'}}>
            <div className='page-title text-center' style={{marginBottom: '2px'}}>
              <h4>
              {title ? title : 'Enter Title'}
              </h4>
            </div>
            <ol>{list}</ol>
          </div>
        )
      default:
        list = list.map(listItem => {
          listItem = typeof listItem == "object" ? <div key={`${listItem.title}_depth`}> <li>{listItem.title}</li> <ol key={`${listItem.title}_depth`} style={{marginBottom: 0}}>{this.renderList(listItem, depth+1)}</ol> </div> : <li key={`${listItem}_depth`}> {listItem} </li>
          return listItem
        })
        return (
        <div>
          {list}
        </div>
      )
    }
  }

  render() {
    return (
      <div className='lower-page'>
        {this.renderList(this.props.list, 0)}
      </div>
    );
  }
}

export default ListGenerator;
