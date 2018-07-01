import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class ListGenerator extends Component {

  constructor(props) {
    super(props)
  }

  renderList({list, title, type}, depth, defaultType='bullet') {
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
              <h4>
              {title ? title : 'Enter Title'}
              </h4>
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
    return (
      <div className={className}>
        {this.renderList(this.props.list, depth, this.props.list.type)}
      </div>
    );
  }
}

export default ListGenerator;
