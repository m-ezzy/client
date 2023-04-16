import { useState } from "react"

export function useLocalStorage() {
	const [data, useData] = useState({})

	return data
}
