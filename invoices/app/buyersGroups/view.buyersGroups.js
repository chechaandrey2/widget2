window.Invoices.ViewBuyersGroups = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionBuyersGroups();
        
        this.collectionBuyers = new window.Invoices.CollectionRouters();
        
        this.collection.bind('add', this.eventAdd, this);
        this.collection.bind('remove', this.eventRemove, this);
        //this.collection.bind('change', this.eventChange, this);
        
    },
    eventAdd: function(model) {
        $('#invoicesClientsTabsList #invoicesClientsNewGroup', this.el)
            .before(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    eventRemove: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]', this.el).remove();
        this.collectionBuyers.remove(this.collectionBuyers.get(model.get('gr_id')));
        $('#invoicesClientsTabs [id="invoicesClientsItem-'+model.get('gr_id')+'"]', this.el).remove();
    },
    eventChange: function(model) {
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroup'](model.toJSON()));
    },
    el: $('#invoicesClients'),
    statsTemplate: {
        'clients': _.template(window.Invoices.TEMPLATE['invoices/app/buyersGroups/template.buyersGroups.tpl']),
        'clientsItemGroup': _.template(window.Invoices.TEMPLATE['invoices/app/buyersGroups/template.buyersGroupsItem.tpl']),
        'clientsItemGroupEdit': _.template(window.Invoices.TEMPLATE['invoices/app/buyersGroups/template.buyersGroupsItemEdit.tpl']),
        'clientsAddGroup': _.template(window.Invoices.TEMPLATE['invoices/app/buyersGroups/template.buyersGroupsAdd.tpl']),
        'clientsDelGroup': _.template(window.Invoices.TEMPLATE['invoices/app/buyersGroups/template.buyersGroupsDel.tpl'])
    },
    l10nHash: {
        'ru':JSON.parse(window.Invoices.L10N['invoices/app/buyersGroups/l10n.ru.json'])
    },
    render: function(group) {
        var self = this;
        
        this.el.html(this.statsTemplate['clients']());
        this.collection.fetch({
            add: true, 
            success: function() {
                self.helperSelected(group);
            }
        });
        
        this.helperDialogAdd();
        
        this.helperDialogDel();
        
        
        
        return this;
        
    },
    renderItem: function(group) {
        
        if(!$('#invoicesClientsTabs > #invoicesClientsItem-'+group).size()) 
            $('#invoicesClientsTabs').append($('<div></div>').attr('id', 'invoicesClientsItem-'+group));
        
        if(!this.collectionBuyers.get(group)) {
            this.collectionBuyers.add({
                id: group,
                view: new window.Invoices.viewClientsContacts({
                    router: this.router,
                    el: $('#invoicesClientsItem-'+group)
                })
            });
            this.collectionBuyers.get(group).get('view').render(group);
        }
        
        // selected
        this.helperSelected(group);
        
    },
    events: {
        'click #invoicesClientsAddGroup': 'eventGroupAdd',
        'click #invoicesClientsTabsList [name="edit"]': 'eventGroupEdit',
        'click #invoicesClientsTabsList [name="delete"]': 'eventGroupDel',
        'blur #invoicesClientsTabsList [name^="name-edit-"]':'eventGroupEditBlur',
        'keypress #invoicesClientsTabsList [name^="name-edit-"]':'eventGroupEditEnter'
    },
    eventGroupAdd: function(e) {
        $('#invoicesClientsDialogAdd [name="groupName"]').val('');
        $('#invoicesClientsDialogAdd').dialog("open");
    },
    eventGroupEdit: function(e) {
        if($(e.target).attr('data-id') == 1) return;// General NOT EDITOR
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        $('#invoicesClientsTabsList > [data-id="item-'+model.get('gr_id')+'"]')
            .replaceWith(this.statsTemplate['clientsItemGroupEdit'](model.toJSON()));
        $('#invoicesClientsTabsList [data-id="'+model.get('gr_id')+'"]').focus();
    },
    eventGroupEditBlur: function(e) {
        if(e.target.done) return;
        
        var self = this;
        e.target.done = true;
    
        var model = this.collection.get('gr_id', $(e.target).attr('data-id'));
        model.id = model.get('gr_id');
        
        $(e.target).attr('data-state', 'load');
        
        model.save({'title': $(e.target).val()}, {
            error: function(model, err) {
            
                if(err.attr) {// client
                    $.ierror({el: e.target, msg: err.message, position: {at: 'center bottom', my: 'center top'}});
                } else {//server
                    $.ierror({el: e.target, msg: err.msg || err, position: {at: 'center bottom', my: 'center top'}});
                }
			    
			    if(e.target) e.target.done = false;
            },
            success: function(model) {
                
                self.eventChange.call(self, model);
                
                if(e.target) e.target.done = false;
                
            }
       });
    },
    eventGroupEditEnter: function(e) {
        if(e.which != 13) return;
        this.eventGroupEditBlur.call(this,e);
    },
    eventGroupDel: function(e) {
        if(this.helperGroupDelModel) return;
        
        this.helperGroupDelModel = this.collection.get('gr_id', $(e.target).attr('data-id'));
        
        $('#invoicesClientsDialogDel [name="groupDelForce"]').get(0).checked = false;
        
        $('#invoicesClientsDialogDel').dialog("open");
    },
    helperDialogAdd: function() {
        this.el.append(this.statsTemplate['clientsAddGroup']());
        var collection = this.collection;
        
        var $e = $('#invoicesClientsDialogAdd [name="groupName"]');
        
        $('#invoicesClientsDialogAdd', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Add: function() {
				    var dialog = this;
			        collection.create({
			            title: $e.val()
			        }, {
			            error: function(model, err) {
				            if(err.attr) {// client
                                $.ierror({el: $e.get(0), msg: err.message, position: {at: 'center bottom', my: 'center top'}});
                            } else {//server
                                $.ierror({el: $e.get(0), msg: err.msg || err, position: {at: 'center bottom', my: 'center top'}});
                            }
				        },
				        success: function(model) {
				            $(dialog).dialog("close");
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
        $('#invoicesClientsDialogDel', this.el).dialog({
            autoOpen:false,
            resizable: false,
			modal: true,
			buttons: {
				Remove: function() {
				    var del_force = $('#invoicesClientsDialogDel [name="groupDelForce"]:checked').size();
				    var dialog = this;
				    
				    self.helperGroupDelModel.id = self.helperGroupDelModel.get('gr_id');// hack
				    self.helperGroupDelModel.set({'buyers': del_force});
				    self.helperGroupDelModel.destroy({error: function(model, err) {
				        console.error('model: %o, error: %o', model, err);
				    }, success: function(model) {
				        
				        // move to General & remove buyers current group at "del_force"
				        if(self.helperSelectedNumber == model.id) {
				            // remove "General" selection
				            self.collectionBuyers.remove(self.collectionBuyers.get(1));
				            self.router.navigate('buyers/1/', true);				            
				        }
				        
				    }});
				    
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
        $('#invoicesClientsTabs #invoicesClientsTabsList', this.el).children().each(function() {
            if($(this).attr('data-id') != 'item-'+id) $(this).removeAttr('data-selected');
        });
        $('#invoicesClientsTabs [id^="invoicesClientsItem-"]', this.el).hide();
        $('#invoicesClientsTabs #invoicesClientsTabsList [data-id="item-'+id+'"]', this.el).attr('data-selected', 'selected');
        $('#invoicesClientsTabs [id="invoicesClientsItem-'+id+'"]', this.el).show();
        this.helperSelectedNumber = id;
    },
    helperSelectedNumber: 0
});
