import { useState } from 'react'
import { Outlet, useNavigate, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'

import AuthLayout from '../layouts/Auth'

import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
// import ForgotPassword from '../pages/auth/ForgotPassword'
import Error from '../pages/Error'

export default function AuthRoutes() {
	// let navigate = useNavigate()
	// if(user.user_id) {
		// navigate("/chats")
	// }
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route index element={<Navigate to='/login' />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				{/* <Route path="/password_reset" element={<ForgotPassword />} /> */}
				{/* <Route path="/*" element={<Error />} /> */}
			</Route>
		</Routes>
	)
}
