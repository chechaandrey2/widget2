<tr data-id="<%= b_uid %>">
    <td class="center"><input style="text-align: left;" type="text" name="name" value="<%= name %>" data-id="<%= b_uid %>" placeholder="buyer name" /></td>
    <td class="center"><input style="text-align: left;" type="text" name="phone_main" value="<%= phone_main %>" data-id="<%= b_uid %>" placeholder="buyer phone" /></td>
    <td class="center"><input style="text-align: left;width: 131px;" type="text" name="email" value="<%= email %>" data-id="<%= b_uid %>" placeholder="buyer email" /></td>
    <td class="center"><textarea name="addr" data-id="<%= b_uid %>" placeholder="buyer address"><%= addr %></textarea></td>
    <td class="center"><textarea name="comment" data-id="<%= b_uid %>" placeholder="buyer comment"><%= comment %></textarea></td>
    <td><a href="javascript:void(0)" data-name="save" data-id="<%= b_uid %>" class="button">s</a><div class="save_preloader"></div></td>
    <td><a href="javascript:void(0)" data-name="del" data-id="<%= b_uid %>" class="button">x</a></td>
</tr>
