Backbone.Model.prototype.toJSONExt = function(opts) {
    opts = opts || {};
    if(opts.there instanceof Array) {
        var arg = _.clone(this.attributes) || {}, arg1 = {};
        for(var i in arg) {
            if(_.indexOf(opts.there, i) >= 0) arg1[i] = arg[i];
        }
        return arg1;
    } else if(opts.ignore instanceof Array) {
        var arg = _.clone(this.attributes) || {}, arg1 = {};
        for(var i in arg) {
            if(_.indexOf(opts.ignore, i) < 0) arg1[i] = arg[i];
        }
        return arg1;
    } else {
        return {};
    }
}

Backbone.Model.prototype.syncArg = {};

Backbone.Model.prototype.syncFilter = {};
