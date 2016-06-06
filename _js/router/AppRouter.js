/* global define */
'use strict';

import {api} from 'classes/globals';

define([
  'jquery',
  'underscore',
  'backbone',
  '../view/HomeView'
], ($, _, Backbone, HomeView) => {
  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    routes: {
      '': 'home',
      '*path': 'home'
    },

    home: function() {
      this.render(new HomeView());
    },

    render: function(view) {
      var $container = $('.container');
      $container.html('');
      $container.append(view.render().$el);
    }
  });

  return AppRouter;
});
