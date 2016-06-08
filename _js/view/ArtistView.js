/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/User',
  '_hbs/artist.hbs'
], ($, _, Backbone, User, template) => {
  var ArtistView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'artist',

    events: {
      'click .hide': 'hideHandler',
      'click .delete': 'deleteHandler',
      'change .assign-role': 'assignRoleHandler'
    },

    initialize: function (options) {
      this.options = options;
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    hideHandler: function (e) {
      e.preventDefault();
      this.model.hide();
    },

    deleteHandler: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },

    assignRoleHandler: function (e) {
      this.model.assignRole($(e.currentTarget).find(':selected').val());
    },

    render: function () {
      this.$el.html(this.template({artist: this.model.toJSON(), admin: window.user, roles: this.options.roles.toJSON()}));
      this.delegateEvents();
      return this;
    }
  });

  return ArtistView;
});
