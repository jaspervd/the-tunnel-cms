/* global define */
'use strict';

import { api } from 'classes/globals';
import { Model } from 'backbone';

define(['jquery'], ($) => {
  var User = Model.extend({
    id: null,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    bio: '',
    created_time: '',
    urlRoot: `${api}/users/`,

    hide: function() {
      $.ajax({
        url: `${this.urlRoot}${this.get('id')}/hide`,
        type: 'PATCH'
      }).success((data) => {
        console.log(data);
      }).fail(() => {
        console.log('error');
      });
    },

    assignRole: function(role_id) {
      console.log(role_id);
      $.ajax({
        url: `${this.urlRoot}${this.get('id')}/role`,
        data: {role_id: role_id},
        type: 'PATCH'
      }).success((data) => {
        console.log(data);
      }).fail(() => {
        console.log('error');
      });
    }
  });

  return User;
});
