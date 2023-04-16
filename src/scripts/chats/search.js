Chats.prototype.search = async function() {   //search_previous + search_new
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
	//this.ls.innerHTML = ""
	console.log(sections)
	let q = this.ts.value
	if (q == "") {
		this.ls.classList.add('d-none')   //toggle //add
		//this.ls.style.display = "none";
		//this.ls.style.display = "block"
		//this.ls.innerHTML = ""
		return
	}
	this.ls.classList.remove('d-none')

	let total = 0
	let exact_match = false
	let num = -1

	if (Object.keys(this.previous).length) {
		Object.entries(this.previous).forEach(([chat_id, v]) => {
			num = -1
			if (!exact_match && v.user_name == q) {
				exact_match = true
				num = 0
			} else if (v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
				num = 1
			}
			if (num != -1) {
				sections[num].classList.remove('d-none')
				let e = this.add_item_search_previous(chat_id, v)
				lists[num].appendChild(e)
				total++
			}
		})
	}/*
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		if (v.user_name == q) {
			sections[0].classList.remove('d-none')
			let e = this.add_item_search_previous(chat_id, v)
			sections[0].getElementsByTagName('div')[1].appendChild(e)
		}
	})
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		if (v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
			sections[1].classList.remove('d-none')
			let e = this.add_item_search_previous(chat_id, v)
			sections[1].getElementsByTagName('div')[1].appendChild(e)
		}
	})*/
	let data = await fetchs(`chats/search_new`, {q: q})
	if (data.length) {
		let p = Object.values(this.previous)
		let create = []
		let match = false

		data.forEach(d => {
			match = false
			for (let j = 0 ; j < p.length ; j++) {
				if (p[j].user_id == d.user_id) {
					match = true
					break
				}
			}
			if (!match) {
				num = 3
				if (!exact_match && d.user_name == q) {
					exact_match = true
					num = 2
				}
				sections[num].classList.remove('d-none')
				let e = this.add_item_search_new(d)
				lists[num].appendChild(e)
				total++
			}
		})
	}

	//add banner showing chats with whom no previous communication
	//start //start new //create //create new

	/*
	if(data.length) {
		data.forEach(v => {
			num = 3
			if (!exact_match && v.user_name == q) {
				exact_match = true
				num = 2
			}
			sections[num].classList.remove('d-none')
			let e = this.add_item_search_new(v)
			lists[num].appendChild(e)
		})
	}*/

	if (total == 0) {
		sections[4].classList.remove('d-none')
	}
}
