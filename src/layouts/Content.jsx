import { Outlet } from "react-router-dom"

import { useChats } from '../contexts/Chats'

import ExploreBar from "../components/content/ExploreBar"

export default function Content() {
	let { chat } = useChats()

	return (
		<div className="content">
			<ExploreBar />
			<Outlet />
			{/* {chat && <Outlet />} */}
		</div>
	)
}
