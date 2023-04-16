import { useEffect } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'

import Static from '../routes/Static'
import Auth from '../routes/Auth'
import Dashboard from '../routes/Dashboard'

import { useUsers } from '../contexts/Users'

// import { UsersProvider } from '../contexts/Users'

// import { fetchData } from '../clients/api'

import { getCookie, isEmpty } from '../utils/tools'

export default function App() {
	console.log(document.cookie, getCookie('user_id'))

	const { user, setUser, convData, setConvData } = useUsers()

	// useEffect(() => {
		const userId = getCookie('user_id')
		if(userId && user == null) {
			setUser(prev => {
				return {
					user_id: userId
				}
			})
		}
	// }, [])

	return (
		<div className="app">
			<BrowserRouter>
				{/* <Static /> */}
				{/* <Auth /> */}
				{/* <Dashboard /> */}
				{((user == null) ? <Auth /> : <Dashboard />)}
			</BrowserRouter>
		</div>
	)
}
