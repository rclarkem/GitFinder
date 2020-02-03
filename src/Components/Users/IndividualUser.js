import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from '../layout/Spinner'
import Repos from './Repos'

const IndividualUser = ({ user, user_repos, getUserRepos, getUser, loading, match }) => {
	useEffect(() => {
		getUser(match.params.login)
		getUserRepos(match.params.login)
		// eslint-disable-next-line
	}, [])

	const countBadges = type => {
		if (user[type] > 10000) {
			return user[type].toString().slice(0, 2) + 'k'
		} else if (user[type] > 100000) {
			return user[type].toString().slice(0, 3) + 'k'
		} else if (user[type] > 1000000) {
			return user[type].toString().slice(0, 1) + 'm'
		} else {
			return user[type]
		}
	}

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		company,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user

	if (loading) {
		return <Spinner />
	}

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back To Search Form
			</Link>
			<div className='card grid-2'>
				<div className='all-center'>
					<img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }}></img>
					<h1>{name}</h1>

					{location && (
						<Fragment>
							<h3>Location: {location}</h3>
						</Fragment>
					)}
					<a
						href={html_url}
						target='_blank'
						rel='noopener noreferrer'
						className='btn btn-dark my-1'
					>
						Vist Github Profile
					</a>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h2>BIO:</h2>
							<p>{bio}</p>
						</Fragment>
					)}
					<ul>
						<li>
							{login && (
								<Fragment>
									<h2>Username:</h2>
									{login}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<h2>company:</h2>
									{company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<h2>Website:</h2>
									{blog}
								</Fragment>
							)}
						</li>
						<li>
							<h2>Hireable:</h2>
							{hireable ? (
								<i className='fas fa-check text-success'>Hire Me</i>
							) : (
								<i className='fas fa-times-circle text-danger'></i>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {this.countBadges('followers')}</div>
				<div className='badge badge-success'>Following: {this.countBadges('following')}</div>
				<div className='badge badge-white'>
					Public Repos: {this.countBadges('public_repos')}
				</div>
				<div className='badge badge-dark'>
					Public Gists: {this.countBadges('public_gists')}
				</div>
			</div>
			<Repos repos={user_repos} />
		</Fragment>
	)
}
export default IndividualUser

IndividualUser.propTypes = {
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
	user_repos: PropTypes.array.isRequired,
}
