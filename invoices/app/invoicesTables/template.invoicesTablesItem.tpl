<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};
%><tr data-id="<%= inv_uid %>" data-status="<%= status %>">
    <td class="center">&nbsp;</td>
    <td class="center"><%= inv_uid %></td>
    <td class="center"><%= b_uid %></td>
    <td class="center"><%= (descr+'').length<1?msg:descr %></td>
    <td class="center"><%= status || 'draft' %></td>
    <td class="date"><%= date('H:i:s d.m.Y', new Date(dates[status])) %></td>
    <td class="center"><div><%= total %></div><div><%= currency %></div></td>
    <td class="center"><% if(status == 'created') { %><input type="button" name="issued" value="i" data-id="<%= inv_uid %>" /><% } else { %><input type="button" name="issued" disabled="disabled" value="i" data-id="<%= inv_uid %>" /><% } %></td>
    <td class="center"><a href="#iteminvoice/view/<%= inv_uid %>/">v</a></td>
    <td class="center"><a href="#iteminvoice/edit/<%= inv_uid %>/">e</a></td>
    <td class="center"><input type="button" name="remove" value="x" data-id="<%= inv_uid %>" /></td>
</tr>
