import { Button, Card, LinearProgress, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import SignIn from './SignIn'

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const Dashboard = () => {
	const [displaySignIn, setDisplaySignIn] = React.useState(false);
	const [userName, setUserName] = React.useState('');
	const [uId, setUID] = React.useState(false);
	const [dataFlag, setDataFlag] = React.useState(true);

	async function getData() {
		const docSnap = await getDoc(doc(db, "users", uId));
		if (!docSnap.exists()) {
			setDataFlag(false);
		} else {
			setDataFlag(true);
		}
	}

	if (uId) getData();

	const createFreshData = async () => {
		await setDoc(doc(db, "users", uId), {
			colourMode: 'dark',
			accent: '#4CAF50'
		});
		await setDoc(doc(db, "users", uId, "notes", "folder"), {
			name: 'folder'
		});
		window.location.reload();
	}

	React.useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			if (user) {setUserName(user.displayName); setUID(user.uid)}
			else setDisplaySignIn(true);
		});
	}, []);

	return (
		<div>
			{ !userName && displaySignIn && <SignIn /> }	
			{ !userName && !displaySignIn && <LinearProgress sx={{width: '95vw', mt: 4}} color="primary" /> }
			{ userName && <div><Typography color='text.secondary' sx={{ m: 2 }}>{'Logged in as ' + userName}</Typography></div> }
			{ !dataFlag && <Card sx={{ display: 'flex', m: 1.5 }}><Typography color='text.secondary' sx={{ m: 2 }}>{'No data found in firebase. Press \'Create Data\' to start job.'}</Typography><Button onClick={createFreshData} variant='text'>Create Data</Button></Card> }
		</div>
	)
}

export default Dashboard
