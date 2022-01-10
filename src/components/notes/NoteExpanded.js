import { Card, CardContent, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase/firebase-config';
import Spinner from '../spinner/Spinner';
import FolderDrawer from './FolderDrawer';

const NoteExpanded = () => {
	const location = useLocation().pathname.split('/');
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
	return (
		!loading ? <div>
			<FolderDrawer />
			<Card sx={{
				width: '92vw',
				height: '82vh',
				m: 2
			}}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{data.content.title}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
						{data.content.body}
					</Typography>
				</CardContent>
			</Card>
		</div> : <Spinner />
	)
}

export default NoteExpanded
