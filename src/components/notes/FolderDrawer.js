import Folder from '@mui/icons-material/Folder';
import { CircularProgress, Divider, Link, List, ListItem, SwipeableDrawer, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebase/firebase-config';

const FolderDrawer = () => {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (toggle) => {
		console.log(toggle)
		setOpen(toggle);
	}

	const [folders, setFolders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const auth = getAuth();
	onAuthStateChanged(auth, async user => {
		if (user && loading) {
			let holder = []
			const querySnapshot = await getDocs(collection(db, "users", user.uid, "notes"))
			querySnapshot.forEach(doc => {
				holder.push(doc.data().name);
				setLoading(false)
			});
			setFolders(holder);
		}
	})

	return (
		!loading ? <div>
			<SwipeableDrawer anchor='right' open={open} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
				<List sx={{ bgcolor: 'background.paper', minWidth: '70vw', minHeight: '100vh', fontFamily: 'Quicksand' }}>
					<ListItem sx={{ marginBottom: '2vh' }}>
						<Typography sx={{ display: 'flex', alignItems: 'center' }} fontFamily={'Quicksand'} color='text.primary'><Folder sx={{mr: 0.5}}></Folder>Folders</Typography>
					<Divider />
					</ListItem>
						
					{ folders.map((folder, index) => {
						return <ListItem button key={index}>
										<Link href={`${process.env.PUBLIC_URL}/#/notes/${folder}`} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} underline='hover' color='inherit'>
											{folder}
										</Link>
									</ListItem>
					}) }
				</List>
			</SwipeableDrawer>
		</div> : <Box sx={{ display: 'flex' }}>
      <CircularProgress color='secondary' />
    </Box>
	)
}

export default FolderDrawer
