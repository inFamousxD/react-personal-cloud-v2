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
	location.length > 3 ? location.length = 3 : console.log('');
	if (location.length === 3 && location[2].length > 5) location[2] = location[2].substring(0, 4).concat('...');

	const generateURL = (index) => {
		let URL = '';
		for (let i = 0; i < index; ++i) {
			URL = URL.concat(location[i] + '/');
		}
		return URL;
	}

	console.log(generateURL(3))

	const icons = [
		FolderIcon,
		StickyNote2Icon,
		Grain
	]

	return (
		<React.Fragment>
			<Breadcrumbs sx={{ margin: '2vh' }}>
				<Link href={process.env.PUBLIC_URL + '/#/home'} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> {'home'}
				</Link>

				{ location[0] !== 'home' && location[0] !== "" && location.map((node, index) => {
						const Icon = icons[index];
						return index !== (location.length-1) ? <Link key={index} href={`${process.env.PUBLIC_URL}/#/${index >= 1 ? generateURL(index) : ''}${node}`} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
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
