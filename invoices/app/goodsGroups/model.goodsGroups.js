window.Invoices.ModelGoodsGroups = Backbone.Model.extend({
    defaults: {
        gr_id: null,
        title: 'new group'
    },
    idAttribute: 'gr_id',
    syncArg: {
        'read': null,
        'create': 'new_group_gds',
        'update': 'edit_group_gds',
        'delete': 'del_group_gds'
    },
    syncFilter: {
        'create': {there: ['title']},
        'update': {there: ['gr_id', 'title']},
        'delete': {there: ['gr_id']}
    },
    validate: function(attrs) {
        attrs = attrs || {};
        if(!(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', msg: 'Attribute "title" - incorrect'};
        // client validate duplication
        if(this.collection.get('title', attrs.title) && this.get('gr_id') === null) return {attr: 'title', msg: 'Duplicate model'};
    }
});
