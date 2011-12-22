<ul>
  <% for(var i=0; i<models.length; i++) { %>
    <li><a href="#<%= models[i].get('hash') %>"><%= models[i].get('name') %></a></li>
  <% } %>
</ul>
