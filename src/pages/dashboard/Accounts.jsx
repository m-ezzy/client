import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom'

import { useUsers } from '../../contexts/Users'

import { setCookie } from '../../utils/tools'

export default function Accounts() { //Profiles
	const { user, setUser } = useUsers()

	function handleClickLogout() {
		setCookie('user_id', null, -1)
		setUser(prev => null)
	}

	console.log('golden house of finarfin')

	return (
		<div className='content accounts'>
			<img src={`/data/icons/users/${user.user_id}.${user.icon}`} />
			<table>
				<tr>
					<td>user id:</td><td>{user.user_id}</td>
				</tr>
				<tr>
					<td>user name:</td><td>{user.user_name}</td>
				</tr>
				<tr>
					<td>title:</td><td>{user.title}</td>
				</tr>
			</table>
			<button onClick={handleClickLogout}>logout</button>

			<Link to='/login' className='button'>login</Link>

			{/* <ExploreBar menu="account" /> */}
			<Outlet />
		</div>
	)
}
