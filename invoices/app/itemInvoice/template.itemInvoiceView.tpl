<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};
%><table>
    <thead>
        <tr><th><% if(status) { %><div><span><%= status %></span><span>(<%= date('H:i:s d.m.Y', new Date(dates[status])) %>)</span></div><% } %></th></tr>
    </thead>
    <tbody id="invoicesItemInvoiceViews"></tbody>
    <tfoot>
        <tr><th><% if(inv_uid) { %><input type="button" name="created" value="create of current" /><input type="button" name="issued" value="issue of current" /><a href="#invoice/edit/<%= inv_uid %>/">view</a><% } else { %><input type="button" name="created" value="create" /><input type="button" name="issued" value="issue" /><a href="#invoice/edit/">view</a><% } %></th></tr>
    </tfoot>
</table>
