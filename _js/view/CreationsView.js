/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '_hbs/creations.hbs',
  'collection/Creations',
  'view/CreationView',
  'collection/Scores'
], ($, _, Backbone, template, Creations, CreationView, Scores) => {
  var CreationsView = Backbone.View.extend({
    template: template,

    events: {
      'click .notnominated': 'renderNotNominatedCreations',
      'click .notscored': 'renderNotScoredCreations',
      'click .all': 'renderAllCreations'
    },

    initialize: function () {
      this.getScores();
    },

    getCreations: function() {
      this.collection = new Creations();
      this.collection.on('reset sync', this.renderNotNominatedCreations, this);
      this.collection.fetch({reset: true});
    },

    getScores: function() {
      this.scores = new Scores();
      this.scores.on('reset sync', this.getCreations, this);
      this.scores.fetch({data: $.param({user_id: window.user.id}), reset: true});
    },

    renderCreation: function(creation) {
      var score = this.scores.findWhere({user_id: window.user.id, creation_id: creation.get('id')});
      if(!$.isEmptyObject(score)) {
        score = score.toJSON();
      }
      var view = new CreationView({model: creation, score: score});
      this.$el.find('.creations').append(view.render().$el);
    },

    renderCreations: function(creations) {
      this.render();
      if(!$.isEmptyObject(creations) && creations.length > 0) {
        creations.each(this.renderCreation.bind(this), this);
      }
    },

    renderNotNominatedCreations: function(e) {
      if(!(e instanceof Backbone.Collection)) {
        e.preventDefault();
      }
      this.renderCreations(this.collection.filterNotNominated());
    },

    renderNotScoredCreations: function(e) {
      e.preventDefault();
      this.renderCreations(this.collection.filterNotScored());
    },

    renderAllCreations: function(e) {
      e.preventDefault();
      this.renderCreations(this.collection);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return CreationsView;
});
