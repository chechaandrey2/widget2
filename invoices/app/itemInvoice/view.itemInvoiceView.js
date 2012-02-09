window.Invoices.ViewItemInvoiceView = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
    },
    eventAddLoader: function() {
        $('#invoicesItemInvoiceViews', this.el).append(this.statsTemplate['itemInvoiceViewLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('#invoicesItemInvoiceViews [data-sync="invoiceView"]', this.el).remove();
    },
    eventAddInvoice: function(data) {
        $('#invoicesItemInvoiceViews', this.el).append(this.statsTemplate['itemInvoiceViewBuyers'].call(this, data));
    },
    statsTemplate: {
        'itemInvoiceView': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceView']),
        'itemInvoiceViewBuyers': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceViewBuyers']),
        'itemInvoiceViewLoader': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceViewLoader']),
        'itemInvoiceViewDialog': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceViewDialog'])
    },
    render: function() {
        var self = this;
        
        this.el.html(this.statsTemplate['itemInvoiceView'].call(this, this.model.toJSON()));
        
        var opts = {
            success: function(model) {
                var mmerchant = model;
                
                self.model.get('_buyers').each(function(model) {
                    self.eventAddInvoice.call(self, {
                        buyer: model.toJSON(), 
                        goods: self.model.get('_goods').toJSON(), 
                        merchant: mmerchant.toJSON(), 
                        invoice: self.model.toJSON()
                    });
                });
            },
            error: function(model, err) {
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else {
                    self.eventRemoveLoader.call(self);
                }
            }
        }
        
        // hack
        if(!this.router.collection.get('merchant')) {
            this.router.helperRenderMerchant.call(this.router);
		    this.router.collection.get('merchant').get('view').render(opts);
        } else {
            this.router.collection.get('merchant').get('view').render(opts);
        }
        // hack
        
        this.helperDialogError.call(this);
        
        return this;
    },
    events: {
        'click [data-name="created"]': 'eventDOMSaveCreated',
        'click [data-name="issued"]': 'eventDOMSaveIssued'
    },
    eventDOMSaveCreated: function(e) {
        this.model.set({is_issued: 0, save: true});
        this.helperSaveInvoice.call(this);
    },
    eventDOMSaveIssued: function(e) {
        this.model.set({is_issued: 1, save: true});
        this.helperSaveInvoice.call(this);
    },
    helperSaveInvoice: function() {
        
        // prepare buyers, goods
        var self = this, buyers = [], goods = [];
            
        this.model.get('_buyers').each(function(model) {
            if(model.get('nid') > 0) 
                buyers.push(model.toJSONExt(model.syncFilter['new'])); 
            else
                buyers.push(model.toJSONExt(model.syncFilter['item']));
        });
        
        this.model.get('_goods').each(function(model) {
            if(model.get('nid') > 0) 
                goods.push(model.toJSONExt(model.syncFilter['new'])); 
            else
                goods.push(model.toJSONExt(model.syncFilter['item']));
        });
            
        var res = this.model.set({buyers: buyers, goods: goods}, {error: function(model, err) {
            var id = model.get('inv_uid');
            if(err.attr == 'buyers') {
                //$('#invoicesItemInvoiceBuyersFind', self.el).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                $('#invoicesItemInvoiceViewDialog [data-id="error"]').html('You did not enter a single buyer');
                $('#invoicesItemInvoiceViewDialog').dialog('open');
            } else if(err.attr == 'goods') {
                //$('#invoicesItemInvoiceItemGoods  [data-state] [name="title"]', self.el)
                //    .ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                $('#invoicesItemInvoiceViewDialog [data-id="error"]').html('You did not enter a single goods');
                $('#invoicesItemInvoiceViewDialog').dialog('open');
            }
        }});
        
        if(res) {
            var id = this.model.get('inv_uid');
            this.router.navigate('invoice/send/'+(id?id+'/':''), true);
        }
        
    },
    helperDialogError: function() {
        $(this.el).append(this.statsTemplate['itemInvoiceViewDialog'].call(this));
        
        $('#invoicesItemInvoiceViewDialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			draggable: false,
            buttons: [
                {text: 'Ok', click: function() {$(this).dialog('close');}}
            ]
        });
    }
});
