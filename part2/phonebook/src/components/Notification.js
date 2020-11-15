import React from 'react'

const Notification = ({message, type}) => {
	const notificationStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	const errorStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	if (message === null) {
		return null
	}

	if (type === 'notification') {
		return (
			<div style={notificationStyle}>
				{message}
			</div>
		)
	}
	return (
		<div style={errorStyle}>
			{message}
		</div>
	)
}

export default Notification