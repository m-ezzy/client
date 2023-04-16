import { Outlet } from 'react-router-dom'

import ExploreBar from '../../components/content/ExploreBar'

export default function Groups() {
	return (
		<div className='content'>
			<div style={{color: 'white'}}>groups</div>
			{/* <ExploreBar menu="groups" /> */}
			<Outlet />
		</div>
	)
}
