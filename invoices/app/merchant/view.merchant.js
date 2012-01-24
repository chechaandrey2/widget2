window.Invoices.ViewMerchant = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model = new window.Invoices.ModelMerchant();
        
    },
    eventChange: function(model) {
        this.el.html(this.statsTemplate['merchant'].call(this, this.model));
    },
    eventAddLoader: function() {
        this.el.html(this.statsTemplate['merchantLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('[data-sync="merchant"]', this.el).remove();
    },
    statsTemplate: {
        'merchant': _.template(window.Invoices.TEMPLATE['invoices/app/merchant/template.merchant.tpl']),
        'merchantLoader': _.template(window.Invoices.TEMPLATE['invoices/app/merchant/template.merchantLoader.tpl'])
    },
    render: function(opt) {// loader, success, error
    
        opt = opt || {};
    
        if(!this.model.get('id')) {
            this.model.fetch({
                data: {filter: ["s","s_set"]},
                error: opt.error,
                success: function(model) {
                    model.set(model.get('s')).set(model.get('s_set'));
                    if(typeof opt.success == 'function') opt.success.call(this, model);
                },
                loader: opt.loader
            });
        } else {
            if(typeof opt.success == 'function') opt.success.call(this.model, this.model);
        }
        
        return this;
        
    },
    renderDisplay: function(tab) {
        
        var self = this;
        
        if(_.indexOf(['contacts', 'pay', 'general'], tab) < 0) tab = 'contacts';
        
        this.render({
            success: function(model) {
                
                self.eventChange.call(self, model);
                
                $('#invoicesMerchantTabs', self.el).itabs({
                    elTabs: $('#invoicesMerchantTabs #invoicesMerchantTabsList', self.el),
                    selectorItem: '[data-id]',
                    selected: 'merchant/'+tab+'/'
                });
                
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else if(progress == 1) {
                    self.eventRemoveLoader.call(self);
                }
            }
        });
        
        return this;
        
    },
    events: {
        
    }
});
