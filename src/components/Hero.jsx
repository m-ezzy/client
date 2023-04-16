export default ({user_id, conv_id, conv_name, title, icon}) => {
	return (
		<div className='hero'>
			<img className='icon' src={`/data/icons/users/${user_id}.${icon}`} />
			<div>
				<div className='title'>{title}</div>
				<div className='conv_name'>{conv_name}</div>
			</div>
		</div>
	)
}
