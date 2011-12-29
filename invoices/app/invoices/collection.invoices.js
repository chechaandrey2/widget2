window.Invoices.CollectionInvoices = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoices,
    initialize: function() {
        this.add([
            {id: 0, name: 'Draft'},
            {id: 1, name: 'Issued'},
            {id: 2, name: 'Paid'},
            {id: 3, name: 'Expired'},
            {id: 4, name: 'Closed(Archived)'}
        ]);
    }
});
