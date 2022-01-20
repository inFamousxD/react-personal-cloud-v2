import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase-config';
import Spinner from '../spinner/Spinner';
import FolderDrawer from './FolderDrawer';

const NoteExpanded = () => {
	const location = useLocation().pathname.split('/');
	const navigate = useNavigate();

	const noteId = location[location.length-1];
	const folderName = location[location.length-2];

	const [data, setData] = React.useState({});
	const [loading, setLoading] = React.useState(true);

	const auth = getAuth();
	loading && onAuthStateChanged(auth, async user => {
		if (user) {
			const docSnap = await getDoc(doc(db, "users", user.uid, "notes", folderName, "data", noteId));
			// console.log(docSnap.data());
			setData(docSnap.data());
			setLoading(false);
		}
	})

	const deleteNote = () => {
		onAuthStateChanged(auth, async user => {
			if (user) {
				await deleteDoc(doc(db, "users", user.uid, "notes", folderName, "data", noteId));
				// console.log(docSnap.data());
				navigate(`/notes/${folderName}`);
			}
		})
	}

	return (
		!loading ? <div>
			<FolderDrawer />
			<Card sx={{
				width: '93vw',
				height: '82vh',
				m: 2,
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'column'
			}}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{data.content.title}
					</Typography>
					<Typography variant="body2" color="text.primary" sx={{mt: 1}}>
						{new Date(data.createdAt).toDateString()}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
						{data.content.body}
					</Typography>
				</CardContent>
				<CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<Button sx={{ mt: 4 }} color='error' variant='text' onClick={deleteNote}>Delete</Button>
				</CardActions>
			</Card>
		</div> : <Spinner />
	)
}

export default NoteExpanded
