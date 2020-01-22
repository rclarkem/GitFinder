import React from 'react'
import PropTypes from 'prop-types'

export default function UserDetails(props) {
	const { id, login, avatar_url, html_url } = props.user
	return (
		<div className='card text-center'>
			<img src={avatar_url} alt='profile-pic' className='round-img' style={{ width: '60px' }}></img>
			<h3>{login}</h3>
			<div>
				<a
					href={html_url}
					target='_blank'
					rel='noopener noreferrer'
					className='btn btn-dark btn-sm my-1'
				>
					More
				</a>
			</div>
		</div>
	)
}

UserDetails.propTypes = {
	user: PropTypes.object.isRequired,
}
