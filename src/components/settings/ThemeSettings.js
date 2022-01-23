import { Colorize, DarkMode } from '@mui/icons-material';
import { Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import React from 'react';

const ThemeSettings = () => {
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
			<Divider />
		</List>
};

export default ThemeSettings;
