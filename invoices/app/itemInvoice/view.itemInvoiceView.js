window.Invoices.ViewItemInvoiceView = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    statsTemplate: {
        'itemInvoiceView': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceView.tpl']),
        'itemInvoiceViewBuyers': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceViewBuyers.tpl'])
    },
    render: function() {
        this.el.html(this.statsTemplate['itemInvoiceView'](this.model.toJSON()));
        
        $('#invoicesItemInvoiceViews', this.el).html(this.statsTemplate['itemInvoiceViewBuyers'].call(this, {
            buyers: this.model.get('buyers').toJSON(), 
            goods: this.model.get('goods').toJSON(), 
            merchater: null, 
            invoice: this.model.toJSON()
        }));
        
        return this;
    }
});
