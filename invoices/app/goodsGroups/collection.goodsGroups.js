window.Invoices.CollectionGoodsGroups = Backbone.Collection.extend({
    model: window.Invoices.ModelGoodsGroups,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_group_gds'
    }
});
