window.Invoices.ModelClientsGroup = Backbone.Model.extend({
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
        if(!(/^[\w]+$/i.test(attrs.title))) return 'Attribute "title" - incorrect';
    }
});
