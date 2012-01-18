<tr data-id="<%= gds_uid %>">
    <td class="center"><img src="<%= img_url %>"  /></td>
    <td class="center"><input style="text-align: center" type="text" name="title" value="<%= title %>" data-label="edit" data-id="<%= gds_uid %>" /></td>
    <td class="center"><input style="text-align: center" type="text" name="units" value="<%= units %>" data-label="edit" data-id="<%= gds_uid %>" /></td>
    <td class="summ"><input style="text-align: right" type="text" name="price" value="<%= price %>" data-label="edit" data-id="<%= gds_uid %>" /></td>
    <td class="center"><textarea name="desc_url" data-label="edit" data-id="<%= gds_uid %>"><%= desc_url %></textarea></td>
    <td><input type="button" name="save" value="s" data-id="<%= gds_uid %>" /></td>
    <td><input type="button" name="del" value="x" data-id="<%= gds_uid %>" /></td>
</tr>
