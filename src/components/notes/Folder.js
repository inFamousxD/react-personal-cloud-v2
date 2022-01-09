import { Card, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Folder = ({folderName}) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/notes/' + folderName)
	}

	return (
		<div>
			<Card sx={{ display: 'flex', width: '93vw', m: 2, cursor: 'pointer' }} onClick={handleNavigate}>
				<Typography color='text.secondary' sx={{m: 2}}>{folderName}</Typography>
			</Card>
		</div>
	)
}

export default Folder
