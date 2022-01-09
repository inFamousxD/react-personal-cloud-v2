import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

const Note = ({ data, folderName }) => {
	const navigate = useNavigate();
	const handleOpenNote = () => {
		navigate('/notes/' + folderName + '/' + data.id)
	}

	return (
		<React.Fragment>
			<Card sx={{
				cursor: 'pointer',
				width: '92vw',
				m: 2
			}} onClick={handleOpenNote}>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						{data.content.title.length >= 50 ? data.content.title.substring(0, 50) + '...' : data.content.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{data.content.body.length >= 150 ? data.content.body.substring(0, 150) + '...' : data.content.body}
					</Typography>
				</CardContent>
			</Card>
		</React.Fragment>
	)
}

export default Note
