import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase/firebase-config';
import Spinner from '../spinner/Spinner';
import FolderDrawer from './FolderDrawer';
import Note from './Note';
import NotesSpeedDial from './NotesSpeedDial';

const NotesList = () => {
	const location = useLocation().pathname.split('/');
	const folderName = location[location.length-1];

	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const auth = getAuth();
	onAuthStateChanged(auth, async user => {
		if (user && loading) {
			let holder = []
			const querySnapshot = await getDocs(collection(db, "users", user.uid, "notes", folderName, "data"))
			querySnapshot.forEach(doc => {
				let dt = doc.data();
				dt["id"] = doc.id;
				holder.push(dt);
			});
			holder.sort((a, b) => {return b.createdAt - a.createdAt})
			setLoading(false);
			setData(holder);
		}
	});

	return (
		!loading ? <div style={{ overflowY: 'scroll', height: '86vh' }}>
			<NotesSpeedDial takeTo={`/notes/${folderName}/create`} />
			<FolderDrawer />
			{ !loading && data[0] && data.map(noteData => {
				return <Note key={noteData.createdAt} data={noteData} folderName={folderName} />
			}) }
		</div> : <Spinner />
	)
}

export default NotesList
