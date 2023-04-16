function isEmpty(object) {
	return (Object.keys(object).length ? false : true)
}
function getCookie(cookieKey) {
	const decodedCookie = decodeURIComponent(document.cookie) //to be careful
	const cookieArray = decodedCookie.split('; ')
	let value = null
	cookieArray.forEach(e => {
		if (e.indexOf(cookieKey + "=") === 0) {
			value = e.substring(cookieKey.length + 1)
		}
	})
	return value
}
function setCookie(cookieKey, cookieValue, expireDays) {
	const date = new Date()
	date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
	let dateString = date.toUTCString()
	document.cookie = `${cookieKey}=${cookieValue};expires=${dateString};path=/`
}

export { isEmpty, getCookie, setCookie }
