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
    validate: function(attrs) {
        attrs = attrs || {};
        if(!(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return {attr: 'title', msg: 'Attribute "title" - incorrect'};
        // client validate duplication
        if(this.collection.get('title', attrs.title) && this.get('gr_id') === null) return {attr: 'title', msg: 'Duplicate model'};
    }
});
