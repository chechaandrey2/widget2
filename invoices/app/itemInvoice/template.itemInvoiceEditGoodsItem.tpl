<tr data-id="<%= gds_uid %>">
    <td><span data-name="id"><%= gds_uid %></span></td>
    <td><span data-name="title"><%= title %></span></td>
    <td><span data-name="units"><%= units %></span></td>
    <td><input type="text" name="quantity" value="<%= quantity %>" data-id="<%= gds_uid %>" placeholder="quantity goods" /></td>
    <td><input type="text" name="price" value="<%= sprintf('%01.2f', price) %>" data-id="<%= gds_uid %>" placeholder="price goods" /></td>
    <td><span data-name="total" data-id="<%= gds_uid %>" ><%= sprintf("%01.2f", total) %></span></td>
    <td><span class="button" data-name="remove" data-id="<%= gds_uid %>">x</span></td>
</tr>
