<tr data-id="<%= b_uid %>">
    <td><img src="<%= img_url %>" /></td>
    <td><input type="text" name="name" value="<%= name %>" data-id="<%= b_uid %>" placeholder="buyer name" /></td>
    <td><input type="text" name="phone_main" value="<%= phone_main %>" data-id="<%= b_uid %>" placeholder="buyer phone" /></td>
    <td><input type="text" name="email" value="<%= email %>" data-id="<%= b_uid %>" placeholder="buyer email" /></td>
    <td><textarea name="addr" data-id="<%= b_uid %>" placeholder="buyer address"><%= addr %></textarea></td>
    <td><textarea name="comment" data-id="<%= b_uid %>" placeholder="buyer comment"><%= comment %></textarea></td>
    <td><input type="button" name="save" value="s" data-id="<%= b_uid %>" /></td>
    <td><input type="button" name="del" value="x" data-id="<%= b_uid %>" /></td>
</tr>
