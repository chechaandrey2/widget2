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
        'itemInvoiceBuyersItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersItem.tpl']),
        'itemInvoiceBuyersNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersNew.tpl'])
    },
    render: function(data) {
        
        this.el.html(this.statsTemplate['itemInvoiceBuyers']());
        
        this.collection.add(data);
        
        this.helperDialogNew();
        
        return this;
        
    },
    events: {
        'click #invoicesItemInvoiceBuyersItem [name="remove"]': 'eventDOMRemove',
        'click #invoicesItemInvoiceBuyersNew': 'eventDOMNew',
        'change #invoicesItemInvoiceBuyersFind': 'eventDOMFind'
        // + up, down, enter
    },
    eventDOMRemove: function(e) {
        var model = this.collection.get('b_uid', $(e.target).attr('data-id'));
        model.id = model.get('b_uid');
        this.collection.remove(model);
    },
    eventDOMNew: function(e) {
        $('#invoicesItemInvoiceBuyersNewDialog [name]').val('');
        $('#invoicesItemInvoiceBuyersNewDialog').dialog("open");
    },
    eventDOMFind: function(e) {
    
        
        
    },
    helperDialogNew: function() {
        this.el.append(this.statsTemplate['itemInvoiceBuyersNew']());
        var collection = this.collection;
        $('#invoicesItemInvoiceBuyersNewDialog', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				New: function() {
				
				    var data = {};
				    
				    $('#invoicesItemInvoiceBuyersNewDialog [name]').each(function() {
				        data[$(this).attr('name')] = $(this).val();
				    });
					
					var res = collection.create(data, {
					    error: function(model, e) {console.log(e)}
					});
					
					if(res) { $(this).dialog("close"); }
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperFindData: null
});
