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
      'submit .update': 'saveHandler',
      'click .delete': 'deleteHandler'
    },

    initialize: function () {
      _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    saveHandler: function (e) {
      e.preventDefault();
      $.ajax({
        url: `${this.model.urlRoot}/${this.model.get('id')}`,
        data: $(e.currentTarget).serialize(),
        type: 'PUT'
      }).success((data) => {
        console.log('succes');
        return data;
      }).fail((data) => {
        console.log('error');
        return data;
      });
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
