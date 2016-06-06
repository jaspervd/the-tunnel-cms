/* global define */
'use strict';

import {api} from 'classes/globals';

define([
  'jquery',
  'underscore',
  'backbone',
  '../view/CreationsView',
  '../view/LoginView',
  '../view/GroupsView',
  '../view/ArtistsView',
  '../view/NavigationView',
  '../view/FooterView'
], ($, _, Backbone, CreationsView, LoginView, GroupsView, ArtistsView, NavigationView, FooterView) => {
  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      _.bindAll.apply(_, [this].concat(_.functions(this)));

      this.navigationView = new NavigationView();
      this.footerView = new FooterView();
    },

    routes: {
      '': 'creations',
      'login': 'login',
      'logout': 'logout',
      'groups': 'groups',
      'creations': 'creations',
      'artists': 'artists',
      '*path': 'creations'
    },

    creations: function() {
      this.render(new CreationsView());
    },

    login: function() {
      this.render(new LoginView());
    },

    logout: function() {
      $.post(`${api}/logout`);
      window.user = {};
      Backbone.history.navigate('login', true);
    },

    groups: function() {
      this.render(new GroupsView());
    },

    artists: function() {
      this.render(new ArtistsView());
    },

    render: function(view) {
      var $container = $('.container');
      $container.html('');
      $container.append(this.navigationView.render().$el);
      $container.append(view.render().$el);
      $container.append(this.footerView.render().$el);
    }
  });

  return AppRouter;
});
