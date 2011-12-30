<div>
    <ul id="invoicesItemInvoiceTabsList">
        <li data-id="edit"><a href="#iteminvoice/edit/<%= inv_uid?inv_uid+'/':'' %>">edit</a></li>
        <li data-id="view"><a href="#iteminvoice/view/<%= inv_uid?inv_uid+'/':'' %>">view</a></li>
    </ul>
    <div id="invoicesItemInvoiceItem-edit">
        <table>
            <tbody>
                <tr><td><strong>byers</strong></td></tr>
                <tr><td><div id="invoicesItemInvoiceItemBuyers"></div></td></tr>
                <tr><td><strong>goods</strong></td></tr>
                <tr><td><div id="invoicesItemInvoiceItemGoods"></div></td></tr>
            </tbody>
            <tfoot>
                <tr><th>buttons</th></tr>
            </tfoot>
        </table>
    </div>
    <div id="invoicesItemInvoiceItem-view">
        <h2>print</h2>
    </div>
</div>
