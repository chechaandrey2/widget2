window.Invoices.viewBuyers = Backbone.View.extend({
    initialize: function(opt) {
        
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionBuyers();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        // fix bug data-state in collection.create
        $('#invoicesClientsTbody [data-state="new"]', this.el).before(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['clientsContactsItem'](model.toJSON()));
    },
    eventChangeEdit: function(model) {
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el)
            .replaceWith(this.statsTemplate['clientsContactsItemEdit'](model.toJSON()));
            
        $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el).iplaceholder();
    },
    eventNew: function() {
        $('#invoicesClientsTbody', this.el).append(this.statsTemplate['clientsContactsItemNew']()).iplaceholder();
    },
    eventAddLoadre: function() {
        $('#invoicesClientsTbody', this.el).append(this.statsTemplate['buyersLoader']())
    },
    eventRemoveLoadre: function() {
        $('#invoicesClientsTbody [data-sync="buyers"]', this.el).remove();
    },
    statsTemplate: {
        'clientsContacts': _.template(window.Invoices.TEMPLATE['buyers.buyers']),
        'clientsContactsItem': _.template(window.Invoices.TEMPLATE['buyers.buyersItem']),
        'clientsContactsItemEdit': _.template(window.Invoices.TEMPLATE['buyers.buyersItemEdit']),
        'clientsContactsItemNew': _.template(window.Invoices.TEMPLATE['buyers.buyersItemNew']),
        'clientsContactsDel': _.template(window.Invoices.TEMPLATE['buyers.buyersDel']),
        'buyersLoader': _.template(window.Invoices.TEMPLATE['buyers.buyersLoader'])
    },
    render: function(group) {
        
        var self = this;
        
        this.el.html(this.statsTemplate['clientsContacts']());
        
        this.collection.fetch({
            data: {gr_id: group}, 
            add: true,
            error: function(collection, err) {
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
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
        'click [data-name="save"]':'eventSaveItem',
        'click [data-name="del"]':'eventDeleteItem',
        'click [data-name="edit"]':'eventEditItem',
        'change [name="name"]':'eventSaveItemModel',
        'change [name="email"]':'eventSaveItemModel',
        'change [name="phone_main"]':'eventSaveItemModel',
        'change [name="addr"]':'eventSaveItemModel',
        'change [name="comment"]':'eventSaveItemModel'
    },
    helperGroup: 0,
    helperItemDelModel: undefined,
    eventDeleteItem: function(e) {
        
        if(this.helperItemDelModel) return;
        var model = this.collection.get($(e.target).attr('data-id'));
        if(model) {
            this.helperItemDelModel = model;
            $('#invoicesClientsContactsDialogDel-'+this.helperGroup).dialog("open");
        }
        
    },
    eventSaveItem: function(e) {
        var self = this, model = this.collection.get($(e.target).attr('data-id'));
        
        if(model) {
        
            if(e.target.done) return;
            e.target.done = true;
            
            var $c = $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el);
            
            model.save(model.toJSON(), {
                error: function(model, err) {
                    if(err.attr) {// client
                        $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                    }
                    
                    if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                    
                    if(e.target.done) e.target.done = false;
                },
                success: function() {
                    model.change();
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
        var self = this, model = this.collection.get($(e.target).attr('data-id'));
        if(model) {
            // save to model
            var arg = model.attributes, $c = $('#invoicesClientsTbody > [data-id="'+model.get('b_uid')+'"]', this.el);
            arg[$(e.target).attr('name')] = $(e.target).val() || null;
            
            if(arg['email'] === null && arg['phone_main'] == null) arg['phone_main'] = '';// hack
            
            model.set(arg, {
                error: function(model, err) {
                    $(e.target).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
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
                    $('input[name="'+err.attr+'"]', $c).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                }
                
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                
            },
            success: function(model, res) {
                $c.removeAttr('data-state');
                $('input, textarea, [data-name]', $c).attr('data-id', model.get('b_uid'));
                $c.attr('data-id', model.get('b_uid'));
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
        $('#invoicesClientsContactsDialogDel-'+this.helperGroup, this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var dialog = this;
				    
				    var $c = $('#invoicesClientsTbody > [data-id="'+self.helperItemDelModel.get('b_uid')+'"]', self.el);
				    
				    self.helperItemDelModel.destroy({
				        error: function(model, err) {
				            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
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
    },
    helperGetError: function(model, err) {
        switch(err.attr) {
            case 'name': return 'Buyer name - incorrect';
            case 'email': return 'Buyer email - incorrect';
            case 'phone_main': return 'Buyer phone - incorrect';
        }
    }
});
