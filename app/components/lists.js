import React, { Component } from 'react';
import ListGenerator from './ListGenerator'

import {common as commonGoodsConfig, links as commonGoodsLinks} from '../budgetInfo/commonGoods'
import {FAQ as adminFAQConfig, links as adminFAQLinks} from '../budgetInfo/adminFAQ'
import {FAQ as localFAQConfig, links as localFAQLinks} from '../budgetInfo/localFAQ'
import {FAQ as pubFAQConfig, links as pubFAQLinks} from '../budgetInfo/publicationFAQ'


export const commonGoods = function (props) {
  return <ListGenerator list={commonGoodsConfig} links={commonGoodsLinks}/>
}

export const adminFAQ = function (props) {
  return <ListGenerator list={adminFAQConfig} links={adminFAQLinks}/>
}

export const localFAQ = function (props) {
  return <ListGenerator list={localFAQConfig} links={localFAQLinks}/>
}

export const publicationFAQ = function (props) {
  return <ListGenerator list={pubFAQConfig} links={pubFAQLinks}/>
}
