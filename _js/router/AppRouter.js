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
    currentView: undefined,

    initialize: function() {
      _.bindAll.apply(_, [this].concat(_.functions(this)));

      this.navigationView = new NavigationView();
      this.currentView = new LoginView();
      this.footerView = new FooterView();
    },

    routes: {
      '': 'login',
      'login': 'login',
      'logout': 'logout',
      'groups': 'groups',
      'creations': 'creations',
      'artists': 'artists',
      '*path': 'login'
    },

    execute: function(callback, args) {
      if ($.isEmptyObject(window.user)) {
        this.authenticationCheck();
      } else {
        callback.apply(this, args);
      }
    },

    creations: function() {
      this.priviligeCheck(window.user.role.can_edit_creations);
      this.currentView = new CreationsView();
      this.render();
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
      this.priviligeCheck(window.user.role.can_approve_groups);
      this.currentView = new GroupsView();
      this.render();
    },

    artists: function() {
      this.priviligeCheck(window.user.role.can_edit_users);
      this.currentView = new ArtistsView();
      this.render();
    },

    authenticationCheck: function() {
      window.user = {role: {}};
      $.post(`${api}/auth`, (data) => {
        window.user = data;
      }).done(() => {
        Backbone.history.loadUrl(Backbone.history.fragment); // Instead of rendering login view, go to appropriate view
      });
    },

    priviligeCheck: function(role) {
      if(!$.isEmptyObject(window.user.role) && !role) {
        Backbone.history.navigate('login', true);
      }
    },

    render: function() {
      var $container = $('.container');
      $container.html('');
      $container.append(this.navigationView.render().$el);
      $container.append(this.currentView.render().$el);
      $container.append(this.footerView.render().$el);
    }
  });

  return AppRouter;
});
