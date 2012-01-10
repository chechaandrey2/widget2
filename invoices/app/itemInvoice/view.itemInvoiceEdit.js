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
        var id = model.get('gds_uid'), tid = model.get('t_id');
        tid = (tid+'').replace(/^0&/i, '');
        if(id > 0) {
            $('#invoicesItemInvoiceItemGoods > [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
        } else if(tid.length > 0) {
            $('#invoicesItemInvoiceItemGoods > [data-tid="'+model.get('t_id')+'"]', this.el).remove();
        }
    },
    eventChangeGoods: function(model) {
        var $c = $('#invoicesItemInvoiceItemGoods > [data-tid="'+model.get('t_id')+'"]', this.el);
        if($c.size() < 1 || (model.get('t_id') - 0) < 1) {
            $c = $('#invoicesItemInvoiceItemGoods > [data-id="'+model.get('gds_uid')+'"]', this.el);
        }
        $c.replaceWith(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
    },
    eventAddHelpBuyer: function(model) {
        $('#invoicesItemInvoiceBuyersHelp', this.el).append(this.statsTemplate['itemInvoiceEditBuyerHelpItem'](model.toJSON()));
    },
    eventAddHelpGroupBuyer: function(model) {
        $('#invoicesItemInvoiceBuyersHelp', this.el).append(this.statsTemplate['itemInvoiceEditBuyerHelpGroup'](model.toJSON()));
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEdit.tpl']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl']),
        'itemInvoiceEditGoodsNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsNew.tpl']),
        'itemInvoiceEditBuyerHelpGroup': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpGroup.tpl']),
        'itemInvoiceEditBuyerHelpItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpItem.tpl'])
    },
    render: function() {
    
        var self = this,
            helpBuyer = this.router.collection.get('invoiceHelpBuyer').get('view');
        
        this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        
        this.model.get('buyers').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.model.get('goods').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
        
        // +autocomplete buyers
        var collectionBuyers;
        $('#invoicesItemInvoiceBuyersFind', this.el).iautocomplete({
            el: $('#invoicesItemInvoiceBuyersHelp', this.el).get(0),
            selectorItem: '[data-id]',
            render: function(opt, value) {
                $('#invoicesItemInvoiceBuyersHelp', self.el).empty().show();
                collectionBuyers = helpBuyer.render(value);
                
                if(collectionBuyers.groups && typeof collectionBuyers.groups.each == 'function') {
                    collectionBuyers.groups.each(self.eventAddHelpGroupBuyer, self);
                }
                if(collectionBuyers.items && typeof collectionBuyers.items.each == 'function') {
                    collectionBuyers.items.each(self.eventAddHelpBuyer, self);
                }
            },
            renderEmpty: function(opt, value) {
                $('#invoicesItemInvoiceBuyersHelp', self.el).html('<h1>Not Found</h1>');
            },
            selected: function(opt, value, item) {
                var role = $(item).attr('data-role');
                if(role == 'buyer') {
                    // add
                    if(collectionBuyers.items) {
                        self.model.get('buyers').add(collectionBuyers.items.get('b_uid', $(item).attr('data-id')).toJSON(), {
                            error: function(model, e) {console.error('ERROR');}
                        });
                    }
                } else if(role == 'group') {
                    // fetch
                    self.model.get('buyers').fetch({
                        data: {gr_id: $(item).attr('data-id')},
                        add: true,
                        error: function(collection, e) {
                            console.error(e);
                        },
                        success: function(collection) {
                            console.warn('SUCCESS');
                        }
                    });
                }
                $(this).val('').focus();
            },
            hided: function(opt) {
                $('#invoicesItemInvoiceBuyersHelp', self.el).hide();
            }
        });
        
        helpBuyer.eventEndedRequest = function(key) {
            $('#invoicesItemInvoiceBuyersFind', self.el).iautocomplete('cmd', 'refresh');
        }
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
        var id = $(e.target).attr('data-id');
        var model;
        if(id > 0) {
            model = this.model.get('goods').get('gds_uid', $(e.target).attr('data-id'));
            if(model) this.model.get('goods').remove(model);
        } else {
            model = this.model.get('goods').get('t_id', $(e.target).attr('data-tid'));
            if(model) this.model.get('goods').remove(model);
        }
        
    },
    eventDOMRemoveBuyer: function(e) {
        var model = this.model.get('buyers').get('b_uid', $(e.target).attr('data-id'));
        if(model) this.model.get('buyers').trigger('remove', model);
    },
    eventDOMChangeGoods: function(e) {
        var id = $(e.target).attr('data-id'), tid = $(e.target).attr('data-tid');
        var model = this.model.get('goods').get('gds_uid', id);
        if(model && id > 0) {
            this.helperDOMChangeGoods(model, e.target);
        } else {
            model = this.model.get('goods').get('t_id', tid);
            tid = tid.replace(/^0$/i,'');console.warn('model: %o; tid: %o', this.model.get('goods'), tid);
            if(model && tid.length > 0) {
                this.helperDOMChangeGoods(model, e.target);
            } else {
                this.helperDOMNewGoods(this.model.get('goods'), e.target);
            }
        }
    },
    helperDOMChangeGoods: function(model, el) {
        var name = $(el).attr('name'), data = {};
        if(name == 'quantity') {
            data[name] = $(el).val();
            data['total'] = parseInt($(el).val()) * model.get('price');
        } else if(name == 'price') {
            data[name] = $(el).val();
            data['total'] = parseFloat($(el).val()) * model.get('quantity');
        } else {
            data[name] = $(el).val();
        }
        model.set(data, {
            error: function() {
                console.warn('ERROR');
            }
        });
    },
    helperDOMNewGoods: function(collection, el) {
        var name = $(el).attr('name'), data = {};
        var $c = this.helperSearchNewModel($(el));
        if(name == 'title') {
            var data = {};
            data['t_id'] = uniqid();
            data['title'] = $(el).val();
            data['units'] = $('[name="units"]', $c.get(0)).val();
            data['quantity'] = $('[name="quantity"]', $c.get(0)).val();
            data['price'] = $('[name="price"]', $c.get(0)).val();
            data['total'] = (parseInt(data['quantity']) || 0) * (parseFloat(data['price']) || 0);
            // add arg???
            collection.add(data, {
                silent: true,
                error: function(model, e) {
                    console.error('ERROR');
                }
            });
            var model = collection.get('t_id', data['t_id']);
            if(model) {
                $c.removeAttr('data-state');
		        $c.attr('data-tid', model.get('t_id'));
		        
		        // value
		        $('[data-name="id"]', $c.get(0)).html(model.get('gds_uid'));
		        $('[name="units"]', $c.get(0)).attr('data-tid', data['t_id']);
		        $('[name="title"]', $c.get(0)).attr('data-tid', data['t_id']);
		        $('[name="quantity"]', $c.get(0)).attr('data-tid', data['t_id']);
		        $('[name="price"]', $c.get(0)).attr('data-tid', data['t_id']);
		        $('[data-name="total"]', $c.get(0)).attr('data-tid', data['t_id']).html(sprintf("%01.2f", data['total']));
		        $('[name="remove"]', $c.get(0)).attr('data-tid', data['t_id']).removeAttr('disabled');
		        
		        // append new new
		        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
            }
        }
    },
     helperSearchNewModel: function(el) {
        if(el.attr('data-state')) return el; else return this.helperSearchNewModel(el.parent());
    }
});
