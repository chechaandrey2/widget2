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
        <tr><th><% if(inv_uid) { %><a href="javascript:void(0)" data-name="created" class="button">create of current</a><a href="javascript:void(0)" data-name="issued" class="button">issue of current</a><a href="#invoice/edit/<%= inv_uid %>/">edit</a><% } else { %><a href="javascript:void(0)" data-name="created" class="button">create</a><a href="javascript:void(0)" data-name="issued" class="button">issue</a><a href="#invoice/edit/">edit</a><% } %></th></tr>
    </tfoot>
</table>
