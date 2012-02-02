var PATHS = [
	{type: 'js', url: 'static/js.js', name: 'js'},
	{type: 'ajax', url: 'static/tpl.tpl', name: 'tpl', check: function() {return false}, policy: {canceled: true}},
	{type: 'image', url: 'static/bear.png', name: 'bear'},
	{type: 'css', url: 'static/style.css', name: 'css'},
	{type: 'js', url: 'static/js1.js', name: 'js1'},
	{type: 'ajax', url: 'static/tpl1.tpl', name: 'tpl1'},
	{type: 'image', url: 'static/fox.png', name: 'fox'},
	{type: 'css', url: 'static/style1.css', name: 'css1'},
	{namespace: 'tpl', outputfile: 'errr'}
];
