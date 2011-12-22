window.Invoices.COLLECTIONGLOBALMENU = Backbone.Collection.extend({
    model: window.Invoices.MODELGLOBALMENU,
    initialize: function() {
        this.add([
            {name: 'products/services', hash: 'ps/'},
            {name: 'clients', hash: 'clients/'},
            {name: 'invoices', hash: 'invoice/'},
            {name: 'new invoice', hash: 'iteminvoice/'}
        ]);
    }
});
