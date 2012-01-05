window.Invoices.ViewInvoice = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        
    },
    eventAdd: function(model) {
        this.el.html(this.statsTemplate['invoice'](model.toJSON()));
    },
    el: $('#invoicesItemInvoice'),
    statsTemplate: {
        'invoice': _.template(window.Invoices.TEMPLATE['invoices/app/invoice/template.invoice.tpl'])
    },
    render: function(id, mod) {
    
        var self = this;
    
        if(id) {
            if(this.collection.get(id)) {
                // render
                this.renderItem(this.collection.get(id), mod);
            } else {
                // fetch, render
                this.collection.fetch({
                    data: {inv_uid: id}, 
                    add: true, 
                    success: function(collection) {
                    
                        var model = collection.get('inv_uid', id);
                        model.id = id;// fix id
                        self.renderItem(model, mod);
                        
                    },
                    error: function(collection, e) {
                        console.error(e);
                    }
                });
            }
        } else {
            // create empty model, render
            var model = new window.Invoices.ModelInvoice();
            this.collection.add(model);
            this.renderItem(model, mod);
        }
        
        return this;
        
    },
    renderItem: function(model, mod) {
        var el;
        mod = (mod+'').toLowerCase();
        if(mod == 'view') {
            el = $('#invoicesItemInvoiceItem-view', this.el);
        } else if(mod == 'send') {
            el = $('#invoicesItemInvoiceItem-send', this.el);
        } else {
            el = $('#invoicesItemInvoiceItem-edit', this.el);
        }
        
        var view = new window.Invoices.ViewItemInvoice({
            model: model,
            router: this.router,
            el: el
        });
        
        view.render(mod);
        
    }
});
