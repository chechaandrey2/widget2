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
    _viewFind: undefined,
    statsTemplate: {
        'itemInvoiceBuyers': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyers.tpl']),
        'itemInvoiceBuyersItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersItem.tpl']),
        'itemInvoiceBuyersNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersNew.tpl']),
        'itemInvoiceBuyersNewButton': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoiceBuyers/template.itemInvoiceBuyersNewButton.tpl'])
    },
    render: function(data) {
        
        this.el.html(this.statsTemplate['itemInvoiceBuyers']());
        
        this.collection.add(data);
        
        this.helperDialogNew();
        
        var elHelp = $('#invoicesItemInvoiceBuyersHelp', this.el).get(0);
        
        // create view findBuyers
        this._viewFind = new window.Invoices.ViewItemInvoiceBuyersFind({
            router: this.router,
            collection: new window.Invoices.CollectionItemInvoiceBuyersFind(),
            el: elHelp
        });
        
        var self = this;
        
        // autocomplete
        $('#invoicesItemInvoiceBuyersFind', this.el).autocomplete({
            minLength: 2,
            el: elHelp,
            selectorItem: '',
            // events
            selected: function(opts, value) {
                
            },
            render: function(opts, value) {
                this._viewFind.render(value, this);
                $(opts.el).show();
            },
            renderEmpty: function(opts, value, el) {
                $(opts.el).html(self.statsTemplate['itemInvoiceBuyersNewButton']());
                $(opts.el).show();
            },
            hided: function(opts) {
                $(opts.el).hide();
            }
        });
        
        return this;
        
    },
    events: {
        'click #invoicesItemInvoiceBuyersItem [name="remove"]': 'eventDOMRemove',
        'click #invoicesItemInvoiceBuyersNew': 'eventDOMNew'
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
