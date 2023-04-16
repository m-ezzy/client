import { useNavigate } from 'react-router-dom'

import  { useChats } from '../../contexts/Chats'

import Hero from '../Hero'

import { fetchData } from '../../clients/api'

export default function SearchList({searchResults, setSearchResults}) {
	let { setChat, convData, setConvData } = useChats()
	let navigate = useNavigate()

	function handleClickPrevious(e) {
		console.log(e)
		let number = e.target.dataset.number

		setSearchResults(prev => null)
		setChat(prev => searchResults.previous[number])
		navigate(`${searchResults.previous[number].conv_name}`)
	}
	async function handleClickCreate(e) {
		const user_id = e.target.dataset.userid

		let data = await fetchData('/chats/create', {user_id: user_id})
		if(data.status != 'success') { return }

		setSearchResults(prev => null)

		setConvData(prev => {
			return {
				...prev,
				[data.conv_id]: searchResults.create.find(sr => sr.user_id == user_id)
			}
		})
	}

	let items1 = []
	let items2 = []
	
	// console.log(searchResults)
	if(searchResults) {
		items1 = searchResults.previous.map(({user_id, conv_id, conv_name, title, first_name, last_name, icon}, index) => {
			console.log(index)

			return (
				<div className='prev' key={user_id} data-number={index} onClick={handleClickPrevious}>
					<Hero user_id={user_id} conv_id={conv_id} conv_name={conv_name} title={title} icon={icon} />
				</div>
			)
		})
		items2 = searchResults.create.map(({user_id, conv_name, title, first_name, last_name, icon}, index) => {
			return (
				<div className='prev' key={user_id} data-key={user_id}>
					<Hero user_id={user_id} conv_name={conv_name} title={title} icon={icon} />
					<button data-userid={user_id} onClick={handleClickCreate}>create</button>
				</div>
			)
		})
	}
	return (
		<div className='list search'>
			{searchResults.previous.length != 0 && 
				<div>
					<div>previous</div>
					{items1}
				</div>
			}
			{searchResults.create.length != 0 && 
				<div>
					<div>create</div>
					{items2}
				</div>
			}
		</div>
	)
}
