Backbone.View.prototype.l10n = function(str) {
    if(this.l10nLang == 'en') return str;
    if(this.l10nHash && this.l10nHash[this.l10nLang]) {
        return this.l10nHash[this.l10nLang][str]?this.l10nHash[this.l10nLang][str]:str;
    } else {
        console.error('Localization Hash "%s" is not defined', this.l10nLang);
    }
}

/*
 * en, ua
 */
Backbone.View.prototype.l10nLang = 'en';

/*
 * {en:hash, ua: hash}
 */
Backbone.View.prototype.l10nHash = {}
