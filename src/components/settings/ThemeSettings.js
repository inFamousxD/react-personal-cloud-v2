import { Colorize, DarkMode } from '@mui/icons-material';
import { Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { ColorModeContext } from '../../App';
import { db } from '../../firebase/firebase-config';

const ThemeSettings = () => {
	const { mode, setMode } = useContext(ColorModeContext);
	const auth = getAuth();

	const updateColorMode = () => {
		const newMode = mode === 'dark' ? 'light' : 'dark'
		onAuthStateChanged(auth, async user => {
			await setDoc(doc(db, "users", user.uid), { colourMode: newMode });
			setMode(newMode);
		})
	}

	return <List component='nav' sx={{
			width: '100%',
			maxWidth: 720,
			bgcolor: 'background.paper',
		}}>
			<Divider textAlign='left' sx={{color: 'text.secondary', fontFamily: 'Roboto', fontSize: '1.5vh'}}>Theme</Divider>
			<ListItem>
				<ListItemIcon>
					<DarkMode  sx={{color: 'text.secondary'}}/>
				</ListItemIcon>
				<ListItemText sx={{color: 'text.secondary'}} primary='Dark mode' />
				<Switch 
					edge='end'
					checked={mode === 'dark'}
					onChange={() => updateColorMode()}
				/>
			</ListItem>
			<Divider />
			<ListItem button>
				<ListItemIcon>
					<Colorize  sx={{color: 'text.secondary'}}/>
				</ListItemIcon>
				<ListItemText sx={{color: 'text.secondary'}} primary='Accent' />
				<Chip edge='end' color='primary'></Chip>
			</ListItem>
		</List>
};

export default ThemeSettings;
