window.Invoices.ViewItemInvoiceEdit = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model.get('buyers').unbind('add').bind('add', this.eventAddBuyer, this);
        this.model.get('buyers').unbind('remove').bind('remove', this.eventRemoveBuyer, this);
        this.model.get('goods').unbind('add').bind('add', this.eventAddGoods, this);
        this.model.get('goods').unbind('remove').bind('remove', this.eventRemoveGoods, this);
        this.model.get('goods').unbind('change').bind('change', this.eventChangeGoods, this);
        
    },
    eventAddBuyer: function(model) {
        $('#invoicesItemInvoiceItemBuyers', this.el).append(this.statsTemplate['itemInvoiceEditBuyerItem'](model.toJSON()));
    },
    eventRemoveBuyer: function(model) {
        $('#invoicesItemInvoiceItemBuyers [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    eventAddGoods: function(model) {
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
    },
    eventRemoveGoods: function(model) {
        $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
    },
    eventChangeGoods: function(model) {
        
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEdit.tpl']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl']),
        'itemInvoiceEditGoodsNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsNew.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        
        this.model.get('buyers').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.model.get('goods').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
        
        // +autocomplete buyers
        // +autocomplete goods
        
    },
    events: {
        'click #invoicesItemInvoiceItemGoods [name="remove"]':'eventDOMRemoveGoods',
        'change #invoicesItemInvoiceItemGoods [name="price"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="quantity"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="units"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="title"]':'eventDOMChangeGoods',
        'click #invoicesItemInvoiceItemBuyers [name="remove"]':'eventDOMRemoveBuyer'
    },
    eventDOMRemoveGoods: function(e) {
        var model = this.model.get('goods').get('gds_uid', $(e.target).attr('data-id'));
        if(model) this.model.get('goods').trigger('remove', model);
    },
    eventDOMRemoveBuyer: function(e) {
        var model = this.model.get('buyers').get('b_uid', $(e.target).attr('data-id'));
        if(model) this.model.get('buyers').trigger('remove', model);
    },
    eventDOMChangeGoods: function(e) {
        var model = this.model.get('goods').get('gds_uid', $(e.target).attr('data-id'));
        if(model) {
            var name = $(e.target).attr('name'), data = {};
            if(name == 'quantity') {
                data[name] = $(e.target).val();
                data['total'] = parseInt($(e.target).val()) * model.get('price');
            } else if(name == 'price') {
                data[name] = $(e.target).val();
                data['total'] = parseFloat($(e.target).val()) * model.get('quantity');
            } else {
                data[name] = $(e.target).val();
            }
            model.set(data, {error: function() {
                console.warn('ERROR');
            }});
            // render total
        }
    }
});
