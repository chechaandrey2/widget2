<div id="invoicesInvoicesTabs">
    <ul id="invoicesInvoicesTabsList">
        <li data-id="0"><a href="#invoices/all/">all</a></li>
      <% for(var i=0; i<models.length; i++) { %>
        <li data-id="<%= models[i].get('name') %>"><a href="#invoices/<%= models[i].get('name') %>/"><%= models[i].get('title') %></a></li>
      <% } %>
    </ul>
</div>
