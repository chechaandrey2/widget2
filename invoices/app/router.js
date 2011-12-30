window.Invoices.Router = Backbone.Router.extend({
    initialize: function() {
        // #
        this.route(/^(iteminvoice\/).*$/i, 'iteminvoice', this.iteminvoice);// general page
        this.route(/^(iteminvoice\/(view|edit)\/).*$/i, 'iteminvoice', this.iteminvoice);
        this.route(/^(iteminvoice\/(view|edit)\/([0-9]+)\/).*$/i, 'iteminvoice', this.iteminvoice);
        this.route(/^(invoices\/).*$/i, 'invoices', this.invoices);
        this.route(/^(invoices\/([a-z0-9]+)\/).*$/i, 'invoices', this.invoices);
        this.route(/^(clients\/).*$/i, 'clients', this.clients);
        this.route(/^(clients\/([a-z0-9]+)\/).*$/i, 'clients', this.clients);
        this.route(/^(ps\/).*$/i, 'ps', this.ps);
        this.route(/^(ps\/([a-z0-9]+)\/).*$/i, 'ps', this.ps);
    },
    routes: {
	    "": "iteminvoice"// default page
    },
    isObject: function(arg) {
        return (arg && typeof arg == 'object');
    },
    _views: {},// {name: View}
    invoices: function(query, status) {
        console.log('QUERY: %o; STATUS: %o', query, status);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        if(!this.isObject(this._views['invoices'])) {
		    this._views['invoices'] = new window.Invoices.ViewInvoices({
		        router: this, 
		        collection: new window.Invoices.CollectionInvoices()
		    });
		    this._views['invoices'].render();
		    this._views['invoices'].renderItem(status);
		} else {
		    this._views['invoices'].renderItem(status);
		}
        
        $('#invoicesInvoices').show();
        
    },
    clients: function(query, group) {
        console.log('QUERY: %o; GROUP: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        group = group==undefined?1:parseInt(group);
        
        if(!this.isObject(this._views['clients'])) {
		    this._views['clients'] = new window.Invoices.ViewClients({
		        router: this, 
		        collection: new window.Invoices.CollectionClientsGroups()
		    });
		    this._views['clients'].render();
		    this._views['clients'].renderItem(group);
		} else {
		    this._views['clients'].renderItem(group);
		}
		
		$('#invoicesClients').show();
        
    },
    ps: function(query, group) {
        console.log('QUERY: %o; GROUP: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        group = group==undefined?1:parseInt(group);
        
        if(!this.isObject(this._views['ps'])) {
		    this._views['ps'] = new window.Invoices.ViewPs({
		        router: this, 
		        collection: new window.Invoices.CollectionPsGroups()
		    });
		    this._views['ps'].render();
		    this._views['ps'].renderItem(group);
		} else {
		    this._views['ps'].renderItem(group);
		}
        
        $('#invoicesPs').show();
        
    },
    iteminvoice: function(query, mod, id) {
        console.warn('QUERY: %o; ID: %o; MOD: %o', query, id, mod);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        if(!this.isObject(this._views['invoice'])) {
		    this._views['invoice'] = new window.Invoices.ViewItemInvoice({
		        router: this, 
		        collection: new window.Invoices.CollectionItemInvoice()
		    });
		}
		// cache on referal
		this._views['invoice'].render(id, mod);
		
		$('#invoicesItemInvoice').show();
        
    },
    renderGlobalMenu: function() {
        if(!this.isObject(this._views['globalmenu'])) {
		    this._views['globalmenu'] = new window.Invoices.ViewGlobalMenu({
		        collection: new window.Invoices.CollectionGlobalMenu(), router: this
		    });
		    this._views['globalmenu'].render();
		}
    }
});
