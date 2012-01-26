window.Invoices.ViewGoodsGroups = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionGoodsGroups();
        
        this.collectionGoodss = new window.Invoices.CollectionRouters();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        //this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesGoodsGroupsTabsList #invoicesGoodsGroupsNewGroup', this.el)
            .before(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesGoodsGroupsTabsList > [data-id="item-'+model.get('gr_id')+'"]', this.el).remove();
        this.collectionGoodss.remove(this.collectionGoodss.get(model.get('gr_id')));
    },
    eventChange: function(model) {
        $('#invoicesGoodsGroupsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    eventAddLoadre: function() {
        $('#invoicesGoodsGroupsTabsList', this.el).prepend(this.statsTemplate['goodsGroupsLoader']())
    },
    eventRemoveLoadre: function() {
        $('#invoicesGoodsGroupsTabsList [data-sync="goodsGroups"]', this.el).remove();
    },
    eventAddLoaderDialog: function() {
        $('#invoicesGoodsGroupsDialogAdd').append(this.statsTemplate['goodsGroupsLoaderDialog']());
    },
    eventRemoveLoaderDialog: function() {
        $('#invoicesGoodsGroupsDialogAdd [data-sync="goodsGroups"]').remove();
    },
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroups.tpl']),
        'clientsItemGroup': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsItem.tpl']),
        'clientsItemGroupEdit': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsItemEdit.tpl']),
        'clientsAddGroup': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsAdd.tpl']),
        'clientsDelGroup': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsDel.tpl']),
        'goodsGroupsLoader': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsLoader.tpl']),
        'goodsGroupsLoaderDialog': _.template(window.Invoices.TEMPLATE['invoices/app/goodsGroups/template.goodsGroupsLoaderDialog.tpl'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['invoices/app/goodsGroups/l10n.ru.json'])
    },
    render: function(group) {
        var self = this;
        
        this.el.html(this.statsTemplate['clients']());
        
        this.collection.fetch({
            add: true,
            error: function(collection, err) {
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
            },
            success: function() {
                self.helperSelected(group);
            },
            loader: function(progress) {
                if(progress == 0) self.eventAddLoadre.call(self);
                else if(progress == 1) self.eventRemoveLoadre.call(self);
            }
        });
        
        $('#invoicesGoodsGroupsTabs', this.el).itabs({
            elTabs: $('#invoicesGoodsGroupsTabs #invoicesGoodsGroupsTabsList', this.el),
            selectorItem: '[data-id^="item-"]'
        });
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
        return this;
        
    },
    renderItem: function(group) {
        
        var self = this;
        
        $('#invoicesGoodsGroupsTabs', this.el).itabs('get', 'goods/'+group+'/', function(el) {
            if(!self.collectionGoodss.get(group)) {
                self.collectionGoodss.add({
                    id: group,
                    view: new window.Invoices.viewGoods({
                        router: self.router,
                        el: $(el)
                    })
                });
                self.collectionGoodss.get(group).get('view').render(group);
            }
        });
        
        this.helperSelected(group);
        
        return this;
        
    },
    events: {
        'click #invoicesGoodsGroupsAddGroup': 'eventGroupAdd',
        'click #invoicesGoodsGroupsTabsList [data-name="edit"]': 'eventGroupEdit',
        'click #invoicesGoodsGroupsTabsList [data-name="delete"]': 'eventGroupDel',
        'blur #invoicesGoodsGroupsTabsList [name^="name-edit-"]':'eventGroupEditBlur',
        'keypress #invoicesGoodsGroupsTabsList [name^="name-edit-"]':'eventGroupEditEnter'
    },
    eventGroupAdd: function(e) {
        $('#invoicesGoodsGroupsDialogAdd [name="groupName"]').val('');
        $('#invoicesGoodsGroupsDialogAdd').dialog("open");
    },
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return;// General NOT EDITOR
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesGoodsGroupsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroupEdit'](model.toJSON()));
        $('#invoicesGoodsGroupsTabsList [data-id="'+model.get('gr_id')+'"]').focus();
    },
    eventGroupEditBlur: function(e) {
        if(e.target.done) return;
        
        var self = this;
        e.target.done = true;
        
        var model = this.collection.get($(e.target).attr('data-id'));
        
        var $c = $('#invoicesGoodsGroupsTabsList > [data-id="item-'+model.get('gr_id')+'"]');
        
        $(e.target).attr('data-state', 'load');
        
        model.save({'title': $(e.target).val()}, {
            error: function(model, err) {
                
                if(err.attr) {// client
                    $(e.target).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                }
                
                if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
			    
			    if(e.target) e.target.done = false;
            },
            success: function(model) {
                
                self.eventChange.call(self, model);
                
                if(e.target) e.target.done = false;
                
            },
            loader: function(progress) {
                if(progress == 0) {
                    $c.addClass('saving');
                } else if(progress == 1) {
                    $c.removeClass('saving');
                }
            }
       });
    },
    eventGroupEditEnter: function(e) {
        if(e.which != 13) return;
        this.eventGroupEditBlur.call(this,e);
    },
    eventGroupDel: function(e) {
        if(this.helperGroupDelModel) return;
        
        this.helperGroupDelModel = this.collection.get($(e.target).attr('data-id'));
        
        $('#invoicesGoodsGroupsDialogDel [name="groupDelForce"]').get(0).checked = false;
        
        $('#invoicesGoodsGroupsDialogDel').dialog("open");
    },
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['clientsAddGroup']());
        var self = this;
        
        var $e = $('#invoicesGoodsGroupsDialogAdd [name="groupName"]');
        
        $('#invoicesGoodsGroupsDialogAdd', this.el)
        .iplaceholder()
        .dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
				    var dialog = this;
			        self.collection.create({
			                title: $e.val()
			            }, {
			            error: function(model, err) {
			                if(err.attr) {// client
                                $($e.get(0)).ierror({wrap: true, msg: self.helperGetError.call(self, model, err)});
                            }
                            
                            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
                            
				        },
				        success: function(model) {
				            $(dialog).dialog("close");
				        },
				        loader: function(progress) {
                            if(progress == 0) self.eventAddLoaderDialog.call(self);
                            else if(progress == 1) self.eventRemoveLoaderDialog.call(self);
                        }
			        });
				},
				Cancel: function() {
					$(this).dialog("close");
				}
			}
        });
    },
    helperDialogDel: function() {
        this.el.append(this.statsTemplate['clientsDelGroup']());
        var collection = this.collection;
        var self = this;
        $('#invoicesGoodsGroupsDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoicesGoodsGroupsDialogDel [name="groupDelForce"]:checked').size();
				    var dialog = this;
				    
				    var $c = $('#invoicesGoodsGroupsTabsList > [data-id="item-'+self.helperGroupDelModel.get('gr_id')+'"]', self.el);
				    
				    self.helperGroupDelModel.set({'goods': del_force});
				    self.helperGroupDelModel.destroy({
				        error: function(model, err) {
				        
				            if(err.error == 1 || err.msg) $.ierrorDialog('add', err.msg);
				            
				        }, success: function(model) {
				        
				            // move to General & remove buyers current group at "del_force"
				            if(self.helperSelectedNumber == model.id) {
				                // remove "General" selection
				                if(!del_force) self.collectionGoodss.remove(self.collectionGoodss.get(1));
				                self.router.navigate('goods/1/', true);				            
				            }
				        
				        },
				        loader: function(progress) {
                            if(progress == 0) {
                                $c.addClass('removing');
                            } else if(progress == 1) {
                                $c.removeClass('removing');
                            }
                        }
				    });
				    
                    self.helperGroupDelModel = undefined;
                    $(dialog).dialog('close');
				},
				Cancel: function() {
				    self.helperGroupDelModel = undefined;
					$(this).dialog("close");
				}
			}
        });
    },
    helperGroupDelModel: undefined,
    helperSelected: function(id) {
        $('#invoicesGoodsGroupsTabs', this.el).itabs('select', 'goods/'+id+'/');
        this.helperSelectedNumber = id;
    },
    helperSelectedNumber: 0,
    helperGetError: function(model, err) {
        if(err.attr == 'title') {
            if(err.arg) {
                return 'Goods group duplication';
            } else {
                return 'Goods group title - incorrect';
            }
        }
    }
});
