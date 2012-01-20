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
            buyers: this.model.get('_buyers').toJSON(), 
            goods: this.model.get('_goods').toJSON(), 
            merchater: null, 
            invoice: this.model.toJSON()
        }));
        
        return this;
    },
    events: {
        'click [name="created"]': 'eventDOMSaveCreated',
        'click [name="issued"]': 'eventDOMSaveIssued'
    },
    eventDOMSaveCreated: function(e) {
        this.model.set({is_issued: 0, save: true});
        var id = this.model.get('inv_uid');
        this.router.navigate('invoice/send/'+(id?id+'/':''), true);
    },
    eventDOMSaveIssued: function(e) {
        this.model.set({is_issued: 1, save: true});
        var id = this.model.get('inv_uid');
        this.router.navigate('invoice/send/'+(id?id+'/':''), true);
    }
});
