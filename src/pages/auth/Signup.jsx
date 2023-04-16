import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUsers } from '../../contexts/Users'

import { fetchData } from '../../clients/api'

export default function Signup() {
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		title: '',
    userName: '',
    password: ''
  })
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
		let data = await fetchData('/users/create', {title: formData.title, userName: formData.userName, password: formData.password})
    if(data.user_id) {
			setUser(prev => data)
			navigate('/')
		} else {
			setErrorMessage(prev => 'user name is not available!')
		}
	}
	return (
    <form className="signup">
			<div className='form-field'>
				<label htmlFor='title'>title</label>
				<input type='text' name='title' value={formData.title} onInput={handleChange} />
			</div>
			<div className='form-field'>
				<label htmlFor='userName'>user name</label>
				<input type='text' name='userName' value={formData.userName} onInput={handleChange} />
			</div>
			<div className='form-field'>
				<label htmlFor='password'>password</label>
				<input type='text' name='password' value={formData.password} onInput={handleChange} />
			</div>
			
			<button type='submit' onClick={handleClick}>signup</button>

			{errorMessage && <div className='error_message'>{errorMessage}</div>}
		</form>
	)
}
