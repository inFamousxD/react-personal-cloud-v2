import { FavoriteBorder, FavoriteRounded } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, TextField } from '@mui/material'
import React from 'react'

const CreateNote = () => {
	const [state, setState] = React.useState({
		title: '',
		body: '',
		favourite: false
	});

	const handleStateChange = (event) => {
		setState({...state, [event.target.name]: event.target.value})
	}

	console.log(state)

	return (
		<Card sx={{
			width: '94%',
			height: '80vh',
			m: 2,
			// overflowY: 'scroll'
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'column'
		}}>
			<CardContent>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<TextField sx={{ mt: 2, width: '80%' }} variant='outlined' fullWidth label='Enter note title' size='small' value={state.title} onChange={handleStateChange} name='title'/>
					<IconButton sx={{ mt: 2 }} size='small' onClick={() => setState({ ...state, favourite: !state.favourite })}> { state.favourite ? <FavoriteRounded sx={{ color: '#d32f2f' }} /> : <FavoriteBorder sx={{ color: '#d32f2f' }} /> } </IconButton>
				</div>
				<TextField sx={{ mt: 4 }} minRows={10} size='small' variant='outlined' multiline fullWidth label='Enter note body' value={state.body} onChange={handleStateChange} name='body'/>
			</CardContent>
			<CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<Button sx={{ mt: 4 }} color='error' variant='text'>Back</Button>
				<Button sx={{ mt: 4 }} color='success' variant='text'>Create</Button>
			</CardActions>
		</Card>
	)
}

export default CreateNote
