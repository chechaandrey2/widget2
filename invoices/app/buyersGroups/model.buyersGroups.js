window.Invoices.ModelBuyersGroups = Backbone.Model.extend({
    defaults: {
        gr_id: null,
        title: 'new group'
    },
    idAttribute: 'gr_id',
    syncArg: {
        'read': null,
        'create': 'new_group_brs',
        'update': 'edit_group_brs',
        'delete': 'del_group_brs'
    },
    syncFilter: {
        'create': {there: ['title']},
        'update': {there: ['gr_id', 'title']},
        'delete': {there: ['gr_id', 'buyers']}
    },
    validate: function(attrs) {
        attrs = attrs || {};
        if(!(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title'};
        // client validate duplication
        var model = this.collection.get('title', attrs.title);
        if(model && this.get('gr_id') != model.get('gr_id')) return {attr: 'title', arg: true};
    }
});
