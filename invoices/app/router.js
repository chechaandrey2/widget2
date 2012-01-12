window.Invoices.Router = Backbone.Router.extend({
    initialize: function() {
        this.route(/^(iteminvoice\/).*$/i, 'iteminvoice', this.iteminvoice);// general page
        this.route(/^(iteminvoice\/(view|edit|send)\/).*$/i, 'iteminvoice', this.iteminvoice);
        this.route(/^(iteminvoice\/(view|edit|send)\/([0-9]+)\/).*$/i, 'iteminvoice', this.iteminvoice);
        this.route(/^(invoices\/).*$/i, 'invoices', this.invoices);
        this.route(/^(invoices\/([a-z0-9]+)\/).*$/i, 'invoices', this.invoices);
        this.route(/^(buyers\/).*$/i, 'buyers', this.buyers);
        this.route(/^(buyers\/([a-z0-9]+)\/).*$/i, 'buyers', this.buyers);
        this.route(/^(ps\/).*$/i, 'ps', this.ps);
        this.route(/^(ps\/([a-z0-9]+)\/).*$/i, 'ps', this.ps);
        
        // collection routers
        this.collection = new window.Invoices.CollectionRouters();
    },
    routes: {
	    "": "iteminvoice"// default page
    },
    invoices: function(query, status) {
        console.log('QUERY: %o; STATUS: %o', query, status);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        if(!this.collection.get('invoices')) {
            this.collection.add({
                id: 'invoices',
                view: new window.Invoices.ViewInvoices({
		            router: this, 
		            collection: new window.Invoices.CollectionInvoicess()
		        })
            });
		    this.collection.get('invoices').get('view').render();
		    this.collection.get('invoices').get('view').renderItem(status);
        } else {
            this.collection.get('invoices').get('view').renderItem(status);
        }
        
        $('#invoicesInvoices').show();
        
    },
    buyers: function(query, group) {
        console.log('QUERY: %o; GROUP: %o', query, group);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        group = parseInt(group);
        group = group > 0?group:1;
        
        // buyersGroups
        if(!this.collection.get('buyers')) {
            this.collection.add({
                id: 'buyers',
                view: new window.Invoices.ViewBuyersGroups({router: this})
            });
		    this.collection.get('buyers').get('view').render(group);
		    this.collection.get('buyers').get('view').renderItem(group);
        } else {
            this.collection.get('buyers').get('view').renderItem(group);
        }
        
        // help
        var help = this.collection.get('invoiceHelpBuyer');
        if(help) this.collection.remove(help);
        
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
        
        if(!this.collection.get('ps')) {
            this.collection.add({
                id: 'ps',
                view: new window.Invoices.ViewPs({
		            router: this, 
		            collection: new window.Invoices.CollectionPsGroups()
		        })
            });
		    this.collection.get('ps').get('view').render();
		    this.collection.get('ps').get('view').renderItem(group);
        } else {
            this.collection.get('ps').get('view').renderItem(group);
        }
        
        // help
        var help = this.collection.get('invoiceHelpGoods');
        if(help) this.collection.remove(help);
        
        $('#invoicesPs').show();
        
    },
    iteminvoice: function(query, mod, id) {
        console.warn('QUERY: %o; ID: %o; MOD: %o', query, id, mod);
        
        this.renderGlobalMenu();
        
        $('#invoicesClients').hide();
        $('#invoicesPs').hide();
        $('#invoicesInvoices').hide();
        $('#invoicesItemInvoice').hide();
        
        // help
        if(!this.collection.get('invoiceHelpBuyer')) {
            this.collection.add({
                id: 'invoiceHelpBuyer',
                view: new window.Invoices.ViewItemInvoiceHelpBuyer({router: this})
            });
        }
        
        if(!this.collection.get('invoiceHelpGoods')) {
            this.collection.add({
                id: 'invoiceHelpGoods',
                view: new window.Invoices.ViewItemInvoiceHelpGoods({router: this})
            });
        }
        // help
        
        if(!this.collection.get('invoice')) {
            this.collection.add({
                id: 'invoice',
                view: new window.Invoices.ViewInvoice({
		            router: this, 
		            collection: new window.Invoices.CollectionInvoices()
		        })
            });
        }
        
        // Fix models
        var collection = this.collection.get('invoice').get('view').collection;
        if(collection.length > 1) {
            collection.each(function(model, index) {
                if(model.id && id && id != model.id) collection.remove(model);
            });
        }
        
        this.collection.get('invoice').get('view').render(id, mod);
        
        // remove buyers, goods
        var buyers = this.collection.get('buyers');
        if(buyers) buyers.get('view').collectionBuyers = new window.Invoices.CollectionRouters();
        
        // remove buyers, goods
        
		$('#invoicesItemInvoice').show();
        
    },
    renderGlobalMenu: function() {
        if(!this.collection.get('globalmenu')) {
            this.collection.add({
                id: 'globalmenu',
                view: new window.Invoices.ViewGlobalMenu({router: this})
            });
		    this.collection.get('globalmenu').get('view').render();
        }
    }
});
