window.Invoices.viewGoods = Backbone.View.extend({
    initialize: function(opt) {
        
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionGoods();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        // fix bug data-state in collection.create
        $('#invoicesGoodsTbody [data-state="new"]', this.el).before(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventChangeEdit: function(model) {
        $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['clientsContactsItemEdit'](model.toJSON()));
            
        $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el).iplaceholder();
    },
    eventNew: function() {
        $('#invoicesGoodsTbody', this.el).append(this.statsTemplate['clientsContactsItemNew']()).iplaceholder();
    },
    eventAddLoadre: function() {
        $('#invoicesGoodsTbody', this.el).append(this.statsTemplate['goodsLoader']())
    },
    eventRemoveLoadre: function() {
        $('#invoicesGoodsTbody [data-sync="goods"]', this.el).remove();
    },
    statsTemplate: {
        'clientsContacts': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goods.tpl']),
        'clientsContactsItem': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goodsItem.tpl']),
        'clientsContactsItemEdit': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goodsItemEdit.tpl']),
        'clientsContactsItemNew': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goodsItemNew.tpl']),
        'clientsContactsDel': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goodsDel.tpl']),
        'goodsLoader': _.template(window.Invoices.TEMPLATE['invoices/app/goods/template.goodsLoader.tpl'])
    },
    render: function(group) {
        
        var self = this;
        
        this.el.html(this.statsTemplate['clientsContacts']());
        
        this.collection.fetch({
            data: {gr_id: group}, 
            add: true,
            error: function(collection, response) {
                console.log('collection: %o; response: %o;', collection, response)
            },
            loader: function(progress) {
                if(progress == 0) self.eventAddLoadre.call(self);
                else if(progress == 1) self.eventRemoveLoadre.call(self);
            }
        });
        
        this.eventNew.call(this);
        
        this.helperGroup = group;
        
        this.helperDialogDel();
        
        return this;
    },
    events: {
        'click [name="save"]':'eventSaveItem',
        'click [name="del"]':'eventDeleteItem',
        'click [name="edit"]':'eventEditItem',
        'change [name="title"]':'eventSaveItemModel',
        'change [name="units"]':'eventSaveItemModel',
        'change [name="price"]':'eventSaveItemModel',
        'change [name="desc_url"]':'eventSaveItemModel'
    },
    helperGroup: 0,
    helperItemDelModel: undefined,
    eventDeleteItem: function(e) {
    
        if(this.helperItemDelModel) return;
        var model = this.collection.get($(e.target).attr('data-id'));
        if(model) {
            this.helperItemDelModel = model;
            $('#invoicesGoodsDialogDel-'+this.helperGroup).dialog("open");
        }
        
    },
    eventSaveItem: function(e) {
        var model = this.collection.get($(e.target).attr('data-id'));
        
        if(model) {
        
            if(e.target.done) return;
            e.target.done = true;
            
            var $c = $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el);
            
            model.save(model.toJSON(), {
                error: function(model, err, arg) {
                    if(err.attr) {// client
                        $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: err.msg});
                    } else {//server
                        $('input[name="title"]', $c).ierror({wrap: true, msg: err.msg || err});
                    }
                    if(e.target.done) e.target.done = false;
                },
                success: function() {
                    if(e.target.done) e.target.done = false;
                },
                loader: function(progress) {
                    if(progress == 0) {
                        $c.addClass('saving');
                    } else if(progress == 1) {
                        $c.removeClass('saving');
                    }
                }
            });
        } else {
            this.helperNewModel.call(this, e.target);
        }
        
    },
    eventEditItem: function(e) {
        
        var model = this.collection.get($(e.target).attr('data-id'));
        if(model) this.eventChangeEdit.call(this, model);
        
    },
    eventSaveItemModel: function(e) {
        var model = this.collection.get($(e.target).attr('data-id'));
        if(model) {
            // save to model
            var arg = model.attributes, $c = $('#invoicesGoodsTbody > [data-id="'+model.get('gds_uid')+'"]', this.el);
            arg[$(e.target).attr('name')] = $(e.target).val() || null;
            
            if(arg['email'] === null && arg['phone_main'] == null) arg['phone_main'] = '';// hack
            
            model.set(arg, {
                error: function(model, err) {
                    $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: err.msg});
                }
            });
        } else {
            // new
            this.helperNewModel.call(this, e.target);
        }
    },
    eventSaveItemModelEnter: function(e) {
        if(e.which != 13) return;
        this.eventSaveItemModel.call(this,e);
    },
    helperNewModel: function(el) {
        var data = {}, self = this, $c = this.helperSearchNewModel($(el), 0);
        
        if(!$c || $c.attr('data-state') != 'new') {
            return;
        }
        
        $c.attr('data-state', 'saving');
        
        $('input[type="text"], textarea', $c).each(function() {
            data[$(this).attr('name')] = $(this).val() || null;
        });
        
        data['gr_id'] = this.helperGroup;
        
        var res = this.collection.create(data, {
            error: function(model, err) {
                $c.attr('data-state', 'new');
                
                if(err.attr) {// client
                    $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: err.msg});
                } else {//server
                    $('input[name="title"]', $c).ierror({wrap: true, msg: err.msg || err});
                }
            },
            success: function(model, res) {
                $c.removeAttr('data-state');
                $('input, textarea, [data-name^="err"]', $c).attr('data-id', model.get('gds_uid'));
                $c.attr('data-id', model.get('gds_uid'));
                self.eventNew.call(self);
            },
            loader: function(progress) {
                if(progress == 0) {
                    $c.addClass('creating');
                } else if(progress == 1) {
                    $c.removeClass('creating');
                }
            }
        });
        
        if(!res) $c.attr('data-state', 'new');
        
    },
    helperSearchNewModel: function(el, i) {
        i++;
        if(i > 7) return null;
        if(el.attr('data-state')) return el; else return this.helperSearchNewModel(el.parent(), i);
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clientsContactsDel']({id: this.helperGroup}));
        var collection = this.collection;
        var self = this;
        $('#invoicesGoodsDialogDel-'+this.helperGroup, this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    var $c = $('#invoicesGoodsTbody > [data-id="'+self.helperItemDelModel.get('gds_uid')+'"]', self.el);
				    
				    self.helperItemDelModel.destroy({
				        error: function(model, err) {
				            console.error('model: %o, error: %o', model, err);
				        },
				        success: function(model) {
				        
				        },
				        loader: function(progress) {
                            if(progress == 0) {
                                $c.addClass('removing');
                            } else if(progress == 1) {
                                $c.removeClass('removing');
                            }
                        }
				    });
                    
                    self.helperItemDelModel = undefined;
                    $(dialog).dialog('close');
				},
				Cancel: function() {
				    self.helperItemDelModel = undefined;
					$(this).dialog("close");
				}
			}
		});
    }
});
