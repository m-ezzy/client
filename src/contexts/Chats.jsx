import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

// import { fetchData } from '../clients/api'

export const ChatsContext = createContext()

export function useChats() {
	return useContext(ChatsContext)
}

export function ChatsContextProvider(props) {
	const [chat, setChat] = useState(null)
	const [convData, setConvData] = useState(null)
	// const [unread, setUnread] = useState(null)
	const [mediaData, setMediaData] = useState({})

	let socketRef = useRef()
	let socket = socketRef.current

	let receivedAudioRef = useRef()

	const { MODE, VITE_SOCKET_PROTOCOL, VITE_SOCKET_HOSTNAME, VITE_SOCKET_PORT, VITE_SOCKET_PATH } = import.meta.env

	const SOCKET_HOSTNAME = (MODE == 'development' ? window.location.hostname : VITE_SOCKET_HOSTNAME)

	useEffect(() => {
		socketRef.current = io('ws://localhost:8000/chats')

		/*socketRef.current = io(`${VITE_SOCKET_PROTOCOL}://${SOCKET_HOSTNAME}:${VITE_SOCKET_PORT}${VITE_SOCKET_PATH}/chats`, {
			reconnectionAttempts: 50,
		})*/

		// console.log(socketRef?.current)

		// socketRef.current.emit('connection', {user_id: user.user_id})

		socketRef.current.on('receive-media', (data) => {
			console.log(data)
			// console.log(convData, unread)
			// console.log(chat, data.conv_id)
			console.log(!null)

			if( !chat || (chat && data.conv_id != chat.conv_id) ) {
				// console.log(unread)

				setUnreadAll[data.conv_id](prev => prev++)
					// return {...prev, [Number(data.conv_id)]: prev[Number(data.conv_id)]++}
				// })

				setUnreadAll[Number(data.conv_id)](prev => prev++)

				console.log(setUnreadAll)
				
				// console.log(unread[data.conv_id])
				
				/*setConvData(prev => {
					return {
						...prev,
						[data.conv_id]: {
							...prev[data.conv_id],
							unread: prev[data.conv_id].unread++
						}
					}
				})*/
			} else {
				console.log(unread[data.conv_id])
				receivedAudioRef.current.play()
			}
			setMediaData(prev => {
				let pmd = {...prev}
				if(pmd[data.conv_id] == undefined ) pmd[data.conv_id] = {}
				pmd[data.conv_id][data.media_id] = data
				// pmd[data.conv_id].push(data)
				return pmd
				// return {...prev, data}
			})
		})
		// return () => socketRef.current.off('receive-media')
		return () => socketRef.current.disconnect()
	}, [])

	return (
		<ChatsContext.Provider value={{chat, setChat, convData, setConvData, mediaData, setMediaData, socketRef, socket}}>
			{props.children}
			<audio className='hidden' src={`/assets/sounds/sound-2.mp3`} ref={receivedAudioRef}></audio>
		</ChatsContext.Provider>
	)
}

export const setUnreadAll = {}
