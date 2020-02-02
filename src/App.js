import React, { Component, Fragment } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import Users from './Components/Users/Users'
import axios from 'axios'
import Search from './Components/Users/Search'
import Alert from './Components/layout/Alert'
import { Switch, Route } from 'react-router-dom'
import { About } from './Components/single_pages/About'
import IndividualUser from './Components/Users/IndividualUser'

// let splittedLink = res.headers.link.split(' ')[0]
// let index = splittedLink.indexOf('since') + 5
// let num = splittedLink.slice([index + 1], -2)

// let relLink = this.relativeLinkTrue(res)
// console.log(relLink, potentialHeader)
// if (relLink.includes('next')) {
// }

export default class App extends Component {
	state = {
		defaultUsers: [],
		users: [],
		user: {},
		user_repos: [],
		loading: false,
		alert: null,
		page: 1,
		headerLink: null,
	}

	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get(
			`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${this.state.page}`,
		)
		this.setState({
			defaultUsers: res.data,
			users: res.data,
			page: this.splitLink(res),
			loading: false,
		})
	}

	splitLink = linkAdd => {
		let splittedLink = linkAdd.headers.link.split(' ')[0]
		let index = splittedLink.indexOf('since') + 5
		let num = splittedLink.slice([index + 1], -2)
		return num
	}

	relativeLinkTrue = linkAdd => {
		return linkAdd.headers.link.split(' ')[1]
	}

	mainFetch = async () => {
		const res = await axios.get(
			`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${this.state.page}`,
		)
		let potentialPageNum = this.splitLink(res)
		let relLink = this.relativeLinkTrue(res)
		if (potentialPageNum !== undefined) {
			this.setState({ page: potentialPageNum })
		}
		this.setState({
			scrolling: false,
			loading: false,
			headerLink: relLink,
		})
	}

	loadMore = () => {
		this.setState(
			preState => ({
				page: preState.page,
				scrolling: true,
			}),
			this.mainFetch,
			fetch(
				`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${this.state.page}`,
			)
				.then(response => response.json())
				.then(response => {
					this.setState({ users: [...this.state.users, ...response], scrolling: false })
				}),
		)
	}

	searchUsers = async searchTerm => {
		this.setState({ loading: true })
		const response = await axios.get(
			`https://api.github.com/search/users?q=${searchTerm}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		console.log(response.headers)
		this.setState({
			users: response.data.items,
			loading: false,
		})
	}

	clearUsers = () => {
		this.setState({ users: [...this.state.defaultUsers], loading: false })
	}

	getUser = async username => {
		console.log(username)
		this.setState({ loading: true })
		const response = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			user: response.data,
			loading: false,
		})
	}

	getUserRepos = async username => {
		console.log(username)
		this.setState({ loading: true })
		const response = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		)
		this.setState({
			user_repos: response.data,
			loading: false,
		})
	}

	//Alert Validation for Input
	setAlert = (errorMessage, type) => {
		this.setState({ alert: { errorMessage, type } })
	}

	closeAlert = () => {
		this.setState({ alert: null })
	}

	render() {
		console.log('DEFAULT USERS', this.state.defaultUsers)
		// console.log('STATE', this.state)
		console.log('Users', this.state.users)
		const { users, loading, user_repos, user } = this.state
		return (
			<div className='App'>
				<NavBar />
				<div className='containter'>
					<Alert alert={this.state.alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={props => (
								<Fragment>
									<Search
										searchUsers={this.searchUsers}
										clearUsers={this.clearUsers}
										setAlert={this.setAlert}
										closeAlert={this.closeAlert}
									/>
									<Users users={users} loading={loading} mainFetch={this.loadMore} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							path='/users/:login'
							render={props => (
								<IndividualUser
									{...props}
									user={user}
									user_repos={user_repos}
									getUserRepos={this.getUserRepos}
									getUser={this.getUser}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		)
	}
}
