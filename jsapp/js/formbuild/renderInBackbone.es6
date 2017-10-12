import React from 'react';
import ReactDOM from 'react-dom';
import KoboMatrix from './containers/KoboMatrix';
import { fromJS } from 'immutable';

/*
Initially, this KoboMatrixRow class will be an intermediary between
the react interface and the backbone `model.row` code.
*/
class KoboMatrixRow {
  constructor (model) {
    let obj2 = {};
    const _o = model;
    obj2.label = _o.getValue('label');
    obj2.choiceLists = [];
    obj2.choices = {};
    Object.keys(_o.items).forEach(function(key) {
      obj2.choiceLists.push(key);

      _o.items[key].options.map(( item ) => {
        const { $kuid } = item.attributes;
        item.attributes.list_name = key;
        obj2.choices[$kuid] = item.attributes;
      });
    });

    obj2.cols = _o._kobomatrix_cols().map(( item ) => {
      const _type = item.get('type').get('typeId');
      const attrs = Object.assign(item.toJSON(), {
        type: _type,
      });
      const { $kuid } = attrs;
      obj2[$kuid] = attrs;
      return $kuid;
    });

    const _b = _o.toJSON();
    this.kobomatrix_list = _b['kobo--matrix_list'];
    this.data = fromJS(obj2);
    this.kuid = _b.$kuid;
  }
}

export function renderKobomatrix (view, el) {
  let model = new KoboMatrixRow(view.model);
  ReactDOM.render(<KoboMatrix model={model} />, el.get(0));
}
