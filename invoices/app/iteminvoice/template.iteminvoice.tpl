<div><%= title %></div>
<div id="invoices_iteminvoice_tabs">
    <ul>
        <li><a href="#privatwidget-tab-1">1</a></li>
        <li><a href="#privatwidget-tab-2">2</a></li>
    </ul>
    <div id="privatwidget-tab-1">
        <table>
            <tbody>
                <tr><td colspan=2></td></tr>
                <tr><td><span>clients:</span></td><td>
                    <div>
                        <div><input type="text" id="invoices_iteminvoice_clients_search" /></div>
                        <div id="invoices_iteminvoice_clients"></div>
                    </div>
                </td></tr>
                <tr><td colspan=2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th><th>product/service</th><th>unit</th><th>count</th><th>ptice/unit</th><th>actions</th>
                            </tr>
                        </thead>
                        <tbody id="invoices_iteminvoice_pss">
                        </tbody>                        
                    </table>
                </td></tr>
                <tr><td colspan=2>
                    <input type="button" name="draft" value="save draft" />
                    <input type="button" name="bill" value="bill" />
                    <input type="button" name="next" value="next" />
                </td></tr>
            </tbody>
        </table>
    </div>
    <div id="privatwidget-tab-2">
        <span>tab 2</span>
    </div>
</div>

