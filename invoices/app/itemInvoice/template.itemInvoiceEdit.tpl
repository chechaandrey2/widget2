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
        <tr><td colspan="2"><% if(status) { %><div><span><%= status %></span><span>(<%= date('H:i:s d.m.Y', new Date(dates[status].replace(/-/g, '/'))) %>)</span></div><% } %></td></tr>
        <tr><td colspan="2"><strong>byers</strong></td></tr>
        <tr><td colspan="2">
            <div><span><input type="text" id="invoicesItemInvoiceBuyersFind" value="" placeholder="buyer, you want to add" /><span id="invoicesInvoiceBuyersGroupLoader"></span></span><a href="javascript:void(0)" data-name="addbuyer" class="button">+</a></div>
            <div id="invoicesItemInvoiceItemBuyers"></div>
            <div id="invoicesItemInvoiceBuyersHelp"></div>
        </td></tr>
        <tr><td colspan="2"><strong>goods</strong></td></tr>
        <tr><td colspan="2">
            <table class="info_table">
                <thead>
                    <tr><th>#</th><th>title</th><th>units</th><th>count</th><th>price</th><th>total</th><th></th></tr>
                </thead>
                <tbody id="invoicesItemInvoiceItemGoods"></tbody>
            </table>
        </td></tr>
        <tr><td colspan="2"><div><span id="invoicesInvoiceGoodsTotal"><%= sprintf('%01.2f', total) %></span><span>(<%= currency %>)</span></div></td><td></td></tr>
        <tr><td colspan="2"><div id="invoicesItemInvoiceAddSwitch">additional fields</div></td></tr>
        <tr data-style="add" style="display: none;"><td><strong>description</strong></td><td><textarea name="descr" placeholder="invoice description"><%= descr %></textarea></td></tr>
        <tr data-style="add" style="display: none;"><td><strong>message</strong></td><td><textarea name="msg" placeholder="invoice message"><%= descr %></textarea></td></tr>
    </tbody>
    <tfoot>
        <tr><th colspan="2"><% if(inv_uid) { %><a href="javascript:void(0)" data-name="created" class="button">create of current</a><a href="javascript:void(0)" data-name="issued" class="button">issue of current</a><a href="javascript:void(0)" data-name="view" class="button">view</a><% } else { %><a href="javascript:void(0)" data-name="created" class="button">create</a><a href="javascript:void(0)" data-name="issued" class="button">issue</a><a href="javascript:void(0)" data-name="view" class="button">view</a><% } %></th></tr>
    </tfoot>
</table>
