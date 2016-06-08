/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/AdminRole',
  '_hbs/role.hbs'
], ($, _, Backbone, Role, template) => {
  var ArtistView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'role',

    events: {
      'submit .update': 'saveHandler',
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    saveHandler: function (e) {
      e.preventDefault();
      this.model.set('title', this.$el.find('.title').val());
      this.model.set('can_edit_users', this.checkedValue('.can_edit_users'));
      this.model.set('can_delete_users', this.checkedValue('.can_delete_users'));
      this.model.set('can_edit_roles', this.checkedValue('.can_edit_roles'));
      this.model.set('can_approve_groups', this.checkedValue('.can_approve_groups'));
      this.model.set('can_edit_creations', this.checkedValue('.can_edit_creations'));
      this.model.set('can_delete_creations', this.checkedValue('.can_delete_creations'));
      this.model.set('can_feature_creations', this.checkedValue('.can_feature_creations'));
      this.model.set('can_judge_creations', this.checkedValue('.can_judge_creations'));
      this.model.save();
    },

    checkedValue: function(input) {
      return this.$el.find(`${input}:checked`).length > 0;
    },

    deleteHandler: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.delegateEvents();
      return this;
    }
  });

  return ArtistView;
});
