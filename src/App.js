import React from 'react'
import './App.css'
import NavBar from './Components/layout/NavBar'
import UserDetails from './Components/Users/UserDetails'
import Users from './Components/Users/Users'

export default function App() {
	return (
		<div className='App'>
			<NavBar />
			<div className='containter'>
				<Users />
			</div>
		</div>
	)
}
