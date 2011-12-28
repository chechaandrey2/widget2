window.Invoices.ViewInvoices = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    isObject: function(arg) {
        return (arg && typeof arg == 'object');
    },
    _views: {},// name: View
    el: $('invoicesInvoices'),
    statsTemplate: {
        'invoices': _.template(window.Invoices.TEMPLATE['invoices/app/invoices/template.invoices.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['invoices'](this.collection));
        
        return this;
        
    },
    renderItem: function(st) {
        
    },
    events: {
        
    }
});
