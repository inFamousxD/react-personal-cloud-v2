import { FormatPaint, Info, ManageAccounts } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
	const nav = useNavigate();

	const handleNavigation = (to) => {
		nav('/settings/' + to)
	}

	const auth = getAuth();

	const handleSignOut = () => {
		signOut(auth).then(() => {
			nav('/');
		})
	}

	return <List component='nav' sx={{
		width: '100%',
		maxWidth: 720,
		bgcolor: 'background.paper',
	}}>
		<Divider textAlign='left' sx={{color: 'text.secondary', fontFamily: 'Roboto', fontSize: '1.5vh'}}>Appearance</Divider>
		<ListItem button onClick={() => handleNavigation('theme')}>
			<ListItemAvatar>
				<FormatPaint sx={{color: 'text.secondary'}} />
			</ListItemAvatar>
			<ListItemText sx={{color: 'text.secondary'}} primary='Theme'></ListItemText>
		</ListItem>
		<Divider textAlign='left' sx={{color: 'text.secondary', fontFamily: 'Roboto', fontSize: '1.5vh'}}>Account</Divider>
		<ListItem button>
			<ListItemAvatar>
				<Info sx={{color: 'text.secondary'}} />
			</ListItemAvatar>
			<ListItemText sx={{color: 'text.secondary'}} primary='Session Details'></ListItemText>
		</ListItem>
		<ListItem button onClick={handleSignOut}>
			<ListItemAvatar>
				<ManageAccounts sx={{color: 'text.secondary'}} />
			</ListItemAvatar>
			<ListItemText sx={{color: 'text.secondary'}} primary='Account Settings'></ListItemText>
		</ListItem>
	</List>;
};

export default Settings;
