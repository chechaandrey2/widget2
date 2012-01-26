<tr data-id="<%= b_uid %>">
    <td class="center"><input style="text-align: center" type="text" name="name" value="<%= name %>" data-id="<%= b_uid %>" placeholder="buyer name" /></td>
    <td class="center"><input style="text-align: center" type="text" name="phone_main" value="<%= phone_main %>" data-id="<%= b_uid %>" placeholder="buyer phone" /></td>
    <td class="center"><input style="text-align: center" type="text" name="email" value="<%= email %>" data-id="<%= b_uid %>" placeholder="buyer email" /></td>
    <td class="center"><textarea name="addr" data-id="<%= b_uid %>" placeholder="buyer address"><%= addr %></textarea></td>
    <td class="center"><textarea name="comment" data-id="<%= b_uid %>" placeholder="buyer comment"><%= comment %></textarea></td>
    <td><span data-name="save" data-id="<%= b_uid %>" class="button">s</span></td>
    <td><span data-name="del" data-id="<%= b_uid %>" class="button">x</span></td>
</tr>
