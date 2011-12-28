<div id="invoicesInvoicesTabs">
    <ul id="invoicesInvoicesTabsList">
      <% for(var i=0; i<models.length; i++) { %>
        <li><a href="#<%= models[i].get('id') %>"><%= models[i].get('name') %></a></li>
      <% } %>
    </ul>
</div>
