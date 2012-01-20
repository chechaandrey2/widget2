window.Invoices.ViewItemInvoiceSend = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    statsTemplate: {
        'itemInvoiceSend': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSend.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['itemInvoiceSend']());
        
        if(this.model.get('save')) {
            this.model.save(null, {
                error: function(model, err) {
                    console.error('ERROR');
                },
                success: function(model) {
                    console.error('SUCCESS');
                }
            });
        }
        
        return this;
        
    }
});
