<tr data-id="<%= gds_uid %>">
    <td><span data-name="id"><%= gds_uid %></span></td>
    <td><%= title %></td>
    <td><%= units %></td>
    <td><%= sprintf('%01.2f', price) %></td>
    <td><a href="<%= desc_url %>"><%= desc_url %></a></td>
    <td><a href="javascript:void(0)" data-name="edit" data-id="<%= gds_uid %>" class="button">e</a></td>
    <td><a href="javascript:void(0)" data-name="del" data-id="<%= gds_uid %>" class="button">x</a></td>
</tr>
