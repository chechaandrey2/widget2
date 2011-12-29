window.Invoices.ViewInvoices = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    isObject: function(arg) {
        return (arg && typeof arg == 'object');
    },
    _views: {},// name: View
    el: $('#invoicesInvoices'),
    statsTemplate: {
        'invoices': _.template(window.Invoices.TEMPLATE['invoices/app/invoices/template.invoices.tpl'])
    },
    render: function() {
    
        this.el.html(this.statsTemplate['invoices'](this.collection));
        
        return this;
        
    },
    renderItem: function(st) {
        
        if(!$('#invoicesInvoicesTabs > #invoicesInvoicesItem-'+st).size()) 
            $('#invoicesInvoicesTabs').append($('<div></div>').attr('id', 'invoicesInvoicesItem-'+st));
        
        if(!this.isObject(this._views[st])) {            
            this._views[st] = new window.Invoices.ViewInvoicesTables({
                router: this.router,
                el: $('#invoicesInvoicesItem-'+st),
                collection: new window.Invoices.CollectionInvoicesTables()
            });
            this._views[st].render(st);
        } else {
            //this._views[st].render(st);
        }
        
    },
    events: {
        
    }
});
