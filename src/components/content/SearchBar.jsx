import { useContext, useRef, forwardRef } from "react"

import  { useChats } from '../../contexts/Chats'

import { fetchData } from "../../clients/api"

export default function SearchBar({setSearchResults}) { //SearchWrapper
	const searchRef = useRef(null)

	let { convData } = useChats()

	function handleClick() {
		setSearchResults(prev => null)
	}
	async function handleInput(e) {
		let q = searchRef.current.value

		if(q == '') {
			handleClick()
		} else {
			let previous = Object.entries(convData).filter(([conv_id, chat]) => chat.conv_name.includes(q))
			console.log(previous)
			
			let data = await fetchData('/chats/search_new', {q: searchRef.current.value})

			setSearchResults(prev => {
				return {
					previous: previous.map((pre) => pre[1]),
					create: data,
				}
			})
		}
	}
	return (
		<div className='wrapper_search'>
			<button className='button' onClick={handleClick}>back</button>
			<input className='textbox' type='text' name='search' placeholder="type here to search" ref={searchRef} onInput={handleInput} />
		</div>
	)
}
