import React from 'react'

const Alert = ({ alert }) => {
	// const { alert } = props

	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle'>{alert.errorMessage}</i>
			</div>
		)
	)
}

export default Alert
