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
        if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemBuyers [data-nid="'+model.get('nid')+'"]', this.el).remove();
        } else {
            $('#invoicesItemInvoiceItemBuyers [data-id="'+model.get('b_uid')+'"]', this.el).remove();
        }
    },
    eventAddGoods: function(model) {
        var $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        if(model.get('nid')>0) {
            $c.before(this.statsTemplate['itemInvoiceEditNewGoodsItem'](model.toJSON()));
            var $c1 = $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"]', this.el);
            this.helperGoodsAtcmplt(
                $('[name="title"]', $c1).get(0),
                $('[data-name="help"]', $c1).get(0)
            );
        } else {
            $c.before(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
        }
    },
    eventRemoveGoods: function(model) {
        if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"]', this.el).remove();
        } else {
            $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
        }
    },
    eventChangeGoods: function(model) {
        var val = sprintf("%01.2f", model.get('total'));
        if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"] [data-name="total"]', this.el).html(val);
        } else {
            $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"] [data-name="total"]', this.el).html(val);
        }
    },
    eventAddHelpBuyer: function(model) {
        $('#invoicesItemInvoiceBuyersHelp', this.el).append(this.statsTemplate['itemInvoiceEditBuyerHelpItem'](model.toJSON()));
    },
    eventAddHelpGroupBuyer: function(model) {
        $('#invoicesItemInvoiceBuyersHelp', this.el).append(this.statsTemplate['itemInvoiceEditBuyerHelpGroup'](model.toJSON()));
    },
    eventAddHelpGoods: function(model, el) {
        $(el, this.el).append(this.statsTemplate['itemInvoiceEditGoodsHelpItem'](model.toJSON()));
    },
    eventAddHelpGroupGoods: function(model, el) {
        $(el, this.el).append(this.statsTemplate['itemInvoiceEditGoodsHelpGroup'](model.toJSON()));
    },
    eventNewGoods: function() {
        /*
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
        // + autocomplete
        var collectionGoods,
            helpGoods = this.router.collection.get('invoiceHelpGoods').get('view'),
            self = this,
            el = $('#invoicesItemInvoiceItemGoods [data-state="new"] [name="title"]', this.el).get(0);
        $(el).iautocomplete({
            el: $('#invoicesItemInvoiceGoodsHelp', this.el).get(0),
            selectorItem: '[data-id]',
            render: function(opt, value) {
                $('#invoicesItemInvoiceGoodsHelp', self.el).empty().show();
                collectionGoods = helpGoods.render(value);
                
                if(collectionGoods.groups && typeof collectionGoods.groups.each == 'function') {
                    collectionGoods.groups.each(self.eventAddHelpGroupGoods, self);
                }
                if(collectionGoods.items && typeof collectionGoods.items.each == 'function') {
                    collectionGoods.items.each(self.eventAddHelpGoods, self);
                }
            },
            hided: function(opt) {
                $('#invoicesItemInvoiceGoodsHelp', self.el).hide();
            }
        });
        */
        /*
        if(typeof helpGoods.eventEndedRequest != 'function') {
            helpGoods.eventEndedRequest = function(key) {
                $(el).iautocomplete('cmd', 'refresh');
            }
        }
        */
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEdit.tpl']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerItem.tpl']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsItem.tpl']),
        'itemInvoiceEditGoodsNew': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsNew.tpl']),
        'itemInvoiceEditNewGoodsItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditNewGoodsItem.tpl']),
        'itemInvoiceEditBuyerHelpGroup': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpGroup.tpl']),
        'itemInvoiceEditBuyerHelpItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditBuyerHelpItem.tpl']),
        'itemInvoiceEditGoodsHelpGroup': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsHelpGroup.tpl']),
        'itemInvoiceEditGoodsHelpItem': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditGoodsHelpItem.tpl']),
        'itemInvoiceEditDialog': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditDialog.tpl'])
    },
    render: function() {
        /*
        var self = this,
            helpBuyer = this.router.collection.get('invoiceHelpBuyer').get('view');
        
        this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        
        this.model.get('buyers').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.model.get('goods').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.eventNewGoods();
        
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
        */
        
        this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
        
        this.model.get('buyers').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.model.get('goods').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        // add buyer autocomplete
        this.helperBuyerAtcmplt();
        
        // add goods autocomplete
        var $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        this.helperGoodsAtcmplt($('[name="title"]', $c).get(0), $('[data-name="help"]', $c).get(0));
        
        //this.helperDialogNewBuyer();
        
        return this;
    },
    events: {
        'change #invoicesItemInvoiceItemGoods [data-state="new"] [name="title"]': 'eventDOMNewGoods',
        'click #invoicesItemInvoiceItemGoods [name="remove"]':'eventDOMRemoveGoods',
        'change #invoicesItemInvoiceItemGoods [name="price"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="quantity"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="units"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="title"]':'eventDOMChangeGoods',
        'click #invoicesItemInvoiceItemBuyers [name="remove"]':'eventDOMRemoveBuyer'
    },
    eventDOMNewGoods: function(e) {
        var data = {};
        $('#invoicesItemInvoiceItemGoods [data-state="new"] input').each(function() {
            data[$(this).attr('name')] = $(this).val();
        });
        data['total'] = parseInt(data['quantity'] || 0)*parseFloat(data['price'] || 0);
        data['nid'] = _.uniqueId();
        
        var res = true;
        this.model.get('goods').add(data, {error:function() {
            res = false;
            console.error('ERROR');
        }});
        
        if(res) {
            $('#invoicesItemInvoiceItemGoods [data-state="new"] input').val('');
        }
    },
    eventDOMRemoveGoods: function(e) {
        this.helperDOMRemoveGoods(e.target);
    },
    eventDOMRemoveBuyer: function(e) {
        var id = $(e.target).attr('data-id'), nid = $(e.target).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('buyers').get('b_uid', id);
        } else if(nid > 0) {
            model = this.model.get('buyers').get('nid', nid);
        }
        
        if(model) this.model.get('buyers').remove(model);
    },
    eventDOMChangeGoods: function(e) {    
        var id = $(e.target).attr('data-id'), nid = $(e.target).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('goods').get('gds_uid', id);
        } else if(nid > 0) {
            model = this.model.get('goods').get('nid', nid);
        }
        
        if(model) this.helperDOMChangeGoods(model, e.target);
    },
    helperDOMRemoveGoods: function(el) {
        var id = $(el).attr('data-id'), nid = $(el).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('goods').get('gds_uid', id);
        } else if(nid > 0) {
            model = this.model.get('goods').get('nid', nid);
        }
        
        if(model) this.model.get('goods').remove(model);
    },
    helperDOMChangeGoods: function(model, el) {
        var name = $(el).attr('name'), data = {}, silent = true;
        
        if(name == 'quantity') {
            silent = false;
            data[name] = $(el).val();
            data['total'] = parseInt($(el).val() || 0) * model.get('price');
        } else if(name == 'price') {
            silent = false;
            data[name] = $(el).val();
            data['total'] = parseFloat($(el).val() || 0) * model.get('quantity');
        }
        
        model.set(data, {silent:silent, error: function() {
                console.warn('ERROR');
            }
        });
    },
    helperBuyerAtcmplt: function() {
        var collectionBuyers, 
            self = this, 
            helpBuyer = this.router.collection.get('invoiceHelpBuyer').get('view');
        
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
                            expUnique: 'b_uid',
                            error: function(model, e) {console.error('%o; %o', model, e);}
                        });
                    }
                } else if(role == 'group') {
                    // fetch
                    self.model.get('buyers').fetch({
                        data: {gr_id: $(item).attr('data-id')},
                        add: true,
                        expUnique: 'b_uid',
                        error: function(collection, e, msg) {
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
            
                $('#invoicesItemInvoiceBuyersHelp', self.el).empty().hide();
                
            },
            entered: function(el, opt) {
            
                $('#invoicesItemInvoiceEditDialog-'+self.model.get('inv_uid')).dialog('open');
                
            }
        });
        
        helpBuyer.eventEndedRequest = function(key) {
        
            $('#invoicesItemInvoiceBuyersFind', self.el).iautocomplete('cmd', 'render');
            
        }
    },
    helperGoodsAtcmplt: function(el, elHelp) {
        var collectionGoodss, 
            self = this, 
            helpGoods = this.router.collection.get('invoiceHelpGoods').get('view');
        
        $(el, this.el).iautocomplete({
            el: $(elHelp, this.el).get(0),
            selectorItem: '[data-id]',
            render: function(opt, value) {
                
                $(elHelp, self.el).empty().show();
                collectionGoodss = helpGoods.render(value);
                
                if(collectionGoodss.groups && typeof collectionGoodss.groups.each == 'function') {
                    collectionGoodss.groups.each(function(model) {
                        self.eventAddHelpGroupGoods.call(self, model, elHelp);
                    }, self);
                }
                
                if(collectionGoodss.items && typeof collectionGoodss.items.each == 'function') {
                    collectionGoodss.items.each(function(model) {
                        self.eventAddHelpGoods.call(self, model, elHelp);
                    }, self);
                }
                
            },
            renderEmpty: function(opt, value) {
                
                $(elHelp, self.el).html('<h1>Not Found</h1>');
                
            },
            selected: function(opt, value, item) {
                
                var role = $(item).attr('data-role'), self1 = this;
                
                if(role == 'goods') {
                    // add
                    if(collectionGoodss.items) {
                        
                        var res = true;
                        
                        self.model.get('goods').add(collectionGoodss.items.get('gds_uid', $(item).attr('data-id')).toJSON(), {
                            expUnique: 'gds_uid',
                            error: function(model, e) {
                                res = false;
                                console.error('%o; %o', model, e);
                            }
                        });
                        
                        if($(this).attr('data-nid')) {
                            if(res) self.helperDOMRemoveGoods(this);
                        } else {
                            $(this).val('').focus();
                            $('#invoicesItemInvoiceItemGoods [data-state="new"] input', self.el).val('');
                        }
                    
                    }
                    
                } else if(role == 'group') {
                
                    // fetch
                    self.model.get('goods').fetch({
                        data: {gr_id: $(item).attr('data-id')},
                        add: true,
                        expUnique: 'gds_uid',
                        error: function(collection, e, msg) {
                            console.error(e);
                        },
                        success: function(collection) {
                            
                            if($(self1).attr('data-nid')) {
                                self.helperDOMRemoveGoods(self1);
                            } else {
                                $(this).val('').focus();
                                $('#invoicesItemInvoiceItemGoods [data-state="new"] input', self.el).val('');
                            }
                            
                        }
                    });
                        
                }
                
            },
            hided: function(opt) {
            
                $(elHelp, self.el).empty().hide();
                
            }
        });
        
        helpGoods.eventEndedRequest = function(key) {
        
            $('#invoicesItemInvoiceItemGoods [name="title"]', self.el).iautocomplete('cmd', 'render');
            
        }
        
    },
    helperDialogNewBuyer: function() {
        this.el.append(this.statsTemplate['itemInvoiceEditDialog']({id: this.model.get('inv_uid')}));
        var collection = this.collection;
        var self = this;
        $('#invoicesItemInvoiceEditDialog-'+this.model.get('inv_uid'), this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Create: function() {
				    var dialog = this;
				    
				    // model create
				    
				}
			}
		});
    }
    /*
    helperDOMNewGoods: function(collection, el) {
        
        var name = $(el).attr('name'), data = {};
        var $c = this.helperSearchNewModel($(el));
        if(name == 'title') {
            var data = {};
            data['t_id'] = _.uniqueId();
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
            if(model) {helpBuyer = this.router.collection.get('invoiceHelpBuyer').get('view');
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
		        this.eventNewGoods();
            }
        }
        
    }*//*,
     helperSearchNewModel: function(el) {
        if(el.attr('data-state')) return el; else return this.helperSearchNewModel(el.parent());
    }*/
});
