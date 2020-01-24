import React, { Component } from 'react'

export class Search extends Component {
	state = {
		text: '',
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	handleFormSubmit = e => {
		e.preventDefault()
		this.props.searchUsers(this.state.text)
		this.setState({
			text: '',
		})
	}

	render() {
		return (
			<div>
				<form className='form' onSubmit={this.handleFormSubmit}>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
						value={this.state.text}
						onChange={this.onChange}
					></input>
					<input type='submit' value='Search' className='btn btn-dark btn-block'></input>
				</form>
			</div>
		)
	}
}

export default Search
