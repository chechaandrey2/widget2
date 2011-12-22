<div></div>
<div id="invoices_clients_tabs">
    <ul>
      <% for(var i=0; i<groups.length; i++) { %>
        <li><a href="#privatwidget-tab-<%= i %>"><%= groups[i].title %></a></li>
      <% } %>
        <li><input type="button" id="invoices_clients_add_group" value="+" /></li>
    </ul>
    <% for(var i=0; i<groups.length; i++) { %>
    <div id="privatwidget-tab-<%= i %>"></div>
    <% } %>
</div>
