window.Invoices.ViewItemInvoice = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEdit.tpl']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl']),
        'itemInvoiceEditGoodsNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsNew.tpl']),
        'itemInvoiceView': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceView.tpl']),
        'itemInvoiceSend': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceSend.tpl'])
    },
    render: function(mod) {
        
        var view;
        
        if(mod == 'view') {
            //this.el.html(this.statsTemplate['itemInvoiceView'](this.model.toJSON()));
            view = new window.Invoices.ViewItemInvoiceEdit({
                model: this.model
            });
        } else if(mod == 'send') {
            //this.el.html(this.statsTemplate['itemInvoiceSend'](this.model.toJSON()));
        } else {
            //this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        }
        
        var self = this;
        // add buyers
        if(this.model.get('b_uid')) {
            this.model.get('buyers').fetch({
                data: {b_uid: this.model.get('b_uid')},
                add: true,
                error:function() {
                    console.warn('ERROR');
                }
            });
        }
        // add goodss
        var content = this.model.get('content');
        if(this.model.get('goods').length < 1 && content && content.length > 0) {
            var content = JSON.parse(content) || [];
            var ids = [], args = {};
            for(var i=0; i<content.length; i++) {
                if(content[i]) {
                    var id = content[i]['gds_uid']+'';
                    ids.push(id);
                    args[id] = {quantity: content[i]['quantity'], total: content[i]['total']}
                }
            }
            if(ids.length > 0) {
                this.model.get('goods').fetch({
                    data: {gds_uid: ids},
                    success: function(collection) {
                        collection.each(function(model) {
                            model.set(args[model.get('gds_uid')]);
                            
                            if(mod != 'send' && mod != 'view') {
                                this.trigger('add', model);
                            } else if(mod != 'send' && mod != 'edit') {
                                console.log('VIEW');
                            }
                            
                        }, collection);
                        if(mod != 'view' && mod != 'send') self.helperGoodsNew();
                    },
                    error:function() {
                        console.warn('ERROR');
                    }
                });
            }
        } else {
            if(mod != 'view' && mod != 'send') self.helperGoodsNew();
        }
        
        return this;
        
    },
    events: {
        
    },
    helperGoodsNew: function() {
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
    }
});
