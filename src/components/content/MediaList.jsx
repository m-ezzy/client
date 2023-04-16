import { useEffect, useRef } from 'react'

import { useUsers } from '../../contexts/Users'
import { useChats } from '../../contexts/Chats'

import MediaItem from './MediaItem'

import { fetchData } from '../../clients/api'

export default () => {
	const { user} = useUsers()
	const { chat, mediaData, setMediaData } = useChats()
	// const lastMediaRef = useRef()
	let items = []

	useEffect(() => {
		// console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', chat)
		// let previousMedia = sessionStorage.getItem('previous_media')

		if(Object.keys(mediaData).includes(chat.conv_id) == false) {
			async function gets() {
				let data = await fetchData(`/chats/previous/media`, {conv_id: chat.conv_id})
				// sessionStorage.setItem('previous_media', JSON.stringify(data))
				setMediaData(prev => {
					let mediaData = {...prev, [chat.conv_id]: {}}
					data.forEach(d => {
						mediaData[chat.conv_id][d.media_id] = d
					})
					return mediaData
				})
			}
			gets()
		}
	}, [user.user_id, chat.conv_id])

	if(mediaData[chat.conv_id]) {
		items = Object.values(mediaData[chat.conv_id]).map((media, index) => {
			const isLastMedia = (Object.keys(mediaData[chat.conv_id]).length - 1) === index
			return (
				<MediaItem key={media.media_id} media={media} isLastMedia={isLastMedia}></MediaItem>
			)
		})
	} else {
		items = <div>send your first message</div>
	}
	return (
		<div className="list media">
			{items}
		</div>
	)
}
