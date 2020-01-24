import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function UserDetails(props) {
	// console.log(props)
	const { id, login, avatar_url, html_url } = props.user
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt='profile-pic'
				className='round-img'
				style={{ width: '60px' }}
			></img>
			<h3>{login}</h3>
			<div>
				<Link to={`/users/${login}`} className='btn btn-dark btn-sm my-1'>
					More
				</Link>
			</div>
		</div>
	)
}

UserDetails.propTypes = {
	user: PropTypes.object.isRequired,
}
