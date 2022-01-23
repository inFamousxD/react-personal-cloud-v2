import { FavoriteBorder, FavoriteRounded } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase-config';

const EditNote = () => {
	const [state, setState] = React.useState({
		title: '',
		body: '',
		favourite: false,
		createdAt: ''
	});
	const location =  useLocation().pathname.split('/');
	const folderName = location[location.length-3];
	const noteId = location[location.length-1];

	const nav = useNavigate();
	const handleStateChange = (event) => {
		setState({...state, [event.target.name]: event.target.value})
	}
	
	const auth = getAuth();
	
	
	const handleEditNote = () => {
		const data = {
			content: {
				body: state.body,
				title: state.title,
				favourite: state.favourite
			},
			createdAt: state.createdAt
		}

		onAuthStateChanged(auth, async user => {
			if (user) {
				await setDoc(doc(db, "users", user.uid, "notes", folderName, "data", noteId), data);
				nav('/notes/' + folderName + '/' + noteId);
			}
		})
	}

	useEffect(() => {
		onAuthStateChanged(auth, async user => {
			const docRef = await getDoc(doc(db, "users", user.uid, "notes", folderName, "data", noteId));
			setState({ title: docRef.data().content.title, body: docRef.data().content.body, favourite: docRef.data().content.favourite, createdAt: docRef.data().createdAt });
		})
	}, [auth, folderName, noteId])

	return (
		<Card sx={{
			width: '93vw',
			height: '86vh',
			mr: 2,
			ml: 2,
			// overflowY: 'scroll'
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'column'
		}}>
			<CardContent>
				<Typography color='primary.main' variant='h5'>Create a new Note</Typography>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<TextField sx={{ mt: 2, width: '80%' }} variant='standard' fullWidth label='Note title' size='small' value={state.title} onChange={handleStateChange} name='title'/>
					<IconButton sx={{ mt: 2 }} size='small' onClick={() => setState({ ...state, favourite: !state.favourite })}> { state.favourite ? <FavoriteRounded sx={{ color: 'primary.main' }} /> : <FavoriteBorder sx={{ color: 'primary.main' }} /> } </IconButton>
				</div>
				<TextField sx={{ mt: 2 }} minRows={10} size='small' variant='standard' multiline fullWidth label='Note body' value={state.body} onChange={handleStateChange} name='body'/>
			</CardContent>
			<CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<Button sx={{ mt: 4 }} color='primary' variant='text' onClick={handleEditNote}>Save</Button>
				<Button sx={{ mt: 4 }} color='error' variant='text'>Back</Button>
			</CardActions>
		</Card>
	)
}

export default EditNote
