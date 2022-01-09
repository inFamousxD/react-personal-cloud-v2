import { Button, Typography } from '@mui/material'
import React from 'react'
import { authentication } from '../../firebase/firebase-config'
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth'

const SignIn = () => {
	const [userId, setUserId] = React.useState('');
	const [userDetails, setUserDetails] = React.useState({});

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(authentication, provider)
			.then(res => {
				console.log(res)
				setUserId(res.uid);
			})
			.catch(err => {
				console.log(err);
				setUserId();
			})
	}

	const auth = getAuth();
	React.useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {setUserId(user.uid); setUserDetails(user); console.log(user)}
			else setUserId('');
		})
	}, [auth]);

	return (
		userId === '' ? <Button onClick={signInWithGoogle}>Sign in with Google</Button> :
		<Typography color='text.secondary' sx={{ m: 2 }}>{ `Welcome, ${userDetails.displayName}` }</Typography>
	)
}

export default SignIn
