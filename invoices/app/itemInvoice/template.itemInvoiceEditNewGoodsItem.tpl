<tr data-nid="<%= nid %>">
    <td><span data-name="id"></span></td>
    <td><input type="text" name="title" value="<%= title %>" data-nid="<%= nid %>" placeholder="title goods" /><div data-name="help"></div></td>
    <td><input type="text" name="units" value="<%= units %>" data-nid="<%= nid %>" placeholder="units goods" /></td>
    <td><input type="text" name="quantity" value="<%= quantity %>" data-nid="<%= nid %>" placeholder="quantity goods" /></td>
    <td><input type="text" name="price" value="<%= sprintf('%01.2f', price) %>" data-nid="<%= nid %>" placeholder="price goods" /></td>
    <td><span data-name="total" data-nid="<%= nid %>" ><%= sprintf("%01.2f", total) %></span></td>
    <td><span data-name="remove" data-nid="<%= nid %>" class="button">x</span></td>
</tr>
