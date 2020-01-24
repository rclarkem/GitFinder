import React, { Component } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import Users from './Components/Users/Users'
import axios from 'axios'
import Search from './Components/Users/Search'

export default class App extends Component {
	state = {
		users: [],
		loading: false,
	}

	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			users: res.data,
			loading: false,
		})
	}

	searchUsers = async searchTerm => {
		const response = await axios.get(
			`https://api.github.com/search/users?q=${searchTerm}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			users: response.data.items,
			loading: false,
		})
	}

	render() {
		// console.log(this.state.users)
		return (
			<div className='App'>
				<NavBar />
				<div className='containter'>
					<Search searchUsers={this.searchUsers} />
					<Users users={this.state.users} loading={this.state.loading} />
				</div>
			</div>
		)
	}
}
