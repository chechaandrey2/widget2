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
        model.set({total: (parseFloat(model.get('price'))*parseInt(model.get('quantity')))}, {silent: true});
        
        var $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        
        if(model.get('nid')>0) {
            $c.before(this.statsTemplate['itemInvoiceEditNewGoodsItem'](model.toJSON()));
        } else {
            $c.before(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
        }
        this.eventAssumeInvoice.call(this);
    },
    eventRemoveGoods: function(model) {
        if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"]', this.el).remove();
        } else {
            $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
        }
        this.eventAssumeInvoice.call(this);
    },
    eventChangeGoods: function(model) {
        model.set({total: (parseFloat(model.get('price'))*parseInt(model.get('quantity')))}, {silent: true});
        
        var val = sprintf("%01.2f", model.get('total'));
        
        if(model.get('gds_uid')>0 && model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"]', this.el)
                .replaceWith(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON()));
            
            model.set({nid: 0}, {silent: true});// hack
        } else if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"] [data-name="total"]', this.el).html(val);
        } else {
            $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"] [data-name="total"]', this.el).html(val);
        }
        this.eventAssumeInvoice.call(this);
    },
    eventNewGoods: function(model) {
        $('#invoicesItemInvoiceItemGoods', this.el).append(this.statsTemplate['itemInvoiceEditGoodsNew']());
        var $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        this.helperGoodsAtcmplt(
            $('[name="title"]', $c).get(0),
            $('[data-name="help"]', $c).get(0)
        );
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
    eventAddLoaderBuyersGroup: function(arg) {
        $('#invoicesInvoiceBuyersGroupLoader', this.el).html(this.statsTemplate['itemInvoiceEditLoaderBuyersGroup'](arg));
    },
    eventRemoveLoaderBuyersGroup: function(arg) {
        $('#invoicesInvoiceBuyersGroupLoader', this.el).empty();
    },
    eventAddLoaderAtcmplt: function(arg) {
        $(arg).html(this.statsTemplate['itemInvoiceEditLoaderAtcmplt']());
    },
    eventRemoveLoaderAtcmplt: function(arg) {
        $(arg).empty();
    },
    eventAddEmpty: function(arg) {
        $(arg).html(this.statsTemplate['itemInvoiceEditAtcmpltEmpty']());
    },
    eventAddLoaderGoodsGroup: function(id) {
        var el = $('#invoicesItemInvoiceItemGoods [data-nid="'+id+'"]', this.el).get(0);
        $(el).hide().after($(this.statsTemplate['itemInvoiceEditLoaderGoodsGroup']()).attr('data-lid', $(el).attr('data-nid')));
    },
    eventRemoveLoaderGoodsGroup: function(id) {
        $('#invoicesItemInvoiceItemGoods [data-lid="'+id+'"]', this.el).remove();
    },
    eventAssumeInvoice: function() {
        var total = 0;
        this.model.get('goods').each(function(model) {
            total += model.get('total');
        });
        this.model.set({total: total});
        $('#invoicesInvoiceGoodsTotal', this.el).html(sprintf('%01.2f', total));
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
        'itemInvoiceEditDialog': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditDialog.tpl']),
        'itemInvoiceEditLoaderBuyersGroup': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditLoaderBuyersGroup.tpl']),
        'itemInvoiceEditLoaderGoodsGroup': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditLoaderGoodsGroup.tpl']),
        'itemInvoiceEditLoaderAtcmplt': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditLoaderAtcmplt.tpl']),
        'itemInvoiceEditAtcmpltEmpty': _.template(window.Invoices.TEMPLATE['invoices/app/itemInvoice/template.itemInvoiceEditAtcmpltEmpty.tpl'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['itemInvoiceEdit'](this.model.toJSON()));
        
        this.eventNewGoods();
        
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
        
        this.helperDialogNewBuyer();
        
        return this;
    },
    events: {
        'change #invoicesItemInvoiceItemGoods [data-state="new"] [name="title"]': 'eventDOMNewGoods',
        'click #invoicesItemInvoiceItemGoods [name="remove"]': 'eventDOMRemoveGoods',
        'change #invoicesItemInvoiceItemGoods [name="price"]': 'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="quantity"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="units"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="title"]':'eventDOMChangeGoods',
        'click #invoicesItemInvoiceItemBuyers [name="remove"]':'eventDOMRemoveBuyer',
        'click [name="addbuyer"]': 'eventDOMOpenDialog',
        'change [name="descr"]': 'eventDOMChangeInvoice',
        'change [name="msg"]': 'eventDOMChangeInvoice',
        'click [name="issued"]': 'eventDOMSendIssuedInvoice',
        'click [name="created"]': 'eventDOMSendCreatedInvoice'
    },
    eventDOMOpenDialog: function(e) {
        
        $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0)).dialog('open');
        
    },
    eventDOMNewGoods: function(e) {
        var data = {}, $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        
        $('input', $c).each(function() {
            data[$(this).attr('name')] = $(this).val();
        });
        
        data['quantity'] = data['quantity'] || 0;
        data['price'] = data['price'] || 0;
        data['nid'] = _.uniqueId();
        
        var model = new window.Invoices.ModelInvoiceGoods();
        var res = model.set(data, {error: function(model, e) {
            console.error('ERROR');
        }});
        
        if(res) {
            this.model.get('goods').add(model, {silent: true});
            $c.removeAttr('data-state');
            $('input, textarea, [data-name="total"]', $c).attr('data-nid', model.get('nid'));
            $c.attr('data-nid', model.get('nid'));
            this.eventChangeGoods.call(this, model);
            this.eventNewGoods.call(this);
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
    eventDOMChangeInvoice: function(e) {
        
        var data = {};
        data[$(e.target).attr('name')] = $(e.target).val();
        this.model.set(data, {silent: true});
        
    },
    eventDOMSendCreatedInvoice: function(e) {
        
        console.warn(this.model.toJSON());
        
    },
    eventDOMSendIssuedInvoice: function(e) {
        
        
        
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
        var name = $(el).attr('name'), data = {};
        
        data[name] = $(el).val();
        
        model.set(data, {error: function() {
                console.warn('ERROR');
            }
        });
    },
    helperBuyerAtcmplt: function() {
        var collectionBuyers, 
            load = false,
            self = this, 
            helpBuyer = this.router.collection.get('invoiceHelpBuyer').get('view');
        
        $('#invoicesItemInvoiceBuyersFind', this.el).iautocomplete({
            el: $('#invoicesItemInvoiceBuyersHelp', this.el).get(0),
            selectorItem: '[data-id]',
            render: function(opt, value) {
                
                collectionBuyers = helpBuyer.render(value, function(progress) {
                    if(progress == 0) {
                        load = true;
                        self.eventAddLoaderAtcmplt(opt.el);
                    } else if(progress == 1) {
                        load = false;
                        self.eventRemoveLoaderAtcmplt(opt.el);
                    }
                });
                
                if(load) {
                    $(opt.el).show();
                    return;
                }
                $(opt.el).empty().show();
                
                if(collectionBuyers.groups && typeof collectionBuyers.groups.each == 'function') {
                    collectionBuyers.groups.each(self.eventAddHelpGroupBuyer, self);
                }
                
                if(collectionBuyers.items && typeof collectionBuyers.items.each == 'function') {
                    collectionBuyers.items.each(self.eventAddHelpBuyer, self);
                }
                
            },
            renderEmpty: function(opt, value) {
                self.eventAddEmpty.call(self, opt.el);
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
                    
                    var id = $(item).attr('data-id'), group;
                    
                    if(collectionBuyers.groups) {
                        model = collectionBuyers.groups.get(id);
                        if(model) group = model.get('title');
                    }
                    
                    self.model.get('buyers').fetch({
                        data: {gr_id: id},
                        add: true,
                        expUnique: 'b_uid',
                        error: function(collection, e, msg) {
                            console.error(e);
                        },
                        success: function(collection) {
                            console.warn('SUCCESS');
                        },
                        loader: function(progress) {
                            if(progress == 0) {
                                self.eventAddLoaderBuyersGroup({group: group});
                            } else if(progress == 1) {
                                self.eventRemoveLoaderBuyersGroup();
                            }
                        }
                    });
                }
                
                $(this).val('').focus();
                
            },
            hided: function(opt) {
                if(load) {
                    $(opt.el).hide();
                } else {
                    $(opt.el).empty().hide();
                }
            },
            entered: function(el, opt) {
                
                self.eventDOMOpenDialog();
                
            }
        });
        
        helpBuyer.eventEndedRequest = function(key) {
        
            $('#invoicesItemInvoiceBuyersFind', self.el).iautocomplete('render');
            
        }
    },
    helperGoodsAtcmplt: function(el, elHelp) {
        var collectionGoodss, 
            self = this, 
            load = false,
            helpGoods = this.router.collection.get('invoiceHelpGoods').get('view');
        
        $(el, this.el).iautocomplete({
            el: $(elHelp, this.el).get(0),
            selectorItem: '[data-id]',
            render: function(opt, value) {
                
                collectionGoodss = helpGoods.render(value, function(progress) {
                    if(progress == 0) {
                        load = true;
                        self.eventAddLoaderAtcmplt(opt.el);
                    } else if(progress == 1) {
                        load = false;
                        self.eventRemoveLoaderAtcmplt(opt.el);
                    }
                });
                
                if(load) {
                    $(opt.el).show();
                    return;
                }
                $(opt.el).empty().show();
                
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
            selected: function(opt, value, item) {
                
                var role = $(item).attr('data-role'), self1 = this;
                
                if(role == 'goods') {
                    // add
                    if(collectionGoodss.items) {
                        
                        if($(this).attr('data-nid')) {
                            
                            var model = self.model.get('goods').get('nid', $(this).attr('data-nid'));
                            
                            var helpModel = collectionGoodss.items.get('gds_uid', $(item).attr('data-id'));
                            
                            if(!self.model.get('goods').get(helpModel.get('gds_uid'))) {
                                model.set(helpModel.toJSON(), {
                                    error: function(model, e) {
                                        console.error('%o; %o', model, e);
                                    }
                                });
                            } else {
                                console.error('Duplicate error %o; %o');
                            }
                        } else {
                            self.model.get('goods').add(collectionGoodss.items.get('gds_uid', $(item).attr('data-id')).toJSON(), {
                                expUnique: 'gds_uid',
                                error: function(model, e) {
                                    console.error('%o; %o', model, e);
                                }
                            });
                            $(this).val('').focus();
                        }
                    
                    }
                    
                } else if(role == 'group') {
                
                    // add el
                    self.eventDOMNewGoods.call(self);
                
                    // fetch
                    self.model.get('goods').fetch({
                        data: {gr_id: $(item).attr('data-id')},
                        add: true,
                        expUnique: 'gds_uid',
                        error: function(collection, e, msg) {
                            console.error(e);
                        },
                        success: function(collection) {
                            
                            self.helperDOMRemoveGoods(self1);
                            
                        },
                        loader: function(progress) {
                            var id = $(self1).attr('data-nid');
                            if(progress == 0) {
                                self.eventAddLoaderGoodsGroup.call(self, id);
                            } else if(progress == 1) {
                                self.eventRemoveLoaderGoodsGroup.call(self, id);
                            }
                        }
                    });
                        
                }
                
                $('#invoicesItemInvoiceItemGoods [data-state="new"] [name="title"]', this.el).focus();
                
            },
            hided: function(opt) {
                if(load) {
                    $(elHelp, self.el).hide();
                } else {
                    $(elHelp, self.el).empty().hide();
                }
            },
            entered: function(el, opt) {
                
                $(this).trigger('change');
                
            }
        });
        
        helpGoods.eventEndedRequest = function(key) {
        
            $('#invoicesItemInvoiceItemGoods [name="title"]', self.el).iautocomplete('render');
            
        }
        
    },
    helperDialogNewBuyer: function() {
        this.el.append(this.statsTemplate['itemInvoiceEditDialog']({id: this.model.get('inv_uid')}));
        var collection = this.collection;
        var self = this;
        $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0), this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Create: function() {
				    var dialog = this;
				    
				    // model create
				    
				},
				Cancel: function() {
				    $(this).dialog('close');
				}
			}
		});
    }
});
