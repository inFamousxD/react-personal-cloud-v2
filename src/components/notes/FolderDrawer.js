import { SwipeableDrawer } from '@mui/material'
import React from 'react'

const FolderDrawer = () => {
	const [open, setOpen] = React.useState(true);

	const toggleDrawer = (toggle) => {
		setOpen(toggle);
	}
	return (
		<div>
			<SwipeableDrawer anchor='left' open={open} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
				
			</SwipeableDrawer>
		</div>
	)
}

export default FolderDrawer
