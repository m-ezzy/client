import {  } from 'react'
import { Outlet } from 'react-router-dom'

import { useChats, ChatsContextProvider } from '../../contexts/Chats'

import Content from '../../layouts/Content'

import ExploreBar from '../../components/content/ExploreBar'

export default function Chats() {
	return (
		// <div className='content'>
			<ChatsContextProvider>
				<Content />
				{/* <ExploreBar /> */}
				{/* <Outlet /> */}
			</ChatsContextProvider>
		// </div>
	)
}
