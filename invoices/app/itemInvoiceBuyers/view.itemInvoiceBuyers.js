window.Invoices.itemInvoiceBuyers = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesItemInvoiceBuyersItem', this.el).append(this.statsTemplate['itemInvoiceBuyersItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesItemInvoiceBuyersItem > [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    statsTemplate: {
        'itemInvoiceBuyers': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyers.tpl']),
        'itemInvoiceBuyersItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersItem.tpl'])
    },
    render: function(data) {
        
        this.el.html(this.statsTemplate['itemInvoiceBuyers']());
        
        this.collection.add(data);
        
        return this;
        
    },
    events: {
        'click #invoicesItemInvoiceBuyersItem [name="remove"]': 'eventRemove'
    },
    eventRemove: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        console.warn(model);
        model.id = model.get('b_uid');
        this.collection.remove(model);
    }
});
