window.Invoices.ViewGlobalMenu = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        
        this.collection = new window.Invoices.CollectionGlobalMenu();
        
    },
    el: $('#invoicesGlobalMenu'),
    statsTemplate: {
        'globalmenu': _.template(window.Invoices.TEMPLATE['globalmenu.globalMenu'])
    },
    render: function() {
        
        this.el.html(this.statsTemplate['globalmenu'](this.collection));
        
        return this;
        
    },
    renderItem: function(query) {
        
        var q = (query || 'invoice/').replace(/^([a-zA-Z0-9_]+\/).*/, '$1');
        
        $('[data-id="item"]', this.el).each(function() {
            $(this).removeClass('tab-item');
            var $el = $('[href="#'+q+'"]', this);
            if($el.size() > 0) $(this).addClass('tab-item');
        });
        
        return this;
        
    }
});
