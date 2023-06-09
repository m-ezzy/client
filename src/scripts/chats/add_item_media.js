Chats.prototype.add_item_media = function(chat_id, user_id, chat_media_id, media_type, text, time) {
	let text2 = (user_id == me.user_id) ? `${me.first_name} ${me.last_name}` : `${this.previous[chat_id].first_name} ${this.previous[chat_id].last_name}`;
	let sender = create_div("border-bottom sender_specifier", "", "", text2);
	let time_tag = create_div("time", "", "", time);

	let class_name = ((user_id == me.user_id) ? 'sent' : 'received');
	let m = create_div("border " + class_name, `media_chats_${chat_media_id}`, '', '');

	let e;
	if(media_type == 0) {
		let message = (user_id == me.user_id) ? text : decryption(text, this.tk.value);
		m.classList.add('messages');   //e.className +=  `messages`;
		e = create_div('msg', '', '', message);
	} else if(media_type == 1) {
		m.classList.add('images');
		e = create_image('', '', '', `data/chats/${chat_id}/${chat_media_id}.${text}`, '200', '200');
	} else if(media_type == 2) {
		m.classList.add('videos');
		e = create_video('', '', '', '', '200', '200');
	}

	m.appendChild(sender)
	m.appendChild(e)
	m.appendChild(time_tag)
	document.getElementById(`conv_chats_${chat_id}`).appendChild(m);

	// document.getElementById(`conv_chats_${chat_id}`).scrollBy(0, 500);
	/*this.previous[this.current].conversation.scrollBottom();
	/*this.previous[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/
	document.getElementById(`media_chats_${chat_media_id}`).scrollIntoView()
}
