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
        
        this.collection.fetch({
            //data: {status: st}, 
            add: true,
            error: function(collection, response) {
                console.log('collection: %o; response: %o;', collection, response)
            }
        });
        
        this.helperDialogDel();
        
        return this;
        
    },
    events: {
        'click [name="remove"]': 'eventRemoveItem'
    },
    eventRemoveItem: function(e) {
        this.helperItemDelModel = this.collection.get('inv_uid', $(e.target).attr('data-id'));
        $('#invoicesInvoicesTablesDialogDel').dialog("open");
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['invoicesTablesItemDel']());
        var self = this;
        $('#invoicesInvoicesTablesDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    self.helperItemDelModel.id = self.helperItemDelModel.get('inv_uid');// hack
				    
				    //self.helperItemDelModel.destroy({success: function(model) {
				    //    $(dialog).dialog('close');
				    //}});
                    
                    self.helperItemDelModel = undefined;
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
		});
    },
    helperItemDelModel: undefined
});
