<tr data-nid="<%= nid %>">
    <td><span data-name="id"></span></td>
    <td><input type="text" name="title" value="<%= title %>" data-nid="<%= nid %>" /><div data-name="help"></div></td>
    <td><input type="text" name="units" value="<%= units %>" data-nid="<%= nid %>" /></td>
    <td><input type="text" name="quantity" value="<%= quantity %>" data-nid="<%= nid %>" /></td>
    <td><input type="text" name="price" value="<%= sprintf('%01.2f', price) %>" data-nid="<%= nid %>" /></td>
    <td><span data-name="total" data-nid="<%= nid %>" ><%= sprintf("%01.2f", total) %></span></td>
    <td><input type="button" name="remove" value="x" data-nid="<%= nid %>" /></td>
</tr>
