/* global define */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'model/Group',
  '_hbs/group.hbs'
], ($, _, Backbone, Group, template) => {
  var GroupView = Backbone.View.extend({
    template: template,
    tagName: 'article',
    className: 'group',

    events: {
      'click .approve': 'approveHandler',
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    approveHandler: function (e) {
      e.preventDefault();
      this.model.approve();
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

  return GroupView;
});
