import React, { Component } from 'react';
import ListGenerator from './ListGenerator'

import {common as commonGoodsConfig, links as commonGoodsLinks} from '../budgetInfo/commonGoods'
import {FAQ as adminFAQConfig, links as adminFAQLinks} from '../budgetInfo/adminFAQ'

export const commonGoods = function (props) {
  return <ListGenerator list={commonGoodsConfig} links={commonGoodsLinks}/>
}

export const adminFAQ = function (props) {
  return <ListGenerator list={adminFAQConfig} links={adminFAQLinks}/>
}
