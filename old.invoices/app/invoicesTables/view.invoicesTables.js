window.Invoices.ViewInvoicesTables = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesInvoicesTbody', this.el).append(this.statsTemplate['invoicesTablesItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesInvoicesTbody > [data-id="'+model.get('inv_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesInvoicesTbody > [data-id="'+model.get('inv_uid')+'"]')
            .replaceWith(this.statsTemplate['invoicesTablesItem'](model.toJSON()));
    },
    statsTemplate: {
        'invoicesTables': _.template(window.Invoices.TEMPLATE['invoices/app/invoicesTables/template.invoicesTables.tpl']),
        'invoicesTablesItem': _.template(window.Invoices.TEMPLATE['invoices/app/invoicesTables/template.invoicesTablesItem.tpl']),
        'invoicesTablesItemDel': _.template(window.Invoices.TEMPLATE['invoices/app/invoicesTables/template.invoicesTablesItemDel.tpl'])
    },
    render: function(st) {
        
        this.el.html(this.statsTemplate['invoicesTables']());
        
        var data = st===0?{}:{status: st};
        
        this.collection.fetch({
            data: data, 
            add: true,
            error: function(collection, response) {
                console.log('collection: %o; response: %o;', collection, response)
            }
        });
        
        this.helperStatus = st;
        
        this.helperDialogDel();
        
        return this;
        
    },
    events: {
        'click [name="remove"]': 'eventRemoveItem',
        'click [name="issued"]': 'eventUpdateItem'
    },
    eventRemoveItem: function(e) {
        this.helperItemDelModel = this.collection.get('inv_uid', $(e.target).attr('data-id'));
        $('#invoicesInvoicesTablesDialogDel-'+this.helperStatus).dialog("open");
    },
    eventUpdateItem: function(e) {
        
        var model = this.collection.get('inv_uid', $(e.target).attr('data-id'));
        
        model.id = model.get('inv_uid');
        
        model.set({'issued_at': Math.ceil(new Date().getTime()/1000)}, {silent:true});
        
        model.save(null, {
            success: function(model) {
                console.log('SUCCESS');
            },
            error: function(model, e) {
                console.log('ERROR');
            }
        });
        
    },
    helperDialogDel: function(id) {
        this.el.append(this.statsTemplate['invoicesTablesItemDel']({id: this.helperStatus}));
        var self = this;
        $('#invoicesInvoicesTablesDialogDel-'+this.helperStatus, this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    self.helperItemDelModel.id = self.helperItemDelModel.get('inv_uid');// hack
				    
				    self.helperItemDelModel.destroy({success: function(model) {
				        
				        console.warn('Invoices move to archive');
				        
				        $(dialog).dialog('close');
				    }});
                    
                    self.helperItemDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
		});
    },
    helperItemDelModel: undefined,
    helperStatus: 0
});
