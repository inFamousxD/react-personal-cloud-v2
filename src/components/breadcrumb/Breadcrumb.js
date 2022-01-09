import { Link, Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FolderIcon from '@mui/icons-material/Folder';
import { useLocation } from 'react-router-dom';
import { Grain } from '@mui/icons-material';

const Breadcrumb = () => {
	const location = useLocation().pathname.split('/');
	location.shift();

	const icons = [
		FolderIcon,
		StickyNote2Icon,
		Grain
	]

	return (
		<React.Fragment>
			<Breadcrumbs sx={{ margin: '2vh' }}>
				<Link href='/home' sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> {'home'}
				</Link>

				{ location[0] !== "" && location.map((node, index) => {
						const Icon = icons[index];
						return index !== (location.length-1) ? <Link key={index} href={`/#/${node}`} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
										<Icon sx={{ mr: 0.5 }} fontSize="inherit" /> {node}
									</Link> :
									<Typography key={index} sx={{ display: 'flex', alignItems: 'center' }} color='text.primary'>
										<Icon sx={{ mr: 0.5 }} fontSize="inherit" /> {node}
									</Typography>
				}) }
			</Breadcrumbs>
		</React.Fragment>
	)
}

export default Breadcrumb
