window.Invoices.CollectionInvoiceGoodss = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoiceGoods,
    initialize: function() {
        
    },
    syncArg: {
        'read': 'data_goods'
    }
});
