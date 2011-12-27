window.Invoices.CollectionPsGroups = Backbone.Collection.extend({
    model: window.Invoices.ModelPsGroupItem,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_group_gds'
    }
});
