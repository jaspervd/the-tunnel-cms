/* global define */
'use strict';

import {Collection} from 'backbone';
import {api} from '../classes/globals';
import Score from '../model/Score';

define([], () => {
  var Scores = Collection.extend({
    model: Score,
    url: `${api}/scores`
  });

  return Scores;
});
