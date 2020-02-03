import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Search({ searchUsers, clearUsers, setAlert, closeAlert }) {
	const [text, setText] = useState('')

	const onChange = e => setText(e.target.value)

	const handleFormSubmit = e => {
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter text', 'light')
		} else {
			closeAlert()
			searchUsers(text)
			setText('')
		}
	}

	return (
		<div>
			<form className='form' onSubmit={handleFormSubmit}>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				></input>
				<input type='submit' value='Search' className='btn btn-dark btn-block'></input>
			</form>
			<button className='btn btn-light btn-block' onClick={clearUsers}>
				Clear
			</button>
		</div>
	)
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
}
