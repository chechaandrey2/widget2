<tr data-id="<%= b_uid %>">
    <td><img src="<%= img_url %>"  /></td>
    <td><input type="text" name="name" value="<%= name %>" data-label="edit" data-id="<%= b_uid %>" /></td>
    <td><input type="text" name="phone" value="<%= phone_main %>" data-label="edit" data-id="<%= b_uid %>" /></td>
    <td><input type="text" name="email" value="<%= email %>" data-label="edit" data-id="<%= b_uid %>" /></td>
    <td><textarea name="addr" data-label="edit" data-id="<%= b_uid %>"><%= addr %></textarea></td>
    <td><textarea name="comment" data-label="edit" data-id="<%= b_uid %>"><%= comment %></textarea></td>
    <td><input type="button" name="save" value="s" data-id="<%= b_uid %>" /></td>
    <td><input type="button" name="del" value="x" data-id="<%= b_uid %>" /></td>
</tr>
