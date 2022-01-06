import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import FolderDrawer from './FolderDrawer';

const Note = () => {
	const location = useLocation().pathname.split('/');
	location.shift();
	console.log(location)
	return (
		<React.Fragment>
			<FolderDrawer />
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
				{/* <CardActions>
					<Button variant='text' size="small">Share</Button>
					<Button size="small">Learn More</Button>
				</CardActions> */}
			</Card>
		</React.Fragment>
	)
}

export default Note
