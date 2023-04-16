import { useEffect, useRef } from 'react'

import { useUsers } from '../../contexts/Users'
import { useChats } from '../../contexts/Chats'

export default ({ media:{ media_id, user_id, time_sent, media_type, text }, isLastMedia }) => {
	const { user} = useUsers()
	const { chat, mediaData } = useChats()
	const lastMediaRef = useRef()

	useEffect(() => {
		if(lastMediaRef.current) {
			lastMediaRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
		}
	}, [chat.conv_id, mediaData[chat.conv_id]])

	const c = (user_id == user.user_id) ? 'sent' : 'received'
	// const isLastMedia = (Object.keys(mediaData[chat.conv_id]).length - 1) === index

	return (
		<div className={`item media ${c}`} ref={isLastMedia ? lastMediaRef : null} key={media_id}>
			{(media_type == 'message') && <div className='message'>{text}</div>}
			{(media_type == 'image') && <img className='border' src={`api/get_media_data/${media_id}.${text}`} />}
			{(media_type == 'video') && <video className='border' controls><source src={`api/get_media_data/${media_id}.${text}`} type='video/mp4' /></video>}
			{(media_type == 'audio') && <audio controls src={`api/get_media_data/${media_id}.${text}`}></audio>}
			{(media_type == 'document') && <><div>document</div><a className='border' href={`api/get_media_data/${media_id}.${text}`} download>download</a></>}
			<div className='time'>{time_sent}</div>
		</div>
	)
}
