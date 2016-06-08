/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/AdminRole',
  '_hbs/role.hbs'
], ($, _, Backbone, Role, template) => {
  var ArtistView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'role',

    events: {
      'click .save': 'saveHandler',
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    saveHandler: function (e) {
      e.preventDefault();
    // set model according to form
    // this.model.save();
      console.log('save');
    },

    deleteHandler: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.delegateEvents();
      return this;
    }
  });

  return ArtistView;
});
