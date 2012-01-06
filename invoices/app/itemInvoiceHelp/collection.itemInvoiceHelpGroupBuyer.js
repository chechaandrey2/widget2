window.Invoices.CollectionItemInvoiceHelpGroupBuyer = Backbone.Collection.extend({
    model: window.Invoices.ModelItemInvoiceHelpGroupBuyer,
    initialize: function(opt) {
        
    },
    syncArg: {
        read: 'data_group_brs'
    },
    findExp: function(arg) {
        var res = new window.Invoices.CollectionItemInvoiceHelpGroupBuyer();
        var exp = new RegExp(arg,'i');
        this.each(function(model) {
            if(exp.test(model.get('title'))) res.add(model);
        });
        return res;
    }
});
