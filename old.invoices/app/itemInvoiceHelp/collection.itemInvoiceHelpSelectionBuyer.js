window.Invoices.CollectionItemInvoiceHelpSelectionBuyer = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceHelpSelectionBuyer,
    initialize: function(opt) {
        
    },
    syncArg: {
        read: 'find_buyers'
    },
    findExp: function(arg) {
        var res = new window.Invoices.CollectionItemInvoiceHelpSelectionBuyer();
        var exp = new RegExp(arg,'i');
        this.each(function(model) {
            if(exp.test(model.get('name')) || exp.test(model.get('email')) || exp.test(model.get('phone_main'))) res.add(model);
        });
        return res;
    }
});
