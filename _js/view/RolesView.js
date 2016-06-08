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
      role.set('title', this.$el.find('.title').val());
      role.set('can_edit_users', this.$el.find('.can_edit_users').val());
      role.set('can_delete_users', this.$el.find('.can_delete_users').val());
      role.set('can_edit_roles', this.$el.find('.can_edit_roles').val());
      role.set('can_approve_groups', this.$el.find('.can_approve_groups').val());
      role.set('can_edit_creations', this.$el.find('.can_edit_creations').val());
      role.set('can_delete_creations', this.$el.find('.can_delete_creations').val());
      role.set('can_feature_creations', this.$el.find('.can_feature_creations').val());
      role.set('can_judge_creations', this.$el.find('.can_judge_creations').val());
      role.save();
    },

    renderRole: function(role) {
      var view = new RoleView({ model: role });
      this.$el.find('.roles').append(view.render().$el);
    },

    renderRoles: function() {
      this.render();
      this.collection.each(this.renderRole.bind(this), this);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return RolesView;
});
