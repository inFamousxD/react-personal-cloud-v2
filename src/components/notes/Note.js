import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Note = () => {
	return (
		<React.Fragment>
			<Card sx={{
				margin: '2vh 3.5vw 0vh 3.5vw',
			}}>
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
