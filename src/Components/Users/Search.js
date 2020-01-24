import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
	state = {
		text: '',
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	handleFormSubmit = e => {
		e.preventDefault()
		if (this.state.text === '') {
			this.props.setAlert('Please enter text', 'light')
		} else {
			this.props.closeAlert()
			this.props.searchUsers(this.state.text)
			this.setState({
				text: '',
			})
		}
	}

	render() {
		return (
			<div>
				<form className='form' onSubmit={this.handleFormSubmit}>
					<input type='text' name='text' placeholder='Search Users...' value={this.state.text} onChange={this.onChange}></input>
					<input type='submit' value='Search' className='btn btn-dark btn-block'></input>
				</form>
				<button className='btn btn-light btn-block' onClick={this.props.clearUsers}>
					Clear
				</button>
			</div>
		)
	}
}
Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
}

export default Search
