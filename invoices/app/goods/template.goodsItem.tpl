<tr data-id="<%= gds_uid %>">
    <td><img src="<%= img_url %>"  /></td>
    <td><%= title %></td>
    <td><%= units %></td>
    <td><%= sprintf('%01.2f', price) %></td>
    <td><a href="<%= desc_url %>"><%= desc_url %></a></td>
    <td><input type="button" name="edit" value="e" data-id="<%= gds_uid %>" /></td>
    <td><input type="button" name="del" value="x" data-id="<%= gds_uid %>" /></td>
</tr>
