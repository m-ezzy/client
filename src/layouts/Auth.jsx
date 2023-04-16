import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import MenuBar from '../components/MenuBar'

// import { getCookie } from '../utils/tools'

export default () => {
	let menus = ["signup", "login"]
	const [currentForm, setCurrentForm] = useState(menus[1])

	// const navigate = useNavigate()

	// const userId = getCookie('user_id')

	// if(userId != '') {
		// navigate('/chats')
	// }

	return(
		<div className="auth">
			<MenuBar menus={menus} menu={currentForm} setMenu={setCurrentForm} />
			<div className='holder'>
				<Outlet />
			</div>
		</div>
	)
}
