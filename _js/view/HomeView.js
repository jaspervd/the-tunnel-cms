/* global define */
'use strict';

import {api} from 'classes/globals';

define([
  'jquery',
  'underscore',
  'backbone',
  '_hbs/home.hbs'
], ($, _, Backbone, template) => {
  var HomeView = Backbone.View.extend({
    template: template,

    initialize: function () {
      //_.bindAll.apply(_, [this].concat(_.functions(this)));

      $.get(`${api}/users`, (data) => {
        console.log(data);
      });
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return HomeView;
});
