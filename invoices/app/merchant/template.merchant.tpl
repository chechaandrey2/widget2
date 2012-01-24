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
            <span id="invoicesMerchantEditLogo"></span>
        </div>
    </div>
    <div data-id="#merchant/pay/"></div>
    <div data-id="#merchant/general/"></div>
</div>
