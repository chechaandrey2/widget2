window.Invoices.ViewItemInvoice = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        
    },
    eventAdd: function(model) {
        this.el.html(this.statsTemplate['itemInvoice'](model.toJSON()));
    },
    _view: {},// {name: value}
    el: $('#invoicesItemInvoice'),
    statsTemplate: {
        'itemInvoice': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoice.tpl'])
    },
    render: function(id, mod) {
    
        var self = this;
        if(id) {
            this.collection.fetch({data: {inv_uid: id}, add: true, success: function(collection, response) {
                
                // read add user info
                
                var view = new window.Invoices.itemInvoiceBuyers({
                    router: this.route, 
                    collection: new window.Invoices.CollectionItemInvoiceBuyers(),
                    el: $('#invoicesItemInvoiceItemBuyers', this.el)
                });
                
                view.render({// hack
                    b_uid: self.collection.models[0].get('b_uid'),
                    name: self.collection.models[0].get('b_uid')
                });
                
                // view.render(self.collection.models[0].attributes); // ???
                
            }});
        } else {
            // отрисовка пустых коллекций, view
            console.warn('RENDER EMPTY');
        }
        
        return this;
        
    }
});
