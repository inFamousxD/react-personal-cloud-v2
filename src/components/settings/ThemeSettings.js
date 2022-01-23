import { Close, Colorize, DarkMode, FormatColorFill } from '@mui/icons-material';
import { AppBar, Dialog, Divider, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Switch, Toolbar, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { ColorModeContext } from '../../App';
import { db } from '../../firebase/firebase-config';
import { colors } from './Colors';

const ThemeSettings = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}

	const { mode, setMode, accent, setAccent } = useContext(ColorModeContext);
	const auth = getAuth();

	const updateColorMode = () => {
		const newMode = mode === 'dark' ? 'light' : 'dark'
		onAuthStateChanged(auth, async user => {
			await setDoc(doc(db, "users", user.uid), { colourMode: newMode }, { merge: true });
			setMode(newMode);
		})
	}

	const updateGlobalAccent = (code) => {
		onAuthStateChanged(auth, async user => {
			await setDoc(doc(db, "users", user.uid), { accent: code }, { merge: true });
			setAccent(code);
			setOpen(false);
		})
	}

	return <React.Fragment>
		<List component='nav' sx={{
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
			<ListItem button onClick={() => setOpen(true)}>
				<ListItemIcon>
					<Colorize  sx={{color: 'text.secondary'}}/>
				</ListItemIcon>
				<ListItemText sx={{color: 'text.secondary'}} primary='Accent' />
				<Icon>
					<FormatColorFill sx={{ color: 'primary.main' }}/>
				</Icon>
			</ListItem>
		</List>
		<Dialog fullScreen open={open} onClose={handleClose}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<Close />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color={accent}>
						Pick Accent Color
					</Typography>
				</Toolbar>
			</AppBar>
			<List component='nav' sx={{
				overflowY: 'scroll'
			}}>
				<Divider textAlign='left' sx={{color: 'text.secondary', fontFamily: 'Roboto', fontSize: '1.5vh'}}>Accent Colors</Divider>
				{ colors.map(color => {
					return (
						<div key={color.code}>
							<ListItem button onClick={() => updateGlobalAccent(color.code)}>
								<ListItemText sx={{color: 'text.secondary'}} primary={color.name} />
								<Icon><FormatColorFill sx={{ color: color.code }}/></Icon>
							</ListItem>
							<Divider />
						</div>)
				}) }
			</List>
		</Dialog>
		</React.Fragment>
};

export default ThemeSettings;
