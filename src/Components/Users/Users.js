import React, { Component } from 'react'
import UserDetails from './UserDetails'
import { Spinner } from '../layout/Spinner'
import PropTypes from 'prop-types'

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
}

const Users = props => {
	const { users, loading } = props
	if (loading) {
		return <Spinner />
	} else {
		return (
			<div style={userStyle}>
				{users.map(user => {
					return <UserDetails key={user.id} user={user} />
				})}
			</div>
		)
	}
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
}

export default Users
