import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import DashboardLayout from '../layouts/Dashboard'
import Interaction from '../layouts/Interaction'

import Calls from '../pages/dashboard/Calls'
import Chats from '../pages/dashboard/Chats'
import Groups from '../pages/dashboard/Groups'
import Channels from '../pages/dashboard/Channels'
import Reels from '../pages/dashboard/Reels'
import Accounts from '../pages/dashboard/Accounts'
import Error from '../pages/Error'

export default function Dashboard() { /* Container */
	// let navigate = useNavigate()
	// if(user.user_id == undefined) {
		// navigate("/login")
	// }
	return (
		<Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<Navigate to='/chats' />} />

				<Route path="/calls" element={<Calls />} />
				
				<Route path="/chats" element={<Chats />} >
					<Route path=":conv_name" element={<Interaction />} />
				</Route>
				
				<Route path="/groups" element={<Groups />}>
					<Route path=":conv_name" element={<Interaction />} />
				</Route>

				<Route path="/channels" element={<Channels />}>
					<Route path=":conv_name" element={<Interaction />} />
				</Route>

				<Route path="/reels" element={<Reels />} />

				<Route path="/accounts" element={<Accounts />} />

				<Route path="/*" element={<Error />} />
			</Route>
		</Routes>
	)
}
