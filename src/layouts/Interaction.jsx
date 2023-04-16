import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useChats } from '../contexts/Chats'

import ConversationBar from '../components/content/ConversationBar'
import InfoBar from '../components/content/InfoBar'

export default function Interaction() {
	const [infoBarState, setInfoBarState] = useState(false)

	// let o = convData.find(cd => cd.chat_id == chat_id)

	const { chat, setChat, convData } = useChats()

	let conv_name = useParams().conv_name
	console.log(useParams())

	let found = null


	let convNumber = convData ? Object.keys(convData).length : 0
	console.log(888888888888, convNumber)

	let navigate = useNavigate()

	if(convData) {
		found = Object.entries(convData).find(([conv_id, chat]) => chat.conv_name == conv_name)
		console.log(found)
	}

	useEffect(() => {
		// if(found == undefined) navigate('/chats')

		// if( found && (!chat || conv_name != chat.conv_name) ) {
			// console.log(found)
		
		if(convData && chat?.conv_name != conv_name) {
			// found = Object.entries(convData).find(([conv_id, chat]) => chat.conv_name == conv_name)
		
			setChat(prev => {
				return {
					conv_id: found[0],
					...found[1],
				}
			})
		}
		// } else {
			// navigate('/chats')
		// }
	}, [convNumber, conv_name])
	// }, [found[0], chat, chat?.conv_id])

	return (
		<div className='interaction'>
			{chat && <ConversationBar setInfoBarState={setInfoBarState} />}
			{chat && infoBarState && <InfoBar />}
		</div>
	)
}
