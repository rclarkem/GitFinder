import React, { Component } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import UserDetails from './Components/Users/UserDetails'
import Users from './Components/Users/Users'
import axios from 'axios'

export default class App extends Component {
	state = {
		users: [],
		loading: false,
	}

	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get('https://api.github.com/users')
		this.setState({
			users: res.data,
			loading: false,
		})
	}

	render() {
		console.log(this.state.users)
		return (
			<div className='App'>
				<NavBar />
				<div className='containter'>
					<Users users={this.state.users} loading={this.state.loading} />
				</div>
			</div>
		)
	}
}
