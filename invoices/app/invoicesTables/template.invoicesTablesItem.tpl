<tr data-id="<%= inv_uid %>">
    <td></td>
    <td><%= inv_uid %></td>
    <td><%= b_uid %></td>
    <td><%= descr %></td>
    <td><div><%= issued_at %></div><div><%= issued_at %></div></td>
    <td><div><%= paid_at %></div><div><%= paid_at %></div></td>
    <td><div><%= expired_at %></div><div><%= expired_at %></div></td>
    <td><div><%= total %></div><div><%= currency %></div></td>
    <td><input type="button" name="status" value="<%= status || 'draft' %>" data-id="<%= inv_uid %>" /></td>
    <td><a href="#iteminvoice/<%= inv_uid %>/view/">v</a></td>
    <td><a href="#iteminvoice/<%= inv_uid %>/edit/">e</a></td>
    <td><% if(status == 'closed') { %><input type="button" name="remove" value="x" disabled="disabled" data-id="<%= inv_uid %>" /><% } else { %><input type="button" name="remove" value="x" data-id="<%= inv_uid %>" /><% } %></td>
</tr>
