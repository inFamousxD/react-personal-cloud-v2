import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Add } from '@mui/icons-material';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const actions = [
  { icon: <Add />, name: 'Add', key: 'addsection' },
];

export default function BasicSpeedDial({ setData, folderId, data }) {
	const [state, setState] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [sectionName, setSectionName] = React.useState('');
	
	const handleOpen = () => setState(true);
	const handleClose = () => setState(false);

	const handleOpenDialog = () => { setState(false); setOpenDialog(true); }
	const handleCloseDialog = () => { 
		handleClose(); 
		setOpenDialog(false); 
	}

	const handleChange = (e) => {setSectionName(e.target.value);}
	const addSection = () => {
		const auth = getAuth();
		let handler = [...data, data[0].data.push({
			"createdAt": Date.now(),
			"sectionName": sectionName,
			"sectionData": []
		})];
		setData(handler);
		setSectionName('');
		onAuthStateChanged(auth, async user => {
			if (user) {
				await updateDoc(doc(db, "users", user.uid, "tasks", folderId), handler[0]);
			}
		})
		handleCloseDialog(); 
		handleClose();
	}

  return (
    <Box>
			<Backdrop open={openDialog} />
      <SpeedDial
        ariaLabel="Add a section"
        sx={{ position: 'absolute', bottom: '10vh', right: '5vw' }}
        icon={<SpeedDialIcon />}
				open={state}
				onOpen={handleOpen}
				onClose={handleClose}
				FabProps={{
					sx: {
						bgcolor: 'background.default',
						color: 'primary.main',
						'&:hover': {
							bgcolor: 'background.default',
							color: 'primary.main'
						}
					}
				}}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.key}
            icon={action.icon}
            tooltipTitle={action.name}
						onClick={handleOpenDialog}
          />
        ))}
      </SpeedDial>
			<Dialog open={openDialog} onClose={handleCloseDialog} fullWidth PaperProps={{
				variant: 'outlined',
				elevation: 0
			}}>
					<DialogTitle>Add a new Section</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							type="text"
							fullWidth
							variant="standard"
							name={'section'}
							value={sectionName}
							onChange={handleChange}
							autoComplete='off'
						/>
					</DialogContent>
					<DialogActions>
						<Button color='error' onClick={handleCloseDialog}>Cancel</Button>
						<Button onClick={addSection}>Add</Button>
					</DialogActions>
				</Dialog>
    </Box>
  );
}