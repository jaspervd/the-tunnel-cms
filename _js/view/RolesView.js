/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '_hbs/roles.hbs',
  'collection/AdminRoles',
  'view/RoleView',
  'model/AdminRole'
], ($, _, Backbone, template, Roles, RoleView, Role) => {
  var RolesView = Backbone.View.extend({
    template: template,

    events: {
      'submit .add': 'addHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));

      this.collection = new Roles();
      this.collection.on('reset sync', this.renderRoles, this);
      this.collection.fetch({reset: true});
    },

    addHandler: function(e) {
      e.preventDefault();
      var role = new Role();
      role.set('title', this.$el.find('.add .title').val());
      role.set('can_edit_users', this.checkedValue('.can_edit_users'));
      role.set('can_delete_users', this.checkedValue('.can_delete_users'));
      role.set('can_edit_roles', this.checkedValue('.can_edit_roles'));
      role.set('can_approve_groups', this.checkedValue('.can_approve_groups'));
      role.set('can_edit_creations', this.checkedValue('.can_edit_creations'));
      role.set('can_delete_creations', this.checkedValue('.can_delete_creations'));
      role.set('can_feature_creations', this.checkedValue('.can_feature_creations'));
      role.set('can_judge_creations', this.checkedValue('.can_judge_creations'));
      role.save();
      this.renderRole(role);
    },

    renderRole: function(role) {
      var view = new RoleView({ model: role });
      this.$el.find('.roles').append(view.render().$el);
    },

    renderRoles: function() {
      this.render();
      this.collection.each(this.renderRole.bind(this), this);
    },

    checkedValue: function(input) {
      return this.$el.find(`.add ${input}:checked`).length > 0;
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return RolesView;
});
