import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

const Note = () => {
	const navigate = useNavigate();
	const handleOpenNote = () => {
		navigate('/notes/note-id')
	}

	return (
		<React.Fragment>
			<Card sx={{
				margin: '2vh 3.5vw 0vh 3.5vw'
			}} onClick={handleOpenNote}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Lizard
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
			</Card>
		</React.Fragment>
	)
}

export default Note
