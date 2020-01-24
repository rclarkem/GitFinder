import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from '../layout/Spinner'

export default class IndividualUser extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login)
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
			</Fragment>
		)
	}
}

IndividualUser.propTypes = {
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
}
