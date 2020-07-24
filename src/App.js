import React, { Fragment, useState, useEffect } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import Users from './Components/Users/Users'
import axios from 'axios'
import Search from './Components/Users/Search'
import Alert from './Components/layout/Alert'
import { Switch, Route } from 'react-router-dom'
import { About } from './Components/single_pages/About'
import IndividualUser from './Components/Users/IndividualUser'

export default function App() {
	const [defaultUsers, setDefaultUsers] = useState([])
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [user_repos, setUserRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlertState] = useState(null)
	const [page, setPage] = useState(1)
	const [headerLink, setHeaderLink] = useState(null)
	const [searched, setSearched] = useState(false)

	useEffect(() => {
		setLoading(true)
		const fetchData = async () => {
			const res = await axios.get(
				`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${page}`
			)
			setDefaultUsers(res.data)
			setUsers(res.data)
			setPage(splitLink(res))
			setLoading(false)
		}
		fetchData()
	}, [])

	// These two functions help iterate through Github API for loadMore() function and mainFetch()
	const splitLink = (linkAdd) => {
		let splittedLink = linkAdd.headers.link.split(' ')[0]
		let index = splittedLink.indexOf('since') + 5
		let num = splittedLink.slice([index + 1], -2)
		return num
	}

	const relativeLinkTrue = (linkAdd) => {
		return linkAdd.headers.link.split(' ')[1]
	}

	const mainFetch = async () => {
		const res = await axios.get(
			`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${page}`
		)
		let potentialPageNum = splitLink(res)
		let relLink = relativeLinkTrue(res)
		if (potentialPageNum !== undefined) {
			setPage(potentialPageNum)
		}
		setLoading(false)
		setHeaderLink(relLink)
	}

	// Load more users on the default page
	const loadMore = () => {
		setPage((prevPage) => prevPage.page)
		mainFetch()
		fetch(
			`https://api.github.com/users?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&since=${page}`
		)
			.then((response) => response.json())
			.then((response) => {
				setUsers([...users, ...response])
			})
	}

	const searchUsers = async (searchTerm) => {
		setLoading(true)
		const response = await axios.get(
			`https://api.github.com/search/users?q=${searchTerm}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		setUsers(response.data.items)
		setLoading(false)
		setSearched(true)
	}

	// Clears state for the users to go back to default page
	const clearUsers = () => {
		setUsers([...defaultUsers])
		setLoading(false)
		setSearched(false)
	}

	const getUser = async (username) => {
		setLoading(true)
		const response = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		setUser(response.data)
		setLoading(false)
	}

	const getUserRepos = async (username) => {
		setLoading(true)
		const response = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		setUserRepos(response.data)
		setLoading(false)
	}

	//Alert Validation for Input
	const setAlert = (errorMessage, type) => {
		setAlertState({ errorMessage, type })
	}

	const closeAlert = () => {
		setAlertState(null)
	}

	console.log(user)

	return (
		<div className='App'>
			<NavBar />
			<div className='containter'>
				<Alert alert={alert} />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) => (
							<Fragment>
								<Search
									searchUsers={searchUsers}
									clearUsers={clearUsers}
									setAlert={setAlert}
									closeAlert={closeAlert}
								/>
								<Users
									searched={searched}
									users={users}
									loading={loading}
									mainFetch={loadMore}
								/>
							</Fragment>
						)}
					/>
					<Route exact path='/about' component={About} />
					<Route
						path='/users/:login'
						render={(props) => (
							<IndividualUser
								{...props}
								user={user}
								user_repos={user_repos}
								getUserRepos={getUserRepos}
								getUser={getUser}
								loading={loading}
							/>
						)}
					/>
				</Switch>
			</div>
		</div>
	)
}
