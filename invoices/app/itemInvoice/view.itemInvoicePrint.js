window.Invoices.ViewItemInvoicePrint = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    eventAddLoader: function() {
        $('#invoicesItemInvoicePrint', this.el).append(this.statsTemplate['itemInvoicePrintLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('#invoicesItemInvoicePrint [data-sync="invoiceView"]', this.el).remove();
    },
    statsTemplate: {
        'itemInvoicePrint': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoicePrint']),
        //'itemInvoiceViewBuyers': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceViewBuyers']),
        'itemInvoicePrintLoader': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoicePrintLoader'])
    },
    render: function() {
        var self = this;
        
        this.el.html(this.statsTemplate['itemInvoicePrint'].call(this, this.model.toJSON()));
        
        var opts = {
            success: function(model) {
                $('#invoicesItemInvoicePrint', self.el).html(self.statsTemplate['itemInvoiceViewBuyers'].call(self, {
                    buyers: self.model.get('_buyers').toJSON(), 
                    goods: self.model.get('_goods').toJSON(), 
                    merchant: model.toJSON(), 
                    invoice: self.model.toJSON()
                }));
            },
            error: function(model, err) {
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else {
                    self.eventRemoveLoader.call(self);
                }
            }
        }
        
        // hack
        if(!this.router.collection.get('merchant')) {
            this.router.helperRenderMerchant.call(this.router);
		    this.router.collection.get('merchant').get('view').render(opts);
        } else {
            this.router.collection.get('merchant').get('view').render(opts);
        }
        // hack
        
        return this;
    },
    events: {}
});
