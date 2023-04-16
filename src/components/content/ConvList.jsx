import { useEffect, useRef } from 'react'
import { useNavigate, Await } from 'react-router-dom'

import { useUsers } from '../../contexts/Users'
import { useChats, setUnreadAll } from '../../contexts/Chats'

import ConvItem from './ConvItem'

import { fetchData } from '../../clients/api'

import { isEmpty } from '../../utils/tools'

export default function ConvList() {
	const { user } = useUsers()
	const { chat, setChat, convData, setConvData, socketRef, socket } = useChats()

	const userId = user.user_id
	// const socket = useRef(socketRef)

	const navigate = useNavigate()
	let items = []
	let data = null

	useEffect(() => {
		async function api() {
			data = await fetchData('/chats/previous/conv', {})

			setConvData(prev => data)

			console.log(data)

			// setUnread(prev => {
				// let unread = {}
				Object.keys(data).forEach(conv_id => {
					setUnreadAll[conv_id] = {}
				})
				// console.log(unread)
				// return unread
			// })

			/*setMediaData(prev => {
				let mediaData = {}
				Object.keys(data).forEach(chat_id => {
					mediaData[chat_id] = {}
				})
				return mediaData
			})*/
			
			// socketRef.current.emit('join-conv-all', {chat_ids: Object.keys(data)})
			/*data.forEach(d => {
				socket.emit('join-conv', {chat_id: d.chat_id})
			})*/
		}
		api()
		// return () => {}
	}, [])

	if (convData) {
		items = Object.entries(convData).map(([conv_id, conv]) => {
			return (
				<ConvItem key={conv_id} conv={conv}></ConvItem>
			)
		})
	}
	return (
		<div className="list conv">
			{/* <Await> */}
				{items}
			{/* </Await> */}
		</div>
	)
}
