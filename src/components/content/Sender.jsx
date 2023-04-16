import { useRef } from 'react'

import { useUsers } from '../../contexts/Users'
import { useChats } from '../../contexts/Chats'

import { fetchData } from '../../clients/api'
// import socket from '../../../utils/socket'

export default function Sender() {
	const { user } = useUsers()
	const { chat, setMediaData, socketRef, socket } = useChats()

	// console.log('2', socketRef)

	const filesRef = useRef(null)
	const messageRef = useRef(null)
	const sentAudioRef = useRef(null)

	/*useEffect(() => {
		async function send() {
			let fd = new FormData()
			fd.append('chat_id', chat.chat_id)
			fd.append('files', filesRef.current.files[0])
			let data = await fetchData('chats/send_media/files', fd, true)

			data.forEach(d => {
				socket.chats.emit('send-media-files', d)
			})

			setPreviousMediaData(prev => {
				let newData = {...prev}
				// newData[current] = newData[current].concat(data)
				data.forEach(d => { newData[chat.chat_id].push(d) })
				return newData
			})
		}
		filesRef.current.addEventListener('change', send)
		return () => {
			filesRef.current.removeEventListener('change', send)
		}
	}, [])*/

	async function handleChangeFiles(e) {
	}
	async function handleClickLocation(e) {
	}
	async function handleClickSend(e) {
		const message = messageRef.current.value
		if(message == '') { return }
		messageRef.current.value = ''

		sentAudioRef.current.play()

		let data = await fetchData('/chats/sendMedia/message', {conv_id: chat.conv_id, text: message})
		
		let o = {
			media_id: data.media_id,
			conv_id: chat.conv_id,
			user_id: user.user_id,
			media_type: 'message',
			time_sent: data.time_sent,
			text: message
		}

		socketRef.current.emit('send-media', o)

		setMediaData(prev => {
			// console.log(prev)
			//prev is not new array. it is a reference to previousMediaData array. so we can't use push method on it directly. we need to return a new array
			let newData = {...prev}
			//there is a problem here. react doesn't allow to iterate over prev

			if (newData[chat.conv_id] == undefined) newData[chat.conv_id] = []

			newData[chat.conv_id][data.media_id] = o

			return newData
			// console.log(prev, ...prev, {...prev}, [...prev])
			// return [...prev, o]
		})
	}
	function updatePMD(type) {
	}
	return (
		<div className='sender'>
			<label className='button' htmlFor='files_media'>files</label>
			<input className='hidden' id='files_media' name='files_media' type='file' multiple ref={filesRef} />
			
			<button onClick={handleClickLocation}>location</button>

			<input type='text' name='send' placeholder='send a new text message' ref={messageRef} />
			<button onClick={handleClickSend}>send</button>

			<audio className='hidden' src={`/assets/sounds/sound-1.mp3`} ref={sentAudioRef}></audio>
		</div>
	)
}
