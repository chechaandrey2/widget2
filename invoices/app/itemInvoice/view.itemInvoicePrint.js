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
    eventAddInvoice: function(data) {
        $('#invoicesItemInvoicePrint', this.el).append(this.statsTemplate['itemInvoicePrintInvoice'].call(this, data));
    },
    statsTemplate: {
        'itemInvoicePrint': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoicePrint']),
        'itemInvoicePrintInvoice': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoicePrintInvoice']),
        'itemInvoicePrintLoader': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoicePrintLoader'])
    },
    render: function() {
        var self = this;
        
        this.el.html(this.statsTemplate['itemInvoicePrint'].call(this, this.model.toJSON()));
        
        var opts = {
            success: function(model) {
                
                var mmerchant = model;
                
                self.model.get('_buyers').each(function(model) {
                    self.eventAddInvoice.call(self, {
                        buyer: model.toJSON(), 
                        goods: self.model.get('_goods').toJSON(), 
                        merchant: mmerchant.toJSON(), 
                        invoice: self.model.toJSON()
                    });
                });
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
