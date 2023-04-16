let socket = {
	def: io('/'),
	chats: io('/chats'),
	groups: io('/groups'),
	channels: io('/channels'),
};

socket.def.emit('new-connection', { 'user_id': getCookie('user_id') });

//chats.socket = io('/chats');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

socket.chats.on('receive-message', (data) => {
	console.log(data)
    chats.add_item_media(data.chat_id, chats.previous[data.chat_id].user_id, data.chat_media_id, 0, data.encrypted_message)

	if (chats.current != data.chat_id) {
		//document.getElementById(`nmi_chats_${data.chat_id}`).innerHTML = (Number(document.getElementById(`nmi_chats_${data.chat_id}`).innerText) + 1)
		document.getElementById(`nmi_chats_${data.chat_id}`).innerHTML = 1
	}
})
socket.groups.on('joined-new-group', (data) => {
	console.log(data)
	this.previous[data.group_id] = data.value
	//this.previous[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	this.add_item_previous(data.group_id, data.value)
	this.add_item_conv(data.group_id)
})
socket.groups.on('receive-message', (data) => {
	console.log(data)
    groups.add_item_media(data.group_id, data.user_id, 500, 0, data.encrypted_message)

	if (this.current != data.group_id) {
		document.getElementById(`nmi_groups_${group_id}`).innerHTML = (Number(document.getElementById(`conv_groups_${group_id}`).innerText) + 1)
	}
})
socket.channels.on('receive-message', (data) => {
})
