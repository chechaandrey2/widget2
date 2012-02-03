window.Invoices.ViewItemInvoiceEdit = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.model.get('_buyers').unbind('add').bind('add', this.eventAddBuyer, this);
        this.model.get('_buyers').unbind('remove').bind('remove', this.eventRemoveBuyer, this);
        this.model.get('_goods').unbind('add').bind('add', this.eventAddGoods, this);
        this.model.get('_goods').unbind('remove').bind('remove', this.eventRemoveGoods, this);
        this.model.get('_goods').unbind('change').bind('change', this.eventChangeGoods, this);
        
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
            $c.before($(this.statsTemplate['itemInvoiceEditNewGoodsItem'](model.toJSON())).iplaceholder());
            var $c1 = $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"]', this.el);
            this.helperGoodsAtcmplt(
                $('[name="title"]', $c1).get(0),
                $('[data-name="help"]', $c1).get(0)
            );
        } else {
            $c.before($(this.statsTemplate['itemInvoiceEditGoodsItem'](model.toJSON())).iplaceholder());
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
        
        if(model.get('nid')>0) {
            $('#invoicesItemInvoiceItemGoods [data-nid="'+model.get('nid')+'"] [data-name="total"]', this.el).html(val);
        } else {
            $('#invoicesItemInvoiceItemGoods [data-id="'+model.get('gds_uid')+'"] [data-name="total"]', this.el).html(val);
        }
        this.eventAssumeInvoice.call(this);
    },
    eventNewGoods: function(model) {
        $('#invoicesItemInvoiceItemGoods', this.el).append($(this.statsTemplate['itemInvoiceEditGoodsNew']()).iplaceholder());
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
        if($(el).size() > 0) {
            $(el).hide().after($(this.statsTemplate['itemInvoiceEditLoaderGoodsGroup'].call(this)).attr('data-lid', $(el).attr('data-nid')));
        } else {
            $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el)
                .before($(this.statsTemplate['itemInvoiceEditLoaderGoodsGroup'].call(this)).attr('data-lid', 0));
        }
        
    },
    eventRemoveLoaderGoodsGroup: function(id) {
        id = id || 0;
        $('#invoicesItemInvoiceItemGoods [data-lid="'+id+'"]', this.el).remove();
    },
    eventAssumeInvoice: function() {
        var total = 0;
        this.model.get('_goods').each(function(model) {
            total += model.get('total');
        });
        this.model.set({total: total});
        $('#invoicesInvoiceGoodsTotal', this.el).html(sprintf('%01.2f', total));
    },
    eventAddLoaderDialog: function() {
        $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0)).append(this.statsTemplate['itemInvoiceEditDialogLoader'].call(this));
    },
    eventRemoveLoaderDialog: function() {
        $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0)+' [data-sync="buyers"]').remove();
    },
    statsTemplate: {
        'itemInvoiceEdit': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEdit']),
        'itemInvoiceEditBuyerItem': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditBuyerItem']),
        'itemInvoiceEditGoodsItem': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditGoodsItem']),
        'itemInvoiceEditGoodsNew': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditGoodsNew']),
        'itemInvoiceEditNewGoodsItem': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditNewGoodsItem']),
        'itemInvoiceEditBuyerHelpGroup': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditBuyerHelpGroup']),
        'itemInvoiceEditBuyerHelpItem': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditBuyerHelpItem']),
        'itemInvoiceEditGoodsHelpGroup': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditGoodsHelpGroup']),
        'itemInvoiceEditGoodsHelpItem': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditGoodsHelpItem']),
        'itemInvoiceEditDialog': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditDialog']),
        'itemInvoiceEditLoaderBuyersGroup': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditLoaderBuyersGroup']),
        'itemInvoiceEditLoaderGoodsGroup': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditLoaderGoodsGroup']),
        'itemInvoiceEditLoaderAtcmplt': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditLoaderAtcmplt']),
        'itemInvoiceEditAtcmpltEmpty': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditAtcmpltEmpty']),
        'itemInvoiceEditDialogLoader': _.template(window.Invoices.TEMPLATE['itemInvoice.itemInvoiceEditDialogLoader'])
    },
    render: function() {
        
        this.el.html($(this.statsTemplate['itemInvoiceEdit'].call(this, this.model.toJSON())).iplaceholder());
        
        this.eventNewGoods();
        
        this.model.get('_buyers').each(function(model) {
            model.collection.trigger('add', model);
        });
        
        this.model.get('_goods').each(function(model) {
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
        'change #invoicesItemInvoiceItemGoods [data-state="new"] [name="price"]': 'eventDOMNewGoods',
        'change #invoicesItemInvoiceItemGoods [data-state="new"] [name="quantity"]': 'eventDOMNewGoods',
        'change #invoicesItemInvoiceItemGoods [data-state="new"] [name="units"]': 'eventDOMNewGoods',
        'click #invoicesItemInvoiceItemGoods [data-name="remove"]': 'eventDOMRemoveGoods',
        'change #invoicesItemInvoiceItemGoods [name="price"]': 'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="quantity"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="units"]':'eventDOMChangeGoods',
        'change #invoicesItemInvoiceItemGoods [name="title"]':'eventDOMChangeGoods',
        'click #invoicesItemInvoiceItemBuyers [data-name="remove"]':'eventDOMRemoveBuyer',
        'click [data-name="addbuyer"]': 'eventDOMOpenDialog',
        'change [name="descr"]': 'eventDOMChangeInvoice',
        'change [name="msg"]': 'eventDOMChangeInvoice',
        'click [data-name="created"]': 'eventDOMSaveCreated',
        'click [data-name="issued"]': 'eventDOMSaveIssued',
        'click [data-name="view"]': 'eventDOMToView'
    },
    eventDOMSaveCreated: function(e) {
        this.model.set({is_issued: 0, save: true});
        this.helperSaveInvoice.call(this);
    },
    eventDOMSaveIssued: function(e) {
        this.model.set({is_issued: 1, save: true});
        this.helperSaveInvoice.call(this);
    },
    eventDOMToView: function(e) {
        
        var self = this;
        
        var arg = this.helperGetItems();
        
        var res = this.model.set({buyers: arg.buyers, goods: arg.goods}, {error: function(model, err) {
            if(err.attr == 'buyers') {
                $('#invoicesItemInvoiceBuyersFind', self.el).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
            } else if(err.attr == 'goods') {
                $('#invoicesItemInvoiceItemGoods  [data-state] [name="title"]', self.el)
                    .ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
            }
        }});
        
        if(res) {
            var id = this.model.get('inv_uid');
            this.router.navigate('invoice/view/'+(id?id+'/':''), true);
        }
        
    },
    helperGetItems: function() {
    
        var buyers = [], goods = [];
        
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
        
        return {buyers: buyers, goods: goods};
        
    },
    helperSaveInvoice: function() {
        
        // prepare buyers, goods
        var self = this;
        
        var arg = this.helperGetItems();
            
        var res = this.model.set({buyers: arg.buyers, goods: arg.goods}, {error: function(model, err) {
            if(err.attr == 'buyers') {
                $('#invoicesItemInvoiceBuyersFind', self.el).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
            } else if(err.attr == 'goods') {
                $('#invoicesItemInvoiceItemGoods  [data-state] [name="title"]', self.el)
                    .ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
            }
        }});
        
        if(res) {
            var id = this.model.get('inv_uid');
            this.router.navigate('invoice/send/'+(id?id+'/':''), true);
        }
        
    },
    eventDOMOpenDialog: function(e, value) {
        
        var $dialog = $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0));
        if(value) $('[name="name"]', $dialog).val(value);
        $dialog.dialog('open');
        
    },
    eventDOMNewGoods: function(e) {
        var data = {}, self = this, $c = $('#invoicesItemInvoiceItemGoods [data-state="new"]', this.el);
        
        $('input', $c).each(function() {
            data[$(this).attr('name')] = $(this).val();
        });
        
        data['quantity'] = data['quantity'] || 1;
        data['price'] = data['price'] || 0;
        data['units'] = data['units'] || 'pcs.';
        data['nid'] = _.uniqueId();
        
        var model = new window.Invoices.ModelInvoiceGoods();
        var res = model.set(data, {error: function(model, err) {
            $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
        }});
        
        if(res) {
            this.model.get('_goods').add(model, {silent: true});
            $c.removeAttr('data-state');
            $('input, textarea, [data-name]', $c).attr('data-nid', model.get('nid'));
            // hack
            $('input[name="quantity"]', $c).val(model.get('quantity'));
            $c.iplaceholder();
            // hack
            $c.attr('data-nid', model.get('nid'));
            this.eventChangeGoods.call(this, model);
            this.eventNewGoods.call(this);
            // hide error
            $('input, textarea', $c).ierror('remove');
        }
    },
    eventDOMRemoveGoods: function(e) {
        this.helperDOMRemoveGoods(e.target);
    },
    eventDOMRemoveBuyer: function(e) {
        var id = $(e.target).attr('data-id'), nid = $(e.target).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('_buyers').get(id);
        } else if(nid > 0) {
            model = this.model.get('_buyers').get('nid', nid);
        }
        
        if(model) this.model.get('_buyers').remove(model);
    },
    eventDOMChangeGoods: function(e) {    
        var id = $(e.target).attr('data-id'), nid = $(e.target).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('_goods').get('gds_uid', id);
        } else if(nid > 0) {
            model = this.model.get('_goods').get('nid', nid);
        }
        
        if(model) this.helperDOMChangeGoods(model, e.target);
    },
    eventDOMChangeInvoice: function(e) {
        
        var data = {};
        data[$(e.target).attr('name')] = $(e.target).val();
        this.model.set(data, {silent: true});
        
    },
    helperDOMRemoveGoods: function(el) {
        var id = $(el).attr('data-id'), nid = $(el).attr('data-nid'), model;
        
        if(id > 0) {
            model = this.model.get('_goods').get(id);
        } else if(nid > 0) {
            model = this.model.get('_goods').get('nid', nid);
        }
        
        if(model) this.model.get('_goods').remove(model);
    },
    helperDOMChangeGoods: function(model, el) {
        var name = $(el).attr('name'), data = {}, self = this;
        
        data[name] = $(el).val();
        
        model.set(data, {
            error: function(model, err) {
                $(el).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
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
            validate: function(value) {
                if(!(/^[0-9a-zA-Zа-яА-ЯёЁ\s]+$/i.test(value))) return false;
                return true;
            },
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
                        self.model.get('_buyers').add(collectionBuyers.items.get('b_uid', $(item).attr('data-id')).toJSON(), {
                            expUnique: 'b_uid',
                            error: function(model, err) {
                                // ERROR(expUnique) DUPLICATION IGNORE
                                //console.error('%o; %o', model, err);
                            }
                        });
                    }
                } else if(role == 'group') {
                    // fetch
                    
                    var id = $(item).attr('data-id'), group;
                    
                    if(collectionBuyers.groups) {
                        model = collectionBuyers.groups.get(id);
                        if(model) group = model.get('title');
                    }
                    
                    self.model.get('_buyers').fetch({
                        data: {gr_id: id},
                        add: true,
                        expUnique: 'b_uid',
                        error: function(collection, err) {
                            // ERROR(expUnique) DUPLICATION IGNORE
                            //console.error('%o; %o', collection, err);
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
                
                self.eventDOMOpenDialog(null, $(this).val());
                
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
            validate: function(value) {
                if(!(/^[0-9a-zA-Zа-яА-ЯёЁ\s]+$/i.test(value))) return false;
                return true;
            },
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
                            
                            var model = self.model.get('_goods').get('nid', $(this).attr('data-nid'));
                            
                            var helpModel = collectionGoodss.items.get('gds_uid', $(item).attr('data-id'));
                            
                            if(!self.model.get('_goods').get(helpModel.get('gds_uid'))) {
                                model.collection.add(helpModel.toJSON());
                                // remove
                                model.collection.remove(model);
                            } else {
                                $(self1).ierror({wrap: true, msg: 'This goods has been selected'});
                            }
                        } else {
                            var res = false;
                            self.model.get('_goods').add(collectionGoodss.items.get($(item).attr('data-id')).toJSON(), {
                                expUnique: 'gds_uid',
                                error: function(model, err) {
                                    if(err.errno == 'add') {
                                        res = true;
                                        $(self1).ierror({wrap: true, msg: 'This goods has been selected'});
                                    }
                                }
                            });
                            if(!res) {
                                $(this).val('').focus();
                            }
                        }
                    
                    }
                    
                } else if(role == 'group') {
                
                    // add el
                    //self.eventDOMNewGoods.call(self);
                
                    // fetch
                    self.model.get('_goods').fetch({
                        data: {gr_id: $(item).attr('data-id')},
                        add: true,
                        expUnique: 'gds_uid',
                        error: function(collection, err) {
                            // ERROR(expUnique) DUPLICATION IGNORE
                            //console.error('%o; %o', collection, err);
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
                    
                    $(this).val('').focus();
                        
                }
                
                //$('#invoicesItemInvoiceItemGoods [data-state="new"] [name="title"]', this.el).focus(); // CALL CONFLICT
                
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
        var self = this;
        $('#invoicesItemInvoiceEditDialog-'+(this.model.get('inv_uid') || 0), this.el)
        .iplaceholder()
        .dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Create: function() {
				    var dialog = this, data = {};
				    
				    $('input[type="text"], textarea', dialog).each(function() {
                        data[$(this).attr('name')] = $(this).val() || null;
                    });
        
                    data['gr_id'] = 1;
				    
				    // model create
				    self.model.get('_buyers').create(data, {
                        error: function(model, err) {
                            if(err.attr) {// client
                                $('input[name="'+err.attr+'"]', dialog).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                            }
                            
                            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                            
                        },
                        success: function(model, res) {
                            
                            $('input[type="text"], textarea', dialog).val('');
                            $(dialog).dialog('close');
                            
                            $('#invoicesItemInvoiceBuyersFind', self.el).val('').focus();
                            
                        },
                        loader: function(progress) {
                            if(progress == 0) {
                                self.eventAddLoaderDialog.call(self);
                            } else if(progress == 1) {
                                self.eventRemoveLoaderDialog.call(self);
                            }
                        }
                    });
				    
				},
				Cancel: function() {
				    $(this).dialog('close');
				}
			}
		});
    },
    helperGetError: function(model, err) {
        switch(err.attr) {
            case 'name': return 'Buyer name - incorrect';
            case 'email': return 'Buyer email - incorrect';
            case 'phone_main': return 'Buyer phone - incorrect';
            case 'units': return 'Buyer units - incorrect';
            case 'price': return 'Buyer price - incorrect';
            case 'quantity': return 'Buyer quantity - incorrect';
            case 'title': return 'Buyer title - incorrect';
            case 'buyers': return 'You did not enter a single buyer';
            case 'goods': return 'You did not enter a single goods';
        }
    }
});
