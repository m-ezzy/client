import { useNavigate } from 'react-router-dom'

import { useChats } from '../../contexts/Chats'

import { fetchData } from '../../clients/api'

export default () => {
	const navigate = useNavigate()
	const { chat } = useChats()

	function handleClick() {
		async function gets() {
			let data = await fetchData('/chats/delete', {convId: chat.conv_id})
			navigate('/chats')
		}
	}

	return (
		<div className='bar info'>
			<div>title</div>
			<input type='text' name="title" value={chat.title} />
			<div>conv_name</div>
			<input type='text' name="conv_name" value={chat.conv_name} />
			
			<button onClick={handleClick}>delete</button>
		</div>
	)
}
