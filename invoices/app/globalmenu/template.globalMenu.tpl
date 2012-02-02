<ul>
  <% for(var i=0; i<models.length; i++) { %>
    <li data-id="item"><a href="#<%= models[i].get('hash') %>"><%= models[i].get('name') %></a></li>
  <% } %>
</ul>
