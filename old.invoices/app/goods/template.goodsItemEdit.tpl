<tr data-id="<%= gds_uid %>">
    <td><img src="<%= img_url %>"  /></td>
    <td><input type="text" name="title" value="<%= title %>" placeholder="goods title" data-id="<%= gds_uid %>" /></td>
    <td><input type="text" name="units" value="<%= units %>" placeholder="goods units" data-id="<%= gds_uid %>" /></td>
    <td><input type="text" name="price" value="<%= price %>" placeholder="goods price" data-id="<%= gds_uid %>" /></td>
    <td><textarea name="desc_url" placeholder="goods desc url" data-id="<%= gds_uid %>"><%= desc_url %></textarea></td>
    <td><input type="button" name="save" value="s" data-id="<%= gds_uid %>" /></td>
    <td><input type="button" name="del" value="x" data-id="<%= gds_uid %>" /></td>
</tr>
