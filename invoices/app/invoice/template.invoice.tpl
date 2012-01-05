<div>
    <ul id="invoicesItemInvoiceTabsList">
        <li data-id="edit"><a href="#iteminvoice/edit/<%= inv_uid?inv_uid+'/':'' %>">edit</a></li>
        <li data-id="view"><a href="#iteminvoice/view/<%= inv_uid?inv_uid+'/':'' %>">view</a></li>
        <li data-id="send"><a href="#iteminvoice/send/<%= inv_uid?inv_uid+'/':'' %>">send</a></li>
    </ul>
    <div id="invoicesItemInvoiceItem-edit"></div>
    <div id="invoicesItemInvoiceItem-view"></div>
    <div id="invoicesItemInvoiceItem-send"></div>
</div>
