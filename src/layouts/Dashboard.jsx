import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Assistant from '../components/Assistant'
import MenuBar from '../components/MenuBar'

import { useUsers } from '../contexts/Users'

import { fetchData } from '../clients/api'

import { getCookie, isEmpty } from '../utils/tools'

export default () => {
	let menus = ["calls", "chats", "groups", "channels", "reels", "accounts"]

	const [menu, setMenu] = useState(menus[1])

	// const navigate = useNavigate()

	const { user, setUser, convData, setConvData } = useUsers()

	const userId = user.user_id

	// const userId = getCookie('user_id')

	// if(userId == '') {
		// navigate('/login')
	// }

	useEffect(() => {
		async function gets() {
			let data = await fetchData('/users/info', {userId: getCookie('user_id')})
			setUser(prev => data)
		}
		if(userId) {
			gets()
		}
	}, [userId])

	return(
		<div className="dashboard">
			<Assistant />
			<MenuBar menus={menus} menu={menu} setMenu={setMenu} />
			<Outlet />
		</div>
	)
}
