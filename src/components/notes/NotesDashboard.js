import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase/firebase-config'
import Folder from './Folder'
import FolderDrawer from './FolderDrawer'

const NotesDashboard = () => {
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
		<div>
			<FolderDrawer />
			{ !loading && folders.map((folder, index) => {
				return <Folder key={index} folderName={folder} />
			}) }
		</div>
	)
}

export default NotesDashboard
