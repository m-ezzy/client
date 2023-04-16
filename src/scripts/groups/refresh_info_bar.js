Groups.prototype.refresh_info_bar = function(group_id) {
    this.bari.getElementsByClassName('profile-picture')[0].src = (this.previous[group_id].extension == null) ? this.place_holder : `data/icons/groups/${group_id}.${this.previous[group_id].extension}`
    this.bari.getElementsByClassName('group_name')[0].value = this.previous[group_id].group_name
    this.bari.getElementsByClassName('title')[0].value = this.previous[group_id].title

	this.lmem.innerHTML = ''
    Object.entries(this.previous[group_id].members).forEach(([user_id, v]) => {
		this.add_item_member(user_id, v)
	})
}
