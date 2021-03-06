import React from 'react'
import PropTypes from 'prop-types'

export default function RepoItem({ repo }) {
	return (
		<div className='card'>
			<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
				{repo.name}
			</a>
		</div>
	)
}

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired,
}
