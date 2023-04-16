import { Outlet } from 'react-router-dom'

export default function Channels() {
	return (
		<div className='content'>
			<div style={{color: 'white'}}>channels</div>
			{/* <ExploreBar menu="channels" /> */}
			<Outlet />
		</div>
	)
}
