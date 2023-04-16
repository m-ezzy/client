Content.prototype.handle_click_menu = async function() {
	if (Content.current.number == this.number) {return} //OR
	if (this.is_open) {return}

	if (Content.current) {
		Content.current.is_open = 0
		Content.current.element.style.display = 'none'
		//Content.current.menu.style.backgroundColor = 'var(--bg-mb)'
		menu_bar.elements[Content.current.number].style.backgroundColor = 'var(--bg-mb)'
	}
	Content.current = this

	this.is_open = 1
	this.element.style.display = 'flex'
	menu_bar.elements[this.number].style.backgroundColor = 'var(--item-bg)'
	//menu_bar.elements[this.number].style.color = 'var(--item-selected-text)';

	if (this.loaded == 0) {
		this.loaded = 1

		if (this.name == 'account') {
			let {json, html} = await fetchs(`${this.name}/load`, '')
			this.element.innerHTML = html
			//me = json
			return
		}

		let {json, html} = await fetchs(`${this.names}/load`, '')
		this.element.innerHTML = html

		this.initialize()
		await this.get_previous()
		if (this.name != 'call' && this.previous) {
			await this.handle_click_prev(Object.keys(this.previous)[0])
		}
	}
}
