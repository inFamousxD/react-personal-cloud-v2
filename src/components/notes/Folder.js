import { MoreVert } from '@mui/icons-material';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Popover, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase-config';

const Folder = ({folderName}) => {
	const [openPopover, setOpenPopover] = React.useState(null);
	const [modalState, setModalState] = React.useState(false);
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/notes/' + folderName)
	}

	const handleFolderOptions = (e) => {
		setOpenPopover(e.currentTarget);
	}

	const handleDeleteFolder = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, async user => {
			if (user) {
				await deleteDoc(doc(db, "users", user.uid, "notes", folderName));
				window.location.reload();
			}
		})
	}

	return (
		<div>
			<Card sx={{ display: 'flex', width: '93vw', mb: 2, cursor: 'pointer', justifyContent: 'space-between' }}>
				<Typography color='text.secondary' sx={{m: 2, width: '100%'}}  onClick={handleNavigate}>{folderName}</Typography>
				<IconButton color='primary' onClick={handleFolderOptions}><MoreVert /></IconButton>
			</Card>
			<Popover
				open={Boolean(openPopover)}
				onClose={() => setOpenPopover(null)}
				anchorEl={openPopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Button onClick={() => setModalState(true)}>Delete</Button>
			</Popover>
			<Dialog fullWidth open={modalState} onClose={() => {setModalState(false)}}>
				<DialogTitle>Delete Folder {folderName}?</DialogTitle>
				<DialogContent>
					<DialogActions>
						<Button onClick={() => {setModalState(false); setOpenPopover(null)}} variant='text' color='primary'>Cancel</Button>
						<Button onClick={handleDeleteFolder} variant='text' color='error'>Delete</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default Folder
