window.Invoices.ViewInvoices = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionInvoices();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        this.helperPrepareBinfo(model);
        $('#invoicesInvoicesTbody', this.el).append(this.statsTemplate['invoicesItem'].call(this, model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesInvoicesTbody [data-id="'+model.get('inv_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        
        if(this.helperStatus == 'created') {
            this.eventRemove(model);
        } else {
            // new Date, new status
            $('#invoicesInvoicesTbody > [data-id="'+model.get('inv_uid')+'"]')
                .replaceWith(this.statsTemplate['invoicesItem'].call(this, model.toJSON()));
        }
        
    },
    eventAddLoader: function() {
        $('#invoicesInvoicesTbody', this.el).append(this.statsTemplate['invoicesLoader'].call(this));
    },
    eventRemoveLoader: function() {
        $('#invoicesInvoicesTbody [data-sync="invoices"]', this.el).remove();
    },
    statsTemplate: {
        'invoices': _.template(window.Invoices.TEMPLATE['invoices/app/invoices/template.invoices.tpl']),
        'invoicesItem': _.template(window.Invoices.TEMPLATE['invoices/app/invoices/template.invoicesItem.tpl']),
        'invoicesLoader': _.template(window.Invoices.TEMPLATE['invoices/app/invoices/template.invoicesLoader.tpl'])
    },
    render: function(st, status) {
        
        var self = this;
        
        this.el.html(this.statsTemplate['invoices'].call(this));
        
        var data = st===0?{}:{status: status};
        
        this.collection.fetch({
            data: data, 
            add: true,
            error: function(collection, err) {
                console.error('%o, %o', collection, err);
            },
            loader:function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else if(progress == 1) {
                    self.eventRemoveLoader.call(self);
                }
            }
        });
        
        this.helperStatus = status;
        
        return this;
        
    },
    events: {
        'click [name="issued"]': 'eventUpdateItem'
    },
    helperPrepareBinfo: function(model) {
        var binfo = model.get('b_info');
        if(binfo && binfo.length > 0) {
            binfo = JSON.parse(binfo) || [];
            if(!(binfo instanceof Array)) binfo = [binfo];
            model.set({buyers: binfo}, {silent: true});
        } else {
            model.set({buyers: []}, {silent: true});
        }
    },
    helperStatus: undefined,
    eventUpdateItem: function(e) {
        
        var model = this.collection.get($(e.target).attr('data-id'));
        
        var $c = $('#invoicesInvoicesTbody [data-id="'+model.get('inv_uid')+'"]', this.el);
        
        // 2011-11-19 15:02:55 -> H:i:s d.m.Y
        model.set({status: 'issued', issued_at: date('Y-m-d H:i:s', new Date())}, {silent: true});
        
        model.save(null, {
            error: function(model, err) {
                console.error('%o, %o', model, err);
            },
            loader: function(progress) {
                if(progress == 0) {
                        $c.addClass('saving');
                    } else if(progress == 1) {
                        $c.removeClass('saving');
                    }
            }
        });
        
    }
});
