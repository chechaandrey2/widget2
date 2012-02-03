window.Invoices.ViewInvoicesStatus = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionInvoicesStatus();
        
    },
    statsTemplate: {
        'invoicesStatus': _.template(window.Invoices.TEMPLATE['invoicesStatus.invoicesStatus'])
    },
    render: function() {
    
        this.el.html(this.statsTemplate['invoicesStatus'].call(this, this.collection));
        
        $('#invoicesInvoicesTabs', this.el).itabs({
            elTabs: $('#invoicesInvoicesTabs #invoicesInvoicesTabsList', this.el),
            selectorItem: '[data-id]'
        });
        
        return this;
        
    },
    renderItem: function(st) {
        
        var self = this, status;
        
        if(!_.include(this.collection.pluck('name'), st)) st = 0;
        
        status = st==0?'all':st;
        
        $('#invoicesInvoicesTabs', this.el).itabs('get', 'invoices/'+status+'/', function(el) {
            var view = new window.Invoices.ViewInvoices({router: self.router, el: $(el)});
            view.render(st, status);
        });
        
        $('#invoicesInvoicesTabs', this.el).itabs('select', 'invoices/'+status+'/');
        
        return this;
    }
});
