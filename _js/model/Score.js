/* global define */
'use strict';

import { api } from 'classes/globals';
import { Model } from 'backbone';

define([], () => {
  var Score = Model.extend({
    id: null,
    creation_id: null,
    score: null,
    urlRoot: `${api}/scores`
  });

  return Score;
});
