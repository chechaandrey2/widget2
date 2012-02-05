#!/usr/local/bin/node
/*
 * args: -p = file_paths; -np = file_new_paths; -s = sufix; -gcc = compiler_path
 */
function parser(args) {
	var I = 2, argv = {};
	
	while(I<args.length) {
		if(args[I].indexOf('-') == 0) {
			// arg
			var arg = args[I+1]?args[I+1]:undefined;
			if(arg.indexOf('-') == 0) arg = undefined;
			argv[args[I].replace('-', '')] = arg;
		}
		I++;
	}
	
	return argv;
}

function parserPATHS(paths) {
	
	if(!(paths instanceof Array)) paths = [paths];
	
	var args = {}, argv = [];
	
	for(var i=0; i<paths.length; i++) {
		var path = paths[i] || {};
		if(path.namespace && (path.type == 'js' || path.type == 'ajax') && path.url) {
			if(args[path.namespace]) {
				args[path.namespace].add({
					namespace: path.namespace,
					urls: path.url
				});
			} else {
				args[path.namespace] = new Build({
					namespace: path.namespace,
					urls: path.url
				});
			}
		} else if(path.namespace && path.file_output) {
			if(args[path.namespace]) {
				args[path.namespace].add({
					namespace: path.namespace,
					fileOutput: path.file_output,
					type: path.build,
					options: path.options
				});
			} else {
				args[path.namespace] = new Build({
					namespace: path.namespace,
					fileOutput: path.file_output,
					type: path.build,
					options: path.options
				});
			}
		}
	}
	
	for(var i in args) {
		argv.push(args[i]);
	}
	
	return argv;
	
}

function Build(options) {

	options = options || {};
	
	var self = this, opts = {
		namespace: undefined,
		fileOutput: undefined,
		urls: [],
		type: undefined,// js|tpl|l10n
		options: {}// jsc, clevel, var_name, gcc
	}
	
	function __construct(options) {
		opts.namespace = options.namespace || undefined;
		opts.fileOutput = options.fileOutput || undefined;
		
		if(options.urls instanceof Array) {
			for(var i=0; i<options.urls.length; i++) {
				if(options.urls[i]) opts.urls.push(options.urls[i]);
			}
		} else {
			if(options.urls) opts.urls.push(options.urls);
		}
		
		opts.type = options.type || undefined;
		opts.options = options.options || {};
		
	}
	
	this.build = function(options) {
		if(opts.type == 'js') {
			// gcc
			
		} else if(opts.type == 'tpl' || opts.type == 'l10n') {
			// generate js
			
		} else {
			// copy
			
		}
		console.log(opts);
	}
	
	this.add = function(options) {
		options = options || {};
		opts.namespace = options.namespace || opts.namespace;
		opts.fileOutput = options.fileOutput || opts.fileOutput;
		
		if(options.urls instanceof Array) {
			for(var i=0; i<options.urls.length; i++) {
				if(options.urls[i]) opts.urls.push(options.urls[i]);
			}
		} else {
			if(options.urls) opts.urls.push(options.urls);
		}
		
		opts.type = options.type || opts.type;
		
		// options
		
	}
	
	__construct(options);
	
}

var args = parser(process.argv);

if(args.p) {
	
	// parse paths
	var paths = require(args.p).PATHS;
	
	var colls = parserPATHS(paths);
	
	for(var i=0; i<colls.length; i++) {
		colls[i].build();
	}
	
} else {
	throw new Error('file with paths (-p[ arg]) - is not defined')
}
