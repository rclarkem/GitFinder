import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from '../layout/Spinner'

export default class IndividualUser extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login)
	}

	count = type => {
		if (this.props.user[type] > 10000) {
			return this.props.user[type].toString().slice(0, 2) + 'k'
		} else if (this.props.user[type] > 100000) {
			return this.props.user[type].toString().slice(0, 3) + 'k'
		} else if (this.props.user[type] > 1000000) {
			return this.props.user[type].toString().slice(0, 1) + 'm'
		} else {
			return this.props.user[type]
		}
	}

	render() {
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
		} = this.props.user
		const { loading } = this.props

		if (loading) {
			return <Spinner />
		}

		return (
			<Fragment>
				<Link to='/' className='btn btn-light'>
					Back To Search Form
				</Link>
				hireable:
				{hireable ? (
					<i className='fas fa-check text-success'></i>
				) : (
					<i className='fas fa-times-circle text-danger'></i>
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						<img
							src={avatar_url}
							className='round-img'
							alt=''
							style={{ width: '150px' }}
						></img>

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
						</ul>
					</div>
				</div>
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers: {this.count('followers')}</div>
					<div className='badge badge-success'>Following: {this.count('following')}</div>
					<div className='badge badge-danger'>Public Repos: {this.count('public_repos')}</div>
					<div className='badge badge-dark'>Public Gists: {this.count('public_gists')}</div>
				</div>
			</Fragment>
		)
	}
}

IndividualUser.propTypes = {
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
}
