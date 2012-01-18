<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};
%><table>
    <tbody>
        <tr><td colspan="2"><% if(status) { %><div><span><%= status %></span><span>(<%= date('H:i:s d.m.Y', new Date(dates[status])) %>)</span></div><% } %></td></tr>
        <tr><td colspan="2"><strong>byers</strong></td></tr>
        <tr><td colspan="2">
            <div><span><input type="text" id="invoicesItemInvoiceBuyersFind" value="" /></span></div>
            <div id="invoicesItemInvoiceItemBuyers"></div>
            <div id="invoicesItemInvoiceBuyersHelp"></div>
        </td></tr>
        <tr><td colspan="2"><strong>goods</strong></td></tr>
        <tr><td colspan="2">
            <table>
                <thead>
                    <tr><th>#</th><th>title</th><th>units</th><th>count</th><th>price</th><th>total</th><th></th></tr>
                </thead>
                <tbody id="invoicesItemInvoiceItemGoods"></tbody>
            </table>
        </td></tr>
        <tr><td colspan="2"><div><span id="invoicesInvoiceGoodsTotal"><%= sprintf('%01.2f', total) %></span><span>(<%= currency %>)</span></div></td><td></td></tr>
        <tr><td colspan="2"><span>additional fields</span></td></tr>
        <tr><td><strong>description</strong></td><td><textarea name="descr"><%= descr %></textarea></td></tr>
        <tr><td><strong>message</strong></td><td><textarea name="msg"><%= descr %></textarea></td></tr>
    </tbody>
    <tfoot>
        <tr><th colspan="2"><input type="button" name="created" value="create" /><input type="button" name="issued" value="issue" /><a href="#invoice/view/<%= inv_uid?inv_uid+'/':'' %>">view</a></th></tr>
    </tfoot>
</table>
