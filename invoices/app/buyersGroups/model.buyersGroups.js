window.Invoices.ModelBuyersGroups = Backbone.Model.extend({
    defaults: {
        gr_id: 0,
        title: 'new group'
    },
    syncArg: {
        'read': null,
        'create': 'new_group_brs',
        'update': 'edit_group_brs',
        'delete': 'del_group_brs'
    },
    validate: function(attrs) {
        attrs = attrs || {};
        if(!(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', message: 'Attribute "title" - incorrect'};
        //if(this.collection.get('title', attrs.title) && attrs.title != this.get('title')) return {attr: 'title', message: 'Duplicate model'};
    }
});
