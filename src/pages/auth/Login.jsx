import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom'

import { useUsers } from '../../contexts/Users'

import { fetchData } from '../../clients/api'

import { setCookie } from '../../utils/tools'

export default function Login() {
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
    userName: '',
    password: '',
  })
	const location = useLocation()
	const navigate = useNavigate()
	const { setUser } = useUsers()

	function handleChange(e) {
		setFormData(prev => {
			return {
        ...prev,
        [e.target.name]: e.target.value
      }
		})
	}
	async function handleClick(e) {
		e.preventDefault()

		if(formData.userName == '' || formData.password == '') {
			setErrorMessage('user name and password should not be empty!')
			return
		}
		let data = await fetchData('/users/login', {userName: formData.userName, password: formData.password})
    if(data.user_id) {
			console.log(data)
			// setCookie('user_id', data.user_id, 3)
			setUser(prev => data)
			// redirect('/')
			navigate('/')
		} else {
			setErrorMessage('user name is not registered or password is incorrect!')
		}
	}
	return (
    <form className="login">
			<div className='form-field'>
				<label htmlFor='userName'>username</label>
				<input type='text' name='userName' value={formData.userName} onInput={handleChange} />
			</div>
			<div className='form-field'>
				<label htmlFor='password'>password</label>
				<input type='text' name='password' value={formData.password} onInput={handleChange} />
			</div>
			
			<button type='submit' onClick={handleClick}>login</button>

			{errorMessage && <div className='error_message'>{errorMessage}</div>}
		</form>
	)
}
