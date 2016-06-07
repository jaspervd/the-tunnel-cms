/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/Creation',
  '_hbs/creation.hbs',
  'model/Score'
], ($, _, Backbone, Creation, template, Score) => {
  var CreationView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'creation',

    events: {
      'click .feature': 'featureHandler',
      'submit form': 'scoreHandler',
      'click .delete': 'deleteHandler',
      'input .range-points': 'pointsHandler',
      'change .range-points': 'pointsHandler'
    },

    initialize: function (options) {
      this.options = options;
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    featureHandler: function (e) {
      e.preventDefault();
      this.model.feature();
    },

    scoreHandler: function (e) {
      e.preventDefault();
      var score = new Score();
      score.set('creation_id', this.model.get('id'));
      score.set('score', this.$el.find('.range-points').val());
      score.save();
      this.options.score = score.toJSON();
      this.render();
    },

    pointsHandler: function(e) {
      this.$el.find('.submit-points').val(`Give ${e.currentTarget.value} points`);
    },

    deleteHandler: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },

    render: function () {
      this.$el.html(this.template({creation: this.model.toJSON(), admin: window.user, score: this.options.score}));
      this.delegateEvents();
      return this;
    }
  });

  return CreationView;
});
