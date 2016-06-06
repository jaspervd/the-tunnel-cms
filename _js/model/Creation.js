/* global define */
'use strict';

import { api } from 'classes/globals';
import { Model } from 'backbone';

define(['jquery'], ($) => {
  var Creation = Model.extend({
    id: null,
    user_id: null,
    title: '',
    info: '',
    group_id: null,
    created_time: '',
    likes: null,
    user: {},
    urlRoot: `${api}/creations/`,

    feature: function() {
      $.ajax({
        url: `${this.urlRoot}${this.get('id')}/feature`,
        type: 'PATCH'
      }).success((data) => {
        console.log('succes');
        return data;
      }).fail((data) => {
        console.log('error');
        return data;
      });
    },

    score: function(points) {
      $.post(`${this.urlRoot}${this.get('id')}/score`, {id: this.get('id'), user_id: window.user.id, score: points}, () => {
        return true;
      }).fail(() => {
        console.log('error');
      });
    }
  });

  return Creation;
});
