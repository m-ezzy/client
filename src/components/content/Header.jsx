import { useChats } from '../../contexts/Chats'

export default function Header({setInfoBarState}) {
	const { chat } = useChats()

	function handleClick(e) {
		setInfoBarState(prev => { return !prev})
	}
	return (
		<div className='header'>
			<div className='details' onClick={handleClick}>
				<img className='icon' src={`/data/icons/users/${chat.user_id}.${chat.icon}`} />
				<div>
					<div className='title'>{chat.title}</div>
					<div className='conv_name'>{chat.conv_name}</div>
				</div>
			</div>
			<div>
				<button className='button audio_call'>audio call</button>
				<button className='button video_call'>video call</button>
				<input type='text' className='textbox key' placeholder='type key of this conversation' />
				<button className='button encrypt_decrypt'>encrypt</button>
			</div>
		</div>
	)
}
