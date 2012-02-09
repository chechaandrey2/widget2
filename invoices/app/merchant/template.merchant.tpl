<div id="invoicesMerchantTabs">
    <ul id="invoicesMerchantTabsList">
        <li data-id="0"><a href="#merchant/contacts/"><strong><%= this.l10n("Contacts") %></strong></a></li>
        <li data-id="1"><a href="#merchant/pay/"><strong><%= this.l10n("Payments") %></strong></a></li>
        <li data-id="2"><a href="#merchant/general/"><strong><%= this.l10n("General") %></strong></a></li>
    </ul>
    <div data-id="#merchant/contacts/">
        <div class="block">
			<div class="formLine"><div class="label"><%= this.l10n("title") %></div><div class="inputt"><input type="text" name="title" value="<%= title || '' %>" placeholder="<%= this.l10n("title") %>" /></div><div style="clear: both"></div></div>
			<div class="formLine"><div class="label"><%= this.l10n("phone") %></div><div class="inputt"><span><%= phone %></span></div><div style="clear: both"></div></div>
			<div class="formLine"><div class="label"><%= this.l10n("email") %></div><div class="inputt"><input type="text" name="email" value="<%= email || '' %>" placeholder="<%= this.l10n("email") %>" /></div><div style="clear: both"></div></div>
			<div class="formLine"><div class="label"><%= this.l10n("address") %></div><div class="inputt"><textarea name="addr" placeholder="<%= this.l10n("address") %>"><%= addr %></textarea></div><div style="clear: both"></div></div>
			<div class="formLine">
				<div class="label"><div id="invoicesMerchantLogo" style="background-image: url(<%= logo_url %>); width: 100px; height: 100px; border: 1px solid black; display: inline; zoom: 1; display: inline-block;"></div></div>
				<div class="inputt">&nbsp;</div>
			</div>
			<div class="formLine buttonsLine">
				<div class="back">
					<a href="javascript:void(0)" id="invoicesMerchantEditLogo" class="button"><%= this.l10n("edit") %></a>
				</div>
				<div class="next">
					<a href="javascript:void(0)" id="invoicesMerchantSave1" class="button"><%= this.l10n("save") %></a>
				</div>
				<div style="clear: both"></div>
			</div>
		</div>
	</div>
    <div data-id="#merchant/general/">
        <div class="block" id="invoicesMerchantGeneralTable">
			<div class="formLine">
				<div class="label">&nbsp;</div>
				<div class="inputt"><span><%= this.l10n("Currency default") %> <%= currency %></span></div>
				<div style="clear: both"></div>
			</div>
			<div class="formLine">
				<div class="label"><input type="checkbox" name="is_vat_payer" value="1"<%= is_vat_payer > 0?' checked="checked"':'' %> /></div>
				<div class="inputt"><span data-id="is_vat_payer" style="padding: 5px;border: 1px solid transparent;"><%= this.l10n("Payer VAT") %> 20%</span></div>
				<div style="clear: both"></div>
			</div>
			<div class="formLine">
				<div class="label"><input type="checkbox" name="to_notify" value="1"<%= to_notify > 0?' checked="checked"':'' %> /></div>
				<div class="inputt">
					<div data-id="to_notify" style="padding: 5px;border: 1px solid transparent;"><%= this.l10n("Notification of change of the status of the invoice") %> 
						<select name="to_sms" style="width: 163px;">
							<option value="1"<%= to_sms==1?' selected="selected"':'' %>><%= this.l10n("sms") %></option>
							<option value="0"<%= to_sms==0?' selected="selected"':'' %>><%= this.l10n("email") %></option>
						</select>
					</div>
				</div>
				<div style="clear: both"></div>
			</div>
			<div class="formLine buttonsLine">
				<div class="back">&nbsp;</div>
				<div class="next">
					<a href="javascript:void(0)" id="invoicesMerchantSave2" class="button"><%= this.l10n("save") %></a>
				</div>
				<div style="clear: both"></div>
			</div>
        </div>
    </div>
    <div data-id="#merchant/pay/">
		<div class="block" id="invoicesMerchantPayTable">
			<div class="formLine">
				<div class="label"><%= this.l10n("take on") %></div>
				<div class="inputt">
					<select name="pref_payment_id" style="width: 180px;position: relative;">
						<option value="12"<%= pref_payment_id==12?' selected="selected"':'' %>>liqpay</option>
						<option value="11"<%= pref_payment_id==11?' selected="selected"':'' %>>privat24</option>
					</select>
				</div>
				<div style="clear: both"></div>
			</div>
			<div class="formLine" data-id="12"><div class="label"><%= this.l10n("phone") %></div><div class="inputt"><%= phone %></div><div style="clear: both"></div></div>
			<div class="formLine" data-id="11"><div class="label"><%= this.l10n("card") %></div><div class="inputt"><input type="text" name="card" value="<%= card %>" placeholder="card" /></div><div style="clear: both"></div></div>
			<div class="formLine buttonsLine">
				<div class="back">&nbsp;</div>
				<div class="next">
					<a href="javascript:void(0)" id="invoicesMerchantSave3" class="button"><%= this.l10n("save") %></a>
				</div>
				<div style="clear: both"></div>
			</div>
		</div>
    </div>
</div>
