import { Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase/firebase-config';
import Spinner from '../spinner/Spinner';
import TasksFolderContents from './TasksFolderContents';

const TasksDashboard = () => {
	const [data, setData] = React.useState([]);
	const [folders, setFolders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const [currentFolder, setCurrentFolder] = React.useState();

	const auth = getAuth();
	onAuthStateChanged(auth, async user => {
		if (user && loading) {
			const docRef = await getDocs(collection(db, "users", user.uid, "tasks"));
			let dataHandler = [];
			let folderNamesHandler = [];
			docRef.docs.forEach(doc => {
				dataHandler.push(doc.data());
				folderNamesHandler.push({folderName: doc.data().folderName, folderId: doc.id});
			})

			setData(dataHandler);
			setFolders(folderNamesHandler);
			
			if (data[0] && folders[0]) {
				setCurrentFolder(folders[0]);
				// console.log(currentFolder);
				setLoading(false);
			}
		}
	})

	return loading ? <Spinner /> : <div style={{ width: '95%', height: '84vh' }}>
		<Typography sx={{ color: 'text.primary', ml: 1 }} variant='h6'>{currentFolder.folderName}</Typography>
		<TasksFolderContents data={data.filter(data => { return data.folderName === currentFolder.folderName })} folder={currentFolder}/>
	</div>;
};

export default TasksDashboard;
