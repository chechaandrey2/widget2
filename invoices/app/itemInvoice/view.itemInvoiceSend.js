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
            // prepare buyers, goods
            var buyers = [], goods = [];
            
            this.model.get('_buyers').each(function(model) {
                if(model.get('nid') > 0) 
                    buyers.push(model.toJSONExt(model.syncFilter['new'])); 
                else
                    buyers.push(model.toJSONExt(model.syncFilter['item']));
            });
            
            this.model.get('_goods').each(function(model) {
                if(model.get('nid') > 0) 
                    goods.push(model.toJSONExt(model.syncFilter['new'])); 
                else
                    goods.push(model.toJSONExt(model.syncFilter['item']));
            });
            
            this.model.set({buyers: buyers, goods: goods}, {silent:true});
            
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
