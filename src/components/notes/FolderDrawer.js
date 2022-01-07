import Folder from '@mui/icons-material/Folder';
import { Divider, Link, List, ListItem, SwipeableDrawer, Typography } from '@mui/material'
import React from 'react'

const FolderDrawer = () => {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (toggle) => {
		console.log(toggle)
		setOpen(toggle);
	}

	const folders = [
		'anime',
		'random',
		'office'
	]

	return (
		<div>
			<SwipeableDrawer anchor='right' open={open} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
				<List sx={{ bgcolor: 'background.paper', minWidth: '70vw', minHeight: '100vh', fontFamily: 'Quicksand' }}>
					<ListItem sx={{ marginBottom: '2vh' }}>
						<Typography sx={{ display: 'flex', alignItems: 'center' }} fontFamily={'Quicksand'} color='text.primary'><Folder sx={{mr: 0.5}}></Folder>Folders</Typography>
					<Divider />
					</ListItem>
						
					{ folders.map((folder, index) => {
						return <ListItem button key={index}>
										<Link href={`/#/${folder}`} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
											{folder}
										</Link>
									</ListItem>
					}) }
				</List>
			</SwipeableDrawer>
		</div>
	)
}

export default FolderDrawer
