window.Invoices.CollectionItemInvoiceBuyersFindGroup = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceBuyersFindGroup,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_group_brs'
    }
});
