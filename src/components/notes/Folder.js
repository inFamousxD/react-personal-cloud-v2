import { Card, Typography } from '@mui/material'
import React from 'react'

const Folder = ({folderName}) => {
	return (
		<div>
			<Card sx={{ display: 'flex', width: '93vw', m: 2, cursor: 'pointer' }}>
				<Typography color='text.secondary' sx={{m: 2}}>{folderName}</Typography>
			</Card>
		</div>
	)
}

export default Folder
