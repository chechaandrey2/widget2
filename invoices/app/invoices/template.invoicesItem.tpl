<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};
%><tr data-id="<%= inv_uid %>" data-status="<%= status %>">
    <td class="center"><%= inv_uid %></td>
    <td class="center"><% for(var i=0; i<buyers.length; i++) { %><span><%= buyers[i].name %></span><% } %></td>
    <td class="center"><%= (descr+'').length<1?msg:descr %></td>
    <td class="center"><%= status %></td>
    <td class="date"><%= date('H:i:s d.m.Y', new Date(dates[status])) %></td>
    <td class="center"><div><%= total %></div><div><%= currency %></div></td>
    <td class="center"><% if(status == 'created') { %><span data-name="issued" data-id="<%= inv_uid %>" class="button">i</span><% } %></td>
    <td class="center"><a href="#invoice/view/<%= inv_uid %>/">v</a></td>
    <td class="center"><a href="#invoice/edit/<%= inv_uid %>/">+-></a></td>
</tr>
