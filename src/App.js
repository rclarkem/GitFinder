import React, { Component } from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import UserDetails from './Components/Users/UserDetails'

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<NavBar />
				<UserDetails />
			</div>
		)
	}
}
