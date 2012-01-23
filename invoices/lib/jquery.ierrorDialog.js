(function($) {

	var defOptions = {
		errContClass: null,
		errItemClass: null,
		textButton: 'ok',
		textTitle: 'Server Error'
	};
	
	var dialog;
	
	$.extend({
        ierrorDialog: function(options, arg) {
        	if(options == 'default') {
    			defOptions = $.extend({}, defOptions, arg);
    		} else if(options == 'add') {
    		    if(!dialog) create();
    		    if(dialog.dialog("isOpen")) {
    		        dialog.append($('<div></div>').addClass(defOptions.errItemClass).html(arg));
    		    } else {
    		        dialog.html($('<div></div>').addClass(defOptions.errItemClass).html(arg));
    		        dialog.dialog("open");
    		    }
    		}
        }
    });
    
    function create() {
        dialog = $('<div></div>').addClass(defOptions.errContClass);
        dialog.dialog({
            buttons: [
                {text: defOptions.textButton, click: function() { $(this).dialog("close"); } }
            ],
            autoOpen:false,
            resizable: false,
			modal: true,
			title: defOptions.textTitle
        });
    }
	
})(jQuery);
