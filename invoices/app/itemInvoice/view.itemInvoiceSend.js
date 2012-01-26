window.Invoices.ViewItemInvoiceSend = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    eventAddError: function(data) {
        $('#invoicesItemInvoiceSendBody', this.el).append(this.statsTemplate['itemInvoiceSendError'].call(this, {msg: data, id: this.model.get('inv_uid')}));
    },
    eventAddSuccess: function(data) {
        $('#invoicesItemInvoiceSendBody', this.el).append(this.statsTemplate['itemInvoiceSendSuccess'].call(this, data));
    },
    eventAddLoader: function() {
        $('#invoicesItemInvoiceSendBody', this.el).html(this.statsTemplate['itemInvoiceSendLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('#invoicesItemInvoiceSendBody [data-sync="invoice"]', this.el).remove();
    },
    statsTemplate: {
        'itemInvoiceSend': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSend.tpl']),
        'itemInvoiceSendLoader': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSendLoader.tpl']),
        'itemInvoiceSendSuccess': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSendSuccess.tpl']),
        'itemInvoiceSendError': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSendError.tpl'])
    },
    render: function() {
        
        var self = this;
        
        this.el.html(this.statsTemplate['itemInvoiceSend'].call(this));
        
        if(this.model.get('save')) {
            
            this.model.save(null, {
                error: function(model, err) {                
                    if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                },
                success: function(model, res) {
                    
                    res = res || {};
                    
                    if(res['ok']) {
                        _.each(res['ok']['invoice'], self.eventAddSuccess, self);
                    } else if(res['errors']) {
                        _.each(res['errors'], self.eventAddError, self);
                    } else {
                        console.error('"ok" & "errors" is not defined');
                    }
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
