window.Invoices.CollectionInvoices = Backbone.Collection.extend({
    model: window.Invoices.ModelInvoices,
    initialize: function() {
        this.add([
            {id: 1, name: 'All'},
            {id: 2, name: 'Draft'},
            {id: 3, name: 'Paid'},
            {id: 4, name: 'Expired'},
            {id: 5, name: 'Closed'},
            {id: 6, name: 'Archived'}
        ]);
    }
});
