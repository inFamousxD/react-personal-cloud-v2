import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase/firebase-config'
import Spinner from '../spinner/Spinner'
import Folder from './Folder'
import FolderDrawer from './FolderDrawer'
import NotesSpeedDial from './NotesSpeedDial'

const NotesDashboard = () => {
	const [folders, setFolders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [modalState, setModalState] = React.useState(false);
	const [folderName, setFolderName] = React.useState('');

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

	const handleCreateNewFolder = () => {
		onAuthStateChanged(auth, async user => {
			if (user) {
				await setDoc(doc(db, "users", user.uid, "notes", folderName), {
					name: folderName
				});
				setFolders([...folders, folderName]);
				// if (await (docRef).id) {
				// 	await addDoc(collection(db, "users", user.uid, "notes", folderName, "data"), {
				// 		content: {
				// 			title: 'Your first note in ' + folderName + ' folder!',
				// 			body: 'Feel free to delete this note and start adding your own!',
				// 			favourite: true
				// 		}, 
				// 		createdAt: Date.now()
				// 	});
				// }
				setModalState(false);
				setFolderName('');
			}
		})
	}

	return (
		!loading ? <div>
			<NotesSpeedDial takeTo={'folder'} setModalOpen={setModalState} />
			<FolderDrawer />
			{ !loading && folders.map((folder, index) => {
				return <Folder key={index} folderName={folder} />
			}) }
			<Dialog fullWidth open={modalState} onClose={() => {setModalState(false)}}>
				<DialogTitle>Create New Folder</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='folderName'
						fullWidth
						variant='standard'
						value={folderName}
						label='Folder Name'
						onChange={(e) => setFolderName(e.target.value)}
					/>
					<DialogActions>
						<Button onClick={() => {setModalState(false)}} variant='text' color='error'>Cancel</Button>
						<Button onClick={handleCreateNewFolder} variant='text' color='primary'>Create</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div> : <Spinner />
	)
}

export default NotesDashboard
