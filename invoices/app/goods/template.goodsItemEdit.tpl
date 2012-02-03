<tr data-id="<%= gds_uid %>">
    <td><span data-name="id"><%= gds_uid %></span></td>
    <td><input type="text" name="title" value="<%= title %>" placeholder="goods title" data-id="<%= gds_uid %>" /></td>
    <td><input type="text" name="units" value="<%= units %>" placeholder="goods units" data-id="<%= gds_uid %>" /></td>
    <td><input type="text" name="price" value="<%= price %>" placeholder="goods price" data-id="<%= gds_uid %>" /></td>
    <td><textarea name="desc_url" placeholder="goods desc url" data-id="<%= gds_uid %>"><%= desc_url %></textarea></td>
    <td><a href="javascript:void(0)" data-name="save" data-id="<%= gds_uid %>" class="button">s</a></td>
    <td><a href="javascript:void(0)" data-name="del" data-id="<%= gds_uid %>" class="button">x</a></td>
</tr>
