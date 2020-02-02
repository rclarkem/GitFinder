import React from 'react'

export default function Button(props) {
	console.log(props)
	return <button onClick={() => props.mainFetch()}>{props.text}</button>
}
