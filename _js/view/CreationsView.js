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

    initialize: function () {
      this.getScores();
    },

    getCreations: function() {
      this.collection = new Creations();
      this.collection.on('reset sync', this.addAllCreations, this);
      this.collection.fetch({data: $.param({nominated: 0}), reset: true});
    },

    getScores: function() {
      this.scores = new Scores();
      this.scores.on('reset sync', this.getCreations, this);
      this.scores.fetch({data: $.param({user_id: window.user.id}), reset: true});
    },

    addCreation: function(creation) {
      var score = this.scores.findWhere({user_id: window.user.id, creation_id: creation.get('id')});
      if(!$.isEmptyObject(score)) {
        score = score.toJSON();
      }
      var view = new CreationView({model: creation, score: score});
      this.$el.find('.creations').append(view.render().$el);
    },

    addAllCreations: function() {
      this.render();
      this.collection.each(this.addCreation.bind(this), this);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return CreationsView;
});
