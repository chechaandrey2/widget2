window.Invoices.ViewItemInvoiceSend = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    eventAddLoader: function() {
        $('#invoicesItemInvoiceSendBody', this.el).html(this.statsTemplate['itemInvoiceSendLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('#invoicesItemInvoiceSendBody [data-sync="invoice"]', this.el).remove();
    },
    statsTemplate: {
        'itemInvoiceSend': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSend.tpl']),
        'itemInvoiceSendLoader': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSendLoader.tpl'])
    },
    render: function() {
        
        var self = this;
        
        this.el.html(this.statsTemplate['itemInvoiceSend'].call(this));
        
        if(this.model.get('save')) {
            
            this.model.save({buyers: this.model.get('buyers') || [], goods: this.model.get('goods') || []}, {
                error: function(model, err) {
                    if(err.attr) {
                        console.warn('ERROR 0');
                    }
                
                    if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                },
                success: function(model) {
                    console.error('SUCCESS');
                },
                loader: function(progress) {
                    if(progress == 0) {
                        self.eventAddLoader.call(self);
                    } else {
                        self.eventRemoveLoader.call(self);
                    }
                }
            });
            
        }
        
        return this;
        
    }
});
