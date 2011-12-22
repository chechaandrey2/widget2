<div>
    <table>
        <tbody>
          <% for(var i=0; i<array.length; i++) { %>
            <tr><td><%= array[i].name %></td><td><% array[i].email %></td><td><% array[i].phone_main %></td><td></td></tr>
          <% } %>
          <% if(array.length > 1) { %>
            <tr>
                <td><input type="text" name="name" /></td>
                <td><input type="text" name="email" /></td>
                <td><input type="text" name="email" /></td>
                <td><input type="button" value="+" /></td>
            </tr>
          <% } %>
        </tbody>
    </table>
</div>
