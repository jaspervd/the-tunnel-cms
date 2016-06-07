/* global define */
'use strict';

import {Collection} from 'backbone';
import {api} from '../classes/globals';
import Creation from '../model/Creation';

define([], () => {
  var Creations = Collection.extend({
    model: Creation,
    url: `${api}/creations`,

    filterNotScored: function() {
      var collection = this.filter((creation) => {
        return parseInt(creation.get('user_id')) !== parseInt(window.user.id);
      });
      return new Creations(collection);
    },

    filterNotNominated: function() {
      var collection = this.filter((creation) => {
        return parseInt(creation.get('nominated')) === 0;
      });
      return new Creations(collection);
    }
  });

  return Creations;
});
