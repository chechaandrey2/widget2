window.Invoices.ViewItemInvoice = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model.get('buyers').bind('add', this.eventAddBuyer, this);
        this.model.get('buyers').bind('remove', this.eventRemoveBuyer, this);
        this.model.get('goods').bind('add', this.eventAddGoods, this);
        this.model.get('goods').bind('remove', this.eventRemoveGoods, this);
        this.model.get('goods').bind('change', this.eventChangeGoods, this);
        
    },
    eventAddBuyer: function(model) {
        $('#invoicesItemInvoiceItemBuyers', this.el).append(this.statsTemplate['itemInvoiceEditBuyerItem'](model.toJSON()));
    },
    eventRemoveBuyer: function(model) {
        $('#invoicesItemInvoiceItemBuyers [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    eventAddGoods: function(model) {
        
    },
    eventRemoveGoods: function(model) {
        
    },
    eventChangeGoods: function(model) {
        
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEdit.tpl']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl']),
        'itemInvoiceView': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceView.tpl']),
        'itemInvoiceSend': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSend.tpl'])
    },
    render: function(mod) {
        
        if(mod == 'view') {
            this.el.html(this.statsTemplate['itemInvoiceView'](this.model.toJSON()));
        } else if(mod == 'send') {
            this.el.html(this.statsTemplate['itemInvoiceSend'](this.model.toJSON()));
        } else {
            this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        }
        var self = this;
        if(this.model.get('b_uid')) {
            this.model.get('buyers').fetch({
                data: {b_uid: this.model.get('b_uid')},
                add: true,
                error:function() {
                    console.warn('ERROR');
                }
            });
        }
        
        var content = this.model.get('content');
        if(this.model.get('goods').length < 1 && content && content.length > 0) {
            var content = JSON.parse(content) || [];
            var ids = [];
            for(var i=0; i<content.length; i++) {
                
            }
            console.log('qwerty');
        }
        
        return this;
        
    },
    events: {
        
    }
});
