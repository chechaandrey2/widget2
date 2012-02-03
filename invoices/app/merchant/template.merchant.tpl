<div id="invoicesMerchantTabs">
    <ul id="invoicesMerchantTabsList">
        <li><a href="#merchant/contacts/"><strong>Contacts</strong></a></li>
        <li><a href="#merchant/pay/"><strong>Payments</strong></a></li>
        <li><a href="#merchant/general/"><strong>General</strong></a></li>
    </ul>
    <div data-id="#merchant/contacts/">
        <table>
            <tbody>
                <tr><th>title</th><td><input type="text" name="title" value="<%= title || '' %>" placeholder="title" /></td></tr>
                <tr><th>phone</th><td><span><%= phone %></span></td></tr>
                <tr><th>email</th><td><input type="text" name="email" value="<%= email || '' %>" placeholder="email" /></td></tr>
                <tr><th>address</th><td><textarea name="addr" placeholder="address"><%= addr %></textarea></td></tr>
            </tbody>
        </table>
        <div>
            <div id="invoicesMerchantLogo" style="background-image: url(<%= logo_url %>);"></div>
            <a href="javascript:void(0)" id="invoicesMerchantEditLogo" class="button">edit</a>
        </div>
    </div>
    <div data-id="#merchant/general/">
        <table>
            <tbody id="invoicesMerchantGeneralTable">
                <tr><td></td><td><span>Currency default <%= currency %></span></td></tr>
                <tr>
                    <td><input type="checkbox" name="is_vat_payer" value="1"<%= is_vat_payer > 0?' checked="checked"':'' %> /></td>
                    <td><span data-id="is_vat_payer">Payer VAT 20%</span></td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="to_notify" value="1"<%= to_notify > 0?' checked="checked"':'' %> /></td>
                    <td><span data-id="to_notify">Notification of change of the status of the invoice <select name="to_sms">
                        <option value="1"<%= to_sms==1?' selected="selected"':'' %>>sms</option>
                        <option value="0"<%= to_sms==0?' selected="selected"':'' %>>email</option>
                    </select></span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div data-id="#merchant/pay/">
        <table>
            <tbody id="invoicesMerchantPayTable">
                <tr><td>take on</td><td>
                    <select name="pref_payment_id">
                        <option value="12"<%= pref_payment_id==12?' selected="selected"':'' %>>liqpay</option>
                        <option value="11"<%= pref_payment_id==11?' selected="selected"':'' %>>privat24</option>
                    </select>
                </td></tr>
                <tr data-id="12"><td>phone</td><td><%= phone %></td></tr>
                <tr data-id="11"><td>card</td><td><input type="text" name="card" value="<%= card %>" placeholder="card" /></td></tr>
            </tbody>
        </table>
    </div>
    <div>
        <a href="javascript:void(0)" id="invoicesMerchantSave" class="button">save</a>
    </div>
</div>
