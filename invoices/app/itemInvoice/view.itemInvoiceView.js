window.Invoices.ViewItemInvoiceView = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model.get('buyers').unbind('add').bind('add', this.eventAddBuyer, this);
        this.model.get('goods').unbind('add').bind('add', this.eventAddGoods, this);
        
    },
    eventAddBuyer: function(model) {
        //$('#invoicesItemInvoiceItemBuyers', this.el).append(this.statsTemplate['itemInvoiceEditBuyerItem'](model.toJSON()));
    },
    eventAddGoods: function(model) {
        //$('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
    },
    statsTemplate: {
        'itemInvoiceView': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceView.tpl'])
    },
    render: function() {
        console.warn('VIEW');
    }
});
