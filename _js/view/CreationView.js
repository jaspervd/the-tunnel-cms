/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/Creation',
  '_hbs/creation.hbs'
], ($, _, Backbone, Creation, template) => {
  var CreationView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'creation',

    events: {
      'click .feature': 'featureHandler',
      'click .score': 'scoreHandler',
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    featureHandler: function (e) {
      e.preventDefault();
      this.model.feature();
    },

    scoreHandler: function (e) {
      e.preventDefault();
      console.log('score');
    },

    deleteHandler: function (e) {
      e.preventDefault();
      this.model.destroy();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.delegateEvents();
      return this;
    }
  });

  return CreationView;
});
