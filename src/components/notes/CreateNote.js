import { FavoriteBorder, FavoriteRounded } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase-config';

const CreateNote = () => {
	const [state, setState] = React.useState({
		title: '',
		body: '',
		favourite: false
	});
	const location =  useLocation().pathname.split('/');

	const nav = useNavigate();
	const handleStateChange = (event) => {
		setState({...state, [event.target.name]: event.target.value})
	}

	const handleCreateNewNote = () => {
		const folderName = location[location.length-2];
		const data = {
			content: {
				body: state.body,
				title: state.title,
				favourite: state.favourite
			},
			createdAt: Date.now()
		}

		const auth = getAuth();
		onAuthStateChanged(auth, async user => {
			if (user) {
				const docRef = addDoc(collection(db, "users", user.uid, "notes", folderName, "data"), data);
				nav('/notes/' + folderName + '/' + (await docRef).id);
			}
		})
	}

	return (
		<Card sx={{
			width: '93vw',
			height: '80vh',
			m: 2,
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
				<Button sx={{ mt: 4 }} color='primary' variant='text' onClick={handleCreateNewNote}>Create</Button>
				<Button sx={{ mt: 4 }} color='error' variant='text'>Back</Button>
			</CardActions>
		</Card>
	)
}

export default CreateNote
