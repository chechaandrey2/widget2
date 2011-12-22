<div>
    <table>
        <tbody>
          <% for(var i=0; i<array; i++) { %>
            <tr><td><%= array[i].title %></td><td><% array[i].units %></td><td><% array[i].price %></td><td></td></tr>
          <% } %>
          <% if(array.length > 1) { %>
            <tr><td colspan=4><strong>not found</strong></td></tr>
          <% } %>
        </tbody>
    </table>
</div>
