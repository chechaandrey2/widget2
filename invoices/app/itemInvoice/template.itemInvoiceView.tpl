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
        <tr><th><% if(status) { %><div><span><%= status %></span><span>(<%= date('H:i:s d.m.Y', new Date(dates[status].replace(/-/g, '/'))) %>)</span></div><% } %></th></tr>
    </thead>
    <tbody id="invoicesItemInvoiceViews"></tbody>
    <tfoot>
        <tr><th><% if(inv_uid) { %><span data-name="created" class="button">create of current</span><span data-name="issued" class="button">issue of current</span><a href="#invoice/edit/<%= inv_uid %>/">edit</a><% } else { %><span data-name="created" class="button">create</span><span data-name="issued" class="button">issue</span><a href="#invoice/edit/">edit</a><% } %></th></tr>
    </tfoot>
</table>
