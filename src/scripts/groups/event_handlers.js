Groups.prototype.handle_click_button_back = function() {
	this.ls.style.display = 'none'
}
Groups.prototype.handle_input_text_search = function() {
	this.search()
}
Groups.prototype.handle_click_button_search = function() {
	this.search()
}
Groups.prototype.handle_click_search_previous = async function(group_id) {   //take_to_previous //search_previous
	this.ls.style.display = 'none'
	await this.handle_click_prev(group_id)
}
Groups.prototype.handle_click_create = async function() {
	let title = this.ls.getElementsByClassName("text create_title")[0].value
	if(title == '') { return }
	this.ls.style.display = 'none'
	let data = await fetchs(`${this.names}/create`, {group_name: this.ts.value, title: title})   //`group_name=${this.ts.value}&title=${title}`
	this.previous[data.group_id] = data.value
	//this.previous[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down};
	socket[this.names].emit('created-new-group', {'group_id': data.group_id})

	await this.add_item_previous(data.group_id, data.value)
	await this.add_item_conv(data.group_id)
	await this.handle_click_prev(data.group_id)
}
Groups.prototype.handle_click_prev = function(group_id) {
	if ( this.current == group_id ) {return}
	if (this.current) {
		document.getElementById(`prev_groups_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`conv_groups_${this.current}`).style.display = 'none'
	}
	this.current = group_id
	document.getElementById(`prev_groups_${group_id}`).style.backgroundColor = 'var(--item-bg)'
	document.getElementById(`conv_groups_${group_id}`).style.display = 'block'

	this.di.src = (this.previous[group_id].extension) ? `data/icons/groups/${group_id}.${this.previous[group_id].extension}` : this.place_holder
	this.dt.innerHTML = `<div>${this.previous[group_id].title}</div><div class='trio_name'>@${this.previous[group_id].group_name}</div>`

	if(this.previous[this.current].row_up <= 0) {return}
	this.history_conv(group_id)

	if (this.bari.classList.contains('d-none') == false) {
		this.refresh_info_bar(group_id)
	}
}
Groups.prototype.handle_click_details = function() {   //shows the info bar
	this.handle_click_info(this.current)
}
Groups.prototype.handle_click_info = function() {
	this.bari.classList.toggle('d-none')
	this.refresh_info_bar(this.current)
}
Groups.prototype.handle_click_add_member = async function() {   //add_member //join
	let data = await fetchs(`${this.names}/add_member`, {group_id: this.current, user_name: this.tam.value})   //`group_id=${this.current}&user_id=${this.tam.value}`
	this.previous[this.current].members[data.user_id] = data.value
	this.add_item_member(data.user_id, data.value)
	socket[this.names].emit('added-member', {'group_id': this.current, 'value': JSON.stringify(this.previous[this.current])})
}
Groups.prototype.handle_click_call = async function(call_type) {
	await calls.handle_click_menu()
	await calls.make_call_groups(call_type, this.current, this.previous[this.current].members)
}
Groups.prototype.handle_input_text_key = function() {
	let messages = JSON.parse(sessionStorage.getItem(`${this.names}_messages_${this.current}`))

	Object.entries(document.getElementById(`conv_${this.names}_${this.current}`).getElementsByClassName('msg')).forEach(([num, m]) => {
		if (this.encrypt_decrypt == 'encrypt') {
			m.textContent = encryption(messages[num].text, this.tk.value)
		} else {
			m.textContent = decryption(messages[num].text, this.tk.value)
		}
	})
}
Groups.prototype.handle_click_button_key = function() {
	this.encrypt_decrypt = (this.encrypt_decrypt == 'encrypt') ? 'decrypt' : 'encrypt'
	this.bk.innerHTML = this.encrypt_decrypt
	this.handle_input_text_key()
}
Groups.prototype.handle_click_edit = async function() {
	this.fpp.classList.remove('d-none')
	this.tgn.removeAttribute('readonly')
	this.tt.removeAttribute('readonly')

	this.bedit.classList.add('d-none')
	this.bsubmit.classList.remove('d-none')
	this.bcancel.classList.remove('d-none')
	// this.bari.getElementsByClassName('submit_cancel')[0].classList.remove('d-none')
}
Groups.prototype.handle_click_submit = async function() {
	let group_id = this.current
	let s = '';
	/*if (this.previous[this.current].group_name == this.tgn && this.previous[this.current].title == this.tt) {
		return
	}*/
	if (this.previous[group_id].group_name != this.tgn.value) {
		s += `group_name='${this.tgn.value}'`
		this.previous[group_id].group_name = this.tgn.value
	}
	if (this.previous[group_id].title != this.tt.value) {
		console.log(s)
		console.assert(s != '')
		if(s != '') {
			s += ','
		}
		s += `title='${this.tt.value}'`
		this.previous[group_id].title = this.tt.value
	}
	if (s == '') {
		return
	}
	let status = await fetchs('groups/update_info', {'group_id': group_id, 'o': s})
	this.handle_click_cancel()
}
Groups.prototype.handle_click_cancel = async function() {
	this.fpp.classList.add('d-none')
	this.tgn.setAttribute('readonly', true)
	this.tt.setAttribute('readonly', true)

	this.bedit.classList.remove('d-none')
	this.bsubmit.classList.add('d-none')
	this.bcancel.classList.add('d-none')

	//empty the file in input file tag if there is any
	this.tgn.value = this.previous[this.current].group_name
	this.tt.value = this.previous[this.current].title
}
Groups.prototype.handle_click_leave = async function() {
	console.table(this)
	console.trace(this)

	let data = await fetchs(`groups/leave`, {'group_id': this.current})   //`group_id=${this.current}`
	this.lp.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	this.lc.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	this.previous[this.current] = {}
	this.current = 0
	
	//also emmit event to leave this socket.io room
	if (Object.keys(this.previous).length) {
		this.handle_click_prev(Object.keys(this.previous)[0])
	} else {
		this.di.src = ''
		this.dt.innerHTML = ''
		this.tgn.value = ''
		this.tt.value = ''
		this.lmem.innerHTML = ''
		// this.lmem.style.display = 'none'
	}
}
Groups.prototype.handle_scroll_conv = function(group_id) {
	if (document.getElementById(`conv_groups_${group_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	this.history_conv(group_id);
}
Groups.prototype.handle_focus_text_message = function() {
	document.addEventListener("keyup", groups.handle_keyup_send_message)
}
Groups.prototype.handle_blur_text_message = function() {
	document.removeEventListener("keyup", groups.handle_keyup_send_message)
}
Groups.prototype.handle_click_send_message = async function(group_id = this.current, message = this.tm.value, key = this.tk.value) {
	if ([message, key].includes('')) {
		return
	}
	let encrypted_message = encryption(message, key)
	let data = await fetchs(`groups/send_message`, {group_id: group_id, encrypted_message: encrypted_message})   //`group_id=${group_id}&encrypted_message=${encrypted_message}`
	this.previous[group_id].row_down = data.group_media_id
	this.add_item_media(group_id, me.user_id, data.group_media_id, 0, message)
	socket[this.names].emit('send-message', {'group_id': group_id, 'user_id': me.user_id, "media_id": data.group_media_id, 'encrypted_message': encrypted_message})
}
/*
let handle = {
	keyup: {},
}*/
Groups.prototype.handle_keyup_send_message = async function(e) {
	if(e.key == "Enter") {
		this.handle_click_send_message();
	}
}
