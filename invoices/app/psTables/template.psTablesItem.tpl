<tr data-id="<%= gds_uid %>">
    <td class="center"><img src="<%= img_url %>"  /></td>
    <td class="center"><%= title %></td>
    <td class="center"><%= units %></td>
    <td class="summ"><%= price || '0.00' %></td>
    <td class="center"><a href="<%= desc_url %>"><%= desc_url %></a></td>
    <td class="center"><input type="button" name="edit" value="e" data-id="<%= gds_uid %>" /></td>
    <td class="center"><input type="button" name="del" value="x" data-id="<%= gds_uid %>" /></td>
</tr>
