window.Invoices.ViewInvoice = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionInvoices();
        
        this.collection.bind('add', this.eventAdd, this);
        
    },
    eventAdd: function(model) {
        this.el.html(this.statsTemplate['invoice'].call(this, model.toJSON()));
        // +itabs
        $('#invoicesInvoiceTabs', this.el).itabs({
            elTabs: $('#invoicesInvoiceTabs #invoicesItemInvoiceTabsList', this.el),
            selectorItem: '[data-id]'
        });
    },
    eventAddLoadre: function() {
        this.el.html(this.statsTemplate['invoiceLoader'].call(this));
    },
    eventRemoveLoadre: function() {
        $('[data-sync="invoice"]', this.el).remove();
    },
    statsTemplate: {
        'invoice': _.template(window.Invoices.TEMPLATE['invoices/app/invoice/template.invoice.tpl']),
        'invoiceLoader': _.template(window.Invoices.TEMPLATE['invoices/app/invoice/template.invoiceLoader.tpl'])
    },
    render: function(id, mod) {
    
        var self = this;
    
        if(id) {
            if(this.collection.get(id)) {
                // render
                var model = this.collection.get(id);
                this.eventAdd.call(this, model);
                this.renderItem(model, id, mod);
            } else {
                // fetch, render
                this.collection.fetch({
                    data: {inv_uid: id}, 
                    add: true, 
                    success: function(collection) {
                        
                        var model = collection.get(id);
                        if(!model) {
                            self.router.navigate('invoice/edit/', true);
                        } else {
                            self.renderItem(model, id, mod);
                        }
                        
                    },
                    error: function(collection, e) {
                        console.error(e);
                    },
                    loader: function(progress) {
                        if(progress == 0) self.eventAddLoadre.call(self);
                        else if(progress == 1) self.eventRemoveLoadre.call(self);
                    }
                });
            }
        } else {
            // create(select current model) empty model, render
            var model = this.collection.get('inv_uid', null);
            if(!model) {
                model = new window.Invoices.ModelInvoice();
                this.collection.add(model);
            } else {
                this.eventAdd.call(this, model);
            }
                        
            this.renderItem(model, id, mod);
        }
        
        return this;
        
    },
    renderItem: function(model, id, mod) {
        
        // add buyers
        if(!model.get('buyers')) model.set({buyers: new window.Invoices.CollectionInvoiceBuyers()});
        var binfo = model.get('b_info');
        if(model.get('buyers').length < 1 && binfo && binfo.length > 0) {
            // parse b_info
            binfo = JSON.parse(binfo) || [];
            if(!(binfo instanceof Array)) binfo = [binfo];
            model.get('buyers').add(binfo);
        }
        
        // add goodss
        if(!model.get('goods')) model.set({goods: new window.Invoices.CollectionInvoiceGoodss()});
        var content = model.get('content');
        if(model.get('goods').length < 1 && content && content.length > 0) {
            // parse content
            content = JSON.parse(content) || [];
            if(!(binfo instanceof Array)) content = [content];
            model.get('goods').add(content);
        }
        
        this.renderItemLoaded(model, id, mod);
        
        return this;
        
    },
    renderItemLoaded: function(model, id, mod) {
        
        var self = this;
        
        if(!mod) mod = 'edit';
        
        $('#invoicesInvoiceTabs', this.el).itabs('get', 'invoice/'+mod+'/'+(id?id+'/':''), function(el) {
            var view;
        
            if(mod == 'view') {
            
                $('#invoicesInvoiceTabs', this.el).itabs('select', 'invoice/view/'+(id?id+'/':''));
            
                view = new window.Invoices.ViewItemInvoiceView({
                    el: $(el).undelegate(),// hack
                    model: model,
                    router: self.router
                });
            } else if(mod == 'send') {
            
                $('#invoicesInvoiceTabs', this.el).itabs('select', 'invoice/send/'+(id?id+'/':''));
            
                view = new window.Invoices.ViewItemInvoiceSend({
                    el: $(el).undelegate(),// hack
                    model: model,
                    router: self.router
                });
            } else if(mod == 'edit') {
            
                $('#invoicesInvoiceTabs', this.el).itabs('select', 'invoice/edit/'+(id?id+'/':''));
            
                view = new window.Invoices.ViewItemInvoiceEdit({
                    el: $(el).undelegate(),// hack
                    model: model,
                    router: self.router
                });
            }
        
            view.render();
        });
        
        return this;
        
    }
});
