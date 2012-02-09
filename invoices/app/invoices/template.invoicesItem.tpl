<%
var dates = {
    created: created_at,
    issued: issued_at,
    paid: paid_at,
    expired: expired_at,
    closed: closed_at
};

function getContent(content) {
    var str = [];
    content = JSON.parse(content);
    for(var i=0; i<content.length; i++) {
        str.push(content[i].title+'|'+content[i].price+'|'+content[i].total);
    }
    return str.join("<br />");
}

%><tr data-id="<%= inv_uid %>" data-status="<%= status %>">
    <td class="center"><%= inv_uid %></td>
    <td class="center"><% for(var i=0; i<buyers.length; i++) { %><span><%= buyers[i].name %></span><% } %></td>
    <td class="center"><%= (descr && descr.length > 0)?descr:getContent(content) %></td>
    <td class="center"><%= status %></td>
    <td class="date"><%= date('H:i d.m.Y', new Date(dates[status].replace(/-/g, '/'))) %></td>
    <td class="center"><div><%= total %></div><div><%= currency %></div></td>
    <td class="center"><% if(status == 'created') { %><a href="javascript:void(0)" data-name="issued" data-id="<%= inv_uid %>" class="button">i</a><% } %></td>
    <td class="center"><a href="#invoice/print/<%= inv_uid %>/">p</a></td>
    <td class="center"><a href="#invoice/edit/<%= inv_uid %>/">+-></a></td>
</tr>
