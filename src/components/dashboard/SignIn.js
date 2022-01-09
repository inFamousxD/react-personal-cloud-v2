import { Button } from '@mui/material'
import React from 'react'
import { authentication } from '../../firebase/firebase-config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const SignIn = () => {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(authentication, provider)
			.then(res => {
				console.log('user signed in. welcome, ' + res.displayName);
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<Button sx={{m: 6}} onClick={signInWithGoogle}>Sign in with Google</Button>
	)
}

export default SignIn
