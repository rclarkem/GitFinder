import React from 'react'
import UserDetails from './UserDetails'
import { Spinner } from '../layout/Spinner'
import PropTypes from 'prop-types'
import Button from '../layout/Button'

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
}

const Users = props => {
	const { users, loading, searched } = props

	const renderButton = () => {
		if (users.length > 1 && searched !== true) {
			return <Button mainFetch={props.mainFetch} text='Load More Main Users' />
		} else if (users.length < 2 && searched === true) {
			return <Button />
		}
	}

	if (loading) {
		return <Spinner />
	} else {
		return (
			<div style={userStyle}>
				{users.map(user => {
					return (
						<UserDetails
							key={user.id}
							user={user}
							getUser={props.getUser}
							getUserRepos={props.getUserRepos}
						/>
					)
				})}
				{renderButton()}
			</div>
		)
	}
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	searched: PropTypes.bool.isRequired,
}

export default Users
