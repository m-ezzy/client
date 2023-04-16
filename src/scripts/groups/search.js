Groups.prototype.search = async function() {
	let sections = this.ls.getElementsByClassName('section')
	let lists = this.ls.getElementsByClassName('list')

	Object.entries(sections).forEach(([num, e]) => {
		if (e.classList.contains('d-none') == false) {
			e.classList.add('d-none')
		}
	})
	Object.entries(lists).forEach(([num, e]) => {
		e.innerHTML = ''
	})
	this.ls.getElementsByClassName('create_title')[0].value = ''

	let q = this.ts.value
	if (q == "") {
		this.ls.classList.add('d-none')
		return
	}
	this.ls.classList.remove('d-none')

	Object.entries(this.previous).forEach(([group_id, v]) => {
		if (v.group_name == q) {
			this.ls.getElementsByClassName('section')[0].classList.remove('d-none')
			let e = this.add_item_search_previous(group_id, v)
			this.ls.getElementsByClassName('section')[0].getElementsByTagName('div')[1].appendChild(e)
		}
	})
	Object.entries(this.previous).forEach(([group_id, v]) => {
		if ( v.group_name.search(q) != -1 || v.title.search(q) != -1) {
			this.ls.getElementsByClassName('section')[1].classList.remove('d-none')
			let e = this.add_item_search_previous(group_id, v)
			this.ls.getElementsByClassName('section')[1].getElementsByTagName('div')[1].appendChild(e)
		}
	})
	let data = await fetchs(`groups/search_create_new`, {q: q})
	if(data.length == 0) {
		this.ls.getElementsByClassName('section')[2].classList.remove('d-none')
	}
}
