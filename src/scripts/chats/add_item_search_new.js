Chats.prototype.add_item_search_new = function({user_id, user_name, first_name, last_name, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`)

	let div = create_div('flex wrapper border-bottom prev', '', '', '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	let text = document.createTextNode(`${first_name} ${last_name}`)
	let create = create_div("flex button border square bg-green create", "", `chats.handle_click_create(${user_id},'${user_name}','${first_name}','${last_name}','${extension}')`, 'create')

	images.appendChild(img)
	div.appendChild(images)
	div.appendChild(text)
	div.appendChild(create)
	//this.ls.appendChild(div)
	return div
}
