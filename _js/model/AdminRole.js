/* global define */
'use strict';

import { api } from 'classes/globals';
import { Model } from 'backbone';

define(['jquery'], ($) => {
  var AdminRole = Model.extend({
    id: null,
    title: '',
    can_edit_users: null,
    can_delete_users: null,
    can_edit_roles: null,
    can_approve_groups: null,
    can_edit_creations: null,
    can_delete_creations: null,
    can_feature_creations: null,
    can_judge_creations: null,
    urlRoot: `${api}/roles`
  });

  return AdminRole;
});
