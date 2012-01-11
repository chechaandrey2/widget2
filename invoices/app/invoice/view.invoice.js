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
                        model.set({id: id});// fix id
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
        
        var self = this, lb = false, lg = false;
        
        // add buyer
        if(!model.get('buyers')) model.set({buyers: new window.Invoices.CollectionInvoiceBuyers()});
        if(model.get('b_uid') && model.get('buyers').length < 1) {
            model.get('buyers').fetch({
                data: {b_uid: model.get('b_uid')},
                success: function(collection) {
                    lb = true;
                    if(lg) self.renderItemLoaded(model, mod);
                },
                error:function(collection, e) {
                    console.error(e);
                }
            });
        } else {
            lb = true;
            if(lg) this.renderItemLoaded(model, mod);
        }
        
        // add goodss
        if(!model.get('goods')) model.set({goods: new window.Invoices.CollectionInvoiceGoodss()});
        var content = model.get('content');
        if(model.get('goods').length < 1 && content && content.length > 0) {
            // -hack content-
            var content = JSON.parse(content) || [];
            var ids = [], args = {};
            for(var i=0; i<content.length; i++) {
                if(content[i]) {
                    var id = content[i]['gds_uid']+'';
                    ids.push(id);
                    args[id] = {quantity: content[i]['quantity'], total: content[i]['total']}
                }
            }
            // -hack content-
            if(ids.length > 0) {
                model.get('goods').fetch({
                    data: {gds_uid: ids},
                    success: function(collection) {
                        collection.each(function(model) {
                            model.set(args[model.get('gds_uid')]);
                        }, collection);
                        
                        model.set({content: null});
                        
                        lg = true;
                        if(lb) self.renderItemLoaded(model, mod);
                    },
                    error: function(collection, e) {
                        console.error(e);
                    }
                });
            } else {
                model.set({content: null});
                
                lg = true;
                if(lb) self.renderItemLoaded(model, mod);
            }
        } else {
            lg = true;
            if(lb) this.renderItemLoaded(model, mod);
        }
        
        return this;
        
    },
    renderItemLoaded: function(model, mod) {
        
        var view;
        
        if(mod == 'view') {
            view = new window.Invoices.ViewItemInvoiceView({
                el: $('#invoicesItemInvoiceItem-view', this.el).undelegate(),// hack
                model: model,
                router: this.router
            });
        } else if(mod == 'send') {
            view = new window.Invoices.ViewItemInvoiceSend({
                el: $('#invoicesItemInvoiceItem-send', this.el).undelegate(),// hack
                model: model,
                router: this.router
            });
        } else {
            view = new window.Invoices.ViewItemInvoiceEdit({
                el: $('#invoicesItemInvoiceItem-edit', this.el).undelegate(),// hack
                model: model,
                router: this.router
            });
        }
        
        view.render();
        
        return this;
        
    }
});
