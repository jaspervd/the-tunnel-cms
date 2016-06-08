/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '_hbs/artists.hbs',
  'collection/Users',
  'view/ArtistView',
  'collection/AdminRoles'
], ($, _, Backbone, template, Users, ArtistView, Roles) => {
  var ArtistsView = Backbone.View.extend({
    template: template,

    initialize: function () {
      this.getRoles();
    },

    renderRoles: function() {
      this.getArtists();
    },

    getRoles: function() {
      this.roles = new Roles();
      this.roles.on('reset sync', this.renderRoles, this);
      this.roles.fetch({reset: true});
    },

    getArtists: function() {
      this.collection = new Users();
      this.collection.on('reset sync', this.renderArtists, this);
      this.collection.fetch({reset: true});
    },

    renderArtist: function(artist) {
      var view = new ArtistView({ model: artist, roles: this.roles });
      this.$el.find('.artists').append(view.render().$el);
    },

    renderArtists: function() {
      this.render();
      this.collection.each(this.renderArtist.bind(this), this);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return ArtistsView;
});
