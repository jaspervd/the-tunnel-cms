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
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
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

    render: function () {
      this.$el.html(this.template({artist: this.model.toJSON(), admin: window.user}));
      this.delegateEvents();
      return this;
    }
  });

  return ArtistView;
});
