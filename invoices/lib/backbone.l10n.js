Backbone.View.prototype.l10n = function(str) {
    var lang = this.l10nLang?this.l10nLang:((this.router && this.router.l10nLang)?this.router.l10nLang:'en')
    if(lang == 'en') return str;
    if(this.l10nHash && this.l10nHash[lang]) {
        return this.l10nHash[lang][str]?this.l10nHash[lang][str]:str;
    } else {
        return str;
        //console.error('Localization Hash "%s" is not defined', this.l10nLang);
    }
}

/*
 * ru, ua, ...
 */
Backbone.View.prototype.l10nLang = undefined;

Backbone.Router.prototype.l10nLang = 'en';

/*
 * {en:hash, ua: hash}
 */
Backbone.View.prototype.l10nHash = {}
