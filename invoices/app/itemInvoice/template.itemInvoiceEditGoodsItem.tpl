<tr data-id="<%= gds_uid %>" data-tid="<%= t_id %>">
    <td><span data-name="id"><%= gds_uid %></span></td>
    <td><% if(gds_uid < 1) { %><input type="text" name="title" value="<%= title %>" data-id="<%= gds_uid %>" data-tid="<%= t_id %>" /><% } else { %><span data-name="title"><%= title %></span><% } %></td>
    <td><% if(gds_uid < 1) { %><input type="text" name="units" value="<%= units %>" data-id="<%= gds_uid %>" data-tid="<%= t_id %>" /><% } else { %><span data-name="title"><%= units %></span><% } %></td>
    <td><input type="text" name="quantity" value="<%= quantity %>" data-id="<%= gds_uid %>" data-tid="<%= t_id %>" /></td>
    <td><% if(gds_uid < 1) { %><input type="text" name="price" value="<%= price %>" data-id="<%= gds_uid %>" data-tid="<%= t_id %>" /><% } else { %><span data-name="title"><%= sprintf("%01.2f", price) %></span><% } %></td>
    <td><span data-id="<%= gds_uid %>" data-tid="<%= t_id %>"><%= sprintf("%01.2f", total) %></span></td>
    <td><input type="button" name="remove" value="x" data-id="<%= gds_uid %>" data-tid="<%= t_id %>" /></td>
</tr>
