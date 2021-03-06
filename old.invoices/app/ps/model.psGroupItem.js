window.Invoices.ModelPsGroupItem = Backbone.Model.extend({
    defaults: {
        gr_id: 0,
        title: 'new group'
    },
    syncArg: {
        'read': null,
        'create': 'new_group_gds',
        'update': 'edit_group_gds',
        'delete': 'del_group_gds'
    },
    validate: function(attrs) {
        attrs = attrs || {};
        if(!(/^[\w\sа-яА-ЯёЁ]+$/i.test(attrs.title))) return 'Attribute "title" - incorrect';
    }
});
