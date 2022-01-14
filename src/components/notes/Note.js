import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import FolderDrawer from './FolderDrawer';

const Note = ({ data, folderName }) => {
	const navigate = useNavigate();
	const handleOpenNote = () => {
		navigate('/notes/' + folderName + '/' + data.id)
	}

	return (
		<React.Fragment>
			<FolderDrawer />
			<Card sx={{
				cursor: 'pointer',
				width: '93vw',
				m: 2,
				borderRight: data.content.favourite ? '1px solid #900C3F' : ''
			}} onClick={handleOpenNote}>
				<CardContent>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography gutterBottom variant="h6" component="div">
							{data.content.title.length >= 50 ? data.content.title.substring(0, 50) + '...' : data.content.title}
						</Typography>
					</div>
					<Typography variant="body2" color="text.secondary">
						{data.content.body.length >= 150 ? data.content.body.substring(0, 150) + '...' : data.content.body}
					</Typography>
				</CardContent>
			</Card>
		</React.Fragment>
	)
}

export default Note
