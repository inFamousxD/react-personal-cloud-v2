import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Card, CardContent, Icon, Typography } from '@mui/material'
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
				width: '93vw',
				m: 2,
			}} onClick={handleOpenNote}>
				<CardContent>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography gutterBottom variant="h6" component="div">
							{data.content.title.length >= 50 ? data.content.title.substring(0, 50) + '...' : data.content.title}
						</Typography>
						<Icon>
						{ data.content.favourite ? <Bookmark sx={{ color: 'primary.main' }}/> : <BookmarkBorder sx={{ color: 'primary.main' }}/> }
						</Icon>
					</div>
					<Typography variant="body2" color="text.secondary">
						{data.content.body.length >= 150 ? data.content.body.substring(0, 150) + '...' : data.content.body}
					</Typography>
					<Typography variant="body2" color="text.primary" sx={{mt: 1}}>
						{new Date(data.createdAt).toDateString()}
					</Typography>
				</CardContent>
			</Card>
		</React.Fragment>
	)
}

export default Note
