import { Outlet } from 'react-router-dom'

export default function Calls() {
	return (
		<div className='content'>
			<div style={{color: 'white'}}>calls</div>
			{/* <ExploreBar menu="calls" /> */}
			<Outlet />
		</div>
	)
}
