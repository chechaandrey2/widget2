window.Invoices.ROUTER = Backbone.Router.extend({
    initialize: function() {
        // #
        this.route(/^(iteminvoice\/).*$/i, 'iteminvoice', this.iteminvoice);// general page
        this.route(/^(iteminvoice\/([a-z0-9]+)\/).*$/i, 'iteminvoice', this.iteminvoice);
        this.route(/^(invoice\/).*$/i, 'invoice', this.invoice);
        this.route(/^(invoice\/([a-z0-9]+)\/).*$/i, 'invoice', this.invoice);
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
    invoice: function(query, group) {
        console.log('QUERY1: %o; GROUP1: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoices_iteminvoice').hide();
        $('#invoices_clients').hide();
        
    },
    clients: function(query, group) {
        console.log('QUERY2: %o; GROUP2: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoices_iteminvoice').hide();
        $('#invoices_clients').hide();
        
        if(!this.isObject(this._views['clients'])) {
		    this._views['clients'] = new window.Invoices.VIEWCLIENTS({
		        router: this, 
		        collection: new window.Invoices.CollectionClientsGroups()
		    });
		    this._views['clients'].render();
		}
		
		$('#invoices_clients').show();
        
    },
    ps: function(query, group) {
        console.log('QUERY2: %o; GROUP2: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoices_iteminvoice').hide();
        $('#invoices_clients').hide();
        
    },
    iteminvoice: function(query, id) {
        console.log('QUERY: %o; ID: %o', query, id);
        
        this.renderGlobalMenu();
        
        $('#invoices_iteminvoice').hide();
        $('#invoices_clients').hide();
        
        if(!this.isObject(this._views['iteminvoice'])) {
		    this._views['iteminvoice'] = new window.Invoices.VIEWITEMINVOICE({
		        model: new window.Invoices.COLLECTIONGLOBALMENU(), router: this
		    });
		    this._views['iteminvoice'].render();
		}
		
		$('#invoices_iteminvoice').show();
        
    },
    renderGlobalMenu: function() {
        if(!this.isObject(this._views['globalmenu'])) {
		    this._views['globalmenu'] = new window.Invoices.VIEWGLOBALMENU({
		        collection: new window.Invoices.COLLECTIONGLOBALMENU(), router: this
		    });
		    this._views['globalmenu'].render();
		}
    }
});
