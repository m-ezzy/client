import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useChats, setUnreadAll } from '../../contexts/Chats'

import Hero from '../Hero'

export default ({ conv:{conv_id, user_id, conv_name, title, icon} }) => {
	const { chat, setChat, convData, socketRef, socket } = useChats()
	const [unread, setUnread] = useState(0)

	console.log(unread)

	setUnreadAll[conv_id] = setUnread

	// const navigate = useNavigate()
	let bgcolor = (chat && conv_id == chat.conv_id) ? 'selected' : ''

	useEffect(() => {
		socketRef.current.emit('join-conv', {conv_id: conv_id})
		// return () => {}
	}, [])

	function handleClick(e) {
		setUnread(0)
		// setUnread(prev => {
			// return {...prev, [conv_id]: 0}
		// })
		// setChat(prev => convData[conv_id])
		// navigate(`/chats/${conv_name}`)
	}
	return (
		<Link to={conv_name} className={`prev ${bgcolor}`} onClick={handleClick}>
			<Hero user_id={user_id} conv_id={conv_id} conv_name={conv_name} title={title} icon={icon} />
			{/* <img className='icon' src={`/data/icons/users/${user_id}.${icon}`} /> */}
			{/* <div> */}
				{/* <div className='title'>{title}</div> */}
				{/* <div className='conv_name'>{conv_name}</div> */}
			{/* </div> */}
			{/* {unread != 0 &&  */}
				<div className='unread'>{unread}</div>
			{/* } */}
		</Link>
	)
}
