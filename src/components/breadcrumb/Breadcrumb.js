import { Link, Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FolderIcon from '@mui/icons-material/Folder';

const Breadcrumb = () => {
	return (
		<React.Fragment>
			<Breadcrumbs sx={{ margin: '2vh' }}>
				<Link href='/' sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Home
				</Link>
				<Link href='/#/notetest' underline='hover' sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} color='inherit'>
				<StickyNote2Icon sx={{ mr: 0.5 }} fontSize="inherit" /> Notes
				</Link>
				<Typography sx={{ display: 'flex', alignItems: 'center' }} color='text.primary'>
					<FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Anime
				</Typography>
			</Breadcrumbs>
		</React.Fragment>
	)
}

export default Breadcrumb
