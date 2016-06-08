/* global define */
'use strict';

import {Collection} from 'backbone';
import {api} from '../classes/globals';
import AdminRole from '../model/AdminRole';

define([], () => {
  var AdminRoles = Collection.extend({
    model: AdminRole,
    url: `${api}/roles`
  });

  return AdminRoles;
});
