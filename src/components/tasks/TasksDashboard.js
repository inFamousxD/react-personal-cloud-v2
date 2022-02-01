import { Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import Spinner from '../spinner/Spinner';
import TasksFolderContents from './TasksFolderContents';

const TasksDashboard = () => {
	const [data, setData] = React.useState([]);
	const [folders, setFolders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const [currentFolder, setCurrentFolder] = React.useState();


	useEffect(() => {
		let dataHandler = [];
		let folderNamesHandler = [];
		if (loading && !folders[0]) {
			const auth = getAuth();
			onAuthStateChanged(auth, async user => {
				if (user) {
					const docRef = await getDocs(collection(db, "users", user.uid, "tasks"));
					docRef.docs.forEach(doc => {
						dataHandler.push(doc.data());
						folderNamesHandler.push({folderName: doc.data().folderName, folderId: doc.id});
					})
					setData(dataHandler);
					setFolders(folderNamesHandler);
				}
			})
		}
		if (folders[0] && loading) {
			setCurrentFolder(folders[0]);
			setLoading(false);
		}
	}, [folders, loading])


	return loading ? <Spinner /> : <div style={{ width: '95%', height: '84vh' }}>
		<Typography sx={{ color: 'text.primary', ml: 1 }} variant='h6'>{currentFolder.folderName}</Typography>
		<TasksFolderContents data={ data.filter(data => { return data.folderName === currentFolder.folderName }) } setData={setData} folder={currentFolder}/>
	</div>;
};

export default TasksDashboard;
