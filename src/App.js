import React, { Component } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import Users from './Components/Users/Users'
import axios from 'axios'
import Search from './Components/Users/Search'
import Alert from './Components/layout/Alert'

export default class App extends Component {
	state = {
		defaultUsers: [],
		users: [],
		loading: false,
		alert: null,
	}

	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			defaultUsers: res.data,
			users: res.data,
			loading: false,
		})
	}

	searchUsers = async searchTerm => {
		this.setState({ loading: true })
		const response = await axios.get(
			`https://api.github.com/search/users?q=${searchTerm}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			users: response.data.items,
			loading: false,
		})
	}

	clearUsers = () => {
		this.setState({ users: [...this.state.defaultUsers], loading: false })
	}

	setAlert = (errorMessage, type) => {
		this.setState({ alert: { errorMessage, type } })
	}

	closeAlert = () => {
		this.setState({ alert: null })
	}

	render() {
		console.log('STATE', this.state)
		const { users, loading } = this.state
		return (
			<div className='App'>
				<NavBar />
				<div className='containter'>
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						setAlert={this.setAlert}
						closeAlert={this.closeAlert}
					/>
					<Users users={users} loading={loading} />
				</div>
			</div>
		)
	}
}
