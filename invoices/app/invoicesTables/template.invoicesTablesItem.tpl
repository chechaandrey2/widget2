<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};
%><tr data-id="<%= inv_uid %>" data-status="<%= status %>">
    <td></td>
    <td><%= inv_uid %></td>
    <td><%= b_uid %></td>
    <td><%= (descr+'').length<1?msg:descr %></td>
    <td><%= status || 'draft' %></td>
    <td><%= date('H:i:s d.m.Y', new Date(dates[status])) %></td>
    <td><div><%= total %></div><div><%= currency %></div></td>
    <td><% if(status == 'created') { %><input type="button" name="issued" value="i" data-id="<%= inv_uid %>" /><% } else { %><input type="button" name="issued" disabled="disabled" value="i" data-id="<%= inv_uid %>" /><% } %></td>
    <td><a href="#iteminvoice/<%= inv_uid %>/view/">v</a></td>
    <td><a href="#iteminvoice/<%= inv_uid %>/edit/">e</a></td>
    <td><input type="button" name="remove" value="x" data-id="<%= inv_uid %>" /></td>
</tr>
