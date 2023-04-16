import { createContext, useContext, useState, useEffect } from 'react'
// import { fetchData } from '../utils/tools'

const UsersContext = createContext({})

export function useUsers() {
	return useContext(UsersContext)
}
export function UsersProvider({ children }) {
	const [user, setUser] = useState(null)
	const [convData, setConvData] = useState(null)

	return (
		<UsersContext.Provider value={{ user, setUser, convData, setConvData }}>
			{children}
		</UsersContext.Provider>
	)
}
