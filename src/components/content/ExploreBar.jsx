import { useRef, useState } from 'react'

import SearchBar from './SearchBar'
import SearchList from './SearchList'
import ConvList from './ConvList'

export default function ExploreBar() {
	const [searchResults, setSearchResults] = useState(null)

	return (
		<div className='bar explore'>
			<SearchBar setSearchResults={setSearchResults} />
			{searchResults ? 
				<SearchList searchResults={searchResults} setSearchResults={setSearchResults} /> : 
				<ConvList />
			}
		</div>
	)
}
