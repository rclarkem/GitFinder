import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
	const { title, icon } = props

	return (
		<nav className='navbar bg-primary'>
			<h2>
				<Link to='/'>
					<i className={icon} />
					{title}
				</Link>
			</h2>
			<Link to='/about'>About</Link>
		</nav>
	)
}

//Prop Type for Default Props
NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
}
//Default Props for NavBar
NavBar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
}
