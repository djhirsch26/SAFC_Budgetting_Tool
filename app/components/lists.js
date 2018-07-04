import React, { Component } from 'react';
import ListGenerator from './ListGenerator'

var commonGoodsJson = require('./commonGoods.json');
export const commonGoods = function (props) {
  return <ListGenerator list={commonGoodsJson}/>
}
