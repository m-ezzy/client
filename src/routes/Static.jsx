import React from 'react'
import { Outlet, Routes, Route, Navigate } from 'react-router-dom'

export default function Static() {
	return (
		<Routes>
			<Route path="/" element={<div className='static'>static<Outlet /></div>}>
				<Route index element={<Navigate to='/about' />} />
				<Route path="/about" element={<div className='about'>about</div>} />
			</Route>
		</Routes>
	)
}
