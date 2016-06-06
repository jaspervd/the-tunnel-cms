/* global define */
'use strict';

import { api } from 'classes/globals';
import { Model } from 'backbone';

define(['jquery'], ($) => {
  var Group = Model.extend({
    id: null,
    title: '',
    info: '',
    creator_id: null,
    approved: false,
    created_time: '',
    urlRoot: `${api}/groups/`,

    approve: function() {
      $.ajax({
        url: `${this.urlRoot}${this.get('id')}/approve`,
        type: 'PATCH'
      }).success((data) => {
        console.log(data);
      }).fail(() => {
        console.log('error');
      });
    }
  });

  return Group;
});
