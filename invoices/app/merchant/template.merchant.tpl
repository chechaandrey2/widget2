<div id="invoicesMerchantTabs">
    <ul id="invoicesMerchantTabsList">
        <li data-id="0"><a href="#merchant/contacts/"><strong><%= this.l10n("Contacts") %></strong></a></li>
        <li data-id="1"><a href="#merchant/pay/"><strong><%= this.l10n("Payments") %></strong></a></li>
        <li data-id="2"><a href="#merchant/general/"><strong><%= this.l10n("General") %></strong></a></li>
    </ul>
    <div data-id="#merchant/contacts/">
        <table>
            <tbody>
                <tr><th><%= this.l10n("title") %></th><td><input type="text" name="title" value="<%= title || '' %>" placeholder="<%= this.l10n("title") %>" /></td></tr>
                <tr><th><%= this.l10n("phone") %></th><td><span><%= phone %></span></td></tr>
                <tr><th><%= this.l10n("email") %></th><td><input type="text" name="email" value="<%= email || '' %>" placeholder="<%= this.l10n("email") %>" /></td></tr>
                <tr><th><%= this.l10n("address") %></th><td><textarea name="addr" placeholder="<%= this.l10n("address") %>"><%= addr %></textarea></td></tr>
            </tbody>
        </table>
        <div>
            <div id="invoicesMerchantLogo" style="background-image: url(<%= logo_url %>);"></div>
            <a href="javascript:void(0)" id="invoicesMerchantEditLogo" class="button"><%= this.l10n("edit") %></a>
        </div>
    </div>
    <div data-id="#merchant/general/">
        <table>
            <tbody id="invoicesMerchantGeneralTable">
                <tr><td></td><td><span><%= this.l10n("Currency default") %> <%= currency %></span></td></tr>
                <tr>
                    <td><input type="checkbox" name="is_vat_payer" value="1"<%= is_vat_payer > 0?' checked="checked"':'' %> /></td>
                    <td><span data-id="is_vat_payer"><%= this.l10n("Payer VAT") %> 20%</span></td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="to_notify" value="1"<%= to_notify > 0?' checked="checked"':'' %> /></td>
                    <td><span data-id="to_notify"><%= this.l10n("Notification of change of the status of the invoice") %> <select name="to_sms">
                        <option value="1"<%= to_sms==1?' selected="selected"':'' %>><%= this.l10n("sms") %></option>
                        <option value="0"<%= to_sms==0?' selected="selected"':'' %>><%= this.l10n("email") %></option>
                    </select></span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div data-id="#merchant/pay/">
        <table>
            <tbody id="invoicesMerchantPayTable">
                <tr><td><%= this.l10n("take on") %></td><td>
                    <select name="pref_payment_id">
                        <option value="12"<%= pref_payment_id==12?' selected="selected"':'' %>>liqpay</option>
                        <option value="11"<%= pref_payment_id==11?' selected="selected"':'' %>>privat24</option>
                    </select>
                </td></tr>
                <tr data-id="12"><td><%= this.l10n("phone") %></td><td><%= phone %></td></tr>
                <tr data-id="11"><td><%= this.l10n("card") %></td><td><input type="text" name="card" value="<%= card %>" placeholder="card" /></td></tr>
            </tbody>
        </table>
    </div>
    <div>
        <a href="javascript:void(0)" id="invoicesMerchantSave" class="button"><%= this.l10n("save") %></a>
    </div>
</div>
