import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NavBar extends Component {
	render() {
		return (
			<nav className='navbar bg-primary'>
				<h2>
					<i className={this.props.icon} />
					{this.props.title}
				</h2>
			</nav>
		)
	}
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
