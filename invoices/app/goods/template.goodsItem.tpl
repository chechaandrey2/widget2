<tr data-id="<%= gds_uid %>">
    <td><span data-name="id"><%= gds_uid %></span></td>
    <td><%= title %></td>
    <td><%= units %></td>
    <td><%= sprintf('%01.2f', price) %></td>
    <td><a href="<%= desc_url %>"><%= desc_url %></a></td>
    <td><span data-name="edit" data-id="<%= gds_uid %>" class="button">e</span></td>
    <td><span data-name="del" data-id="<%= gds_uid %>" class="button">x</span></td>
</tr>
