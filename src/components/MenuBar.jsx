import { Link, NavLink, useLocation } from 'react-router-dom'

export default ({menus, menu, setMenu}) => {
	let currentLocation = useLocation().pathname.split('/')[1]
	if(menu != currentLocation) {
		setMenu(prev => currentLocation)
	}
	let items = menus.map(m => {
		let classes = (m == menu ? 'selected' : '')
		return <Link to={`/${m}`} key={m} className={`button ${classes}`}>{m}</Link>

		// return <NavLink to={`/${m}`} key={m} className={(
			// {isActive, isPending}) => isPending ? "button pending" : isActive ? "button active" : "button"
		// }>{m}</NavLink>
	})
	return <div className="bar menu">{items}</div>
}
