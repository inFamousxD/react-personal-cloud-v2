import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Add, ArrowLeft, ArrowRight, Check, DeleteOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SpeedDialIcon, TextField } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

export default function StyledSpeedDialComponent({ loc, index, folderId, data, setData }) {
	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const [dialogContent, setDialogContent] = React.useState({
		subtaskName: '',
		taskName: '',
		sectionName: ''
	});

	const handleDialogSubtask = (e) => {
		setDialogContent({...dialogContent, subtaskName: e.target.value});
	}

	const auth = getAuth();
	const add = () => {
		console.log('Add to ' + loc);

		// add a new subtask
		if (loc === 'task') {
			let handler = [...data, data[0].data[0].sectionData[0].taskData.push({
				"checked": false,
				"createdAt": Date.now(),
				"subtaskName": dialogContent.subtaskName
			})];
			setData(handler);
			onAuthStateChanged(auth, async user => {
				if (user) {
					await updateDoc(doc(db, "users", user.uid, "tasks", folderId), handler[0]);
				}
			})
		}
	}

	const del = () => {
		console.log('Delete a ' + loc + ' at ' + index);
		if (loc === 'subtask') {
			let xloc = index.split(', ');
			console.log(xloc);
			let handler = [...data, data[0].data[0].sectionData[0].taskData.splice(xloc[2], 1)];
			setData(handler);
			onAuthStateChanged(auth, async user => {
				if (user) {
					await updateDoc(doc(db, "users", user.uid, "tasks", folderId), handler[0]);
				}
			})
		}
	}
	const mark = () => {
		console.log('Mark to ' + loc);
	}

	const actions = [
		{ icon: <Check />, name: 'Mark', method: mark },
		{ icon: <DeleteOutline />, name: 'Delete', method: del },
		{ icon: <Add />, name: 'Add', method: handleClickOpen },
	];
	
	const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
		position: 'absolute',
		right: 0
	}));

  return (
		<React.Fragment>
		<StyledSpeedDial
			ariaLabel="Speeddial"
			icon={<SpeedDialIcon openIcon={<ArrowRight /> } icon={<ArrowLeft />} />}
			direction={'left'}
			FabProps={{
				size: 'small',
				sx: {
					bgcolor: 'background.default',
					color: 'primary.main',
					'&:hover': {
						bgcolor: 'background.default',
						color: 'primary.main'
					},
					width: '1vw'
				},
				variant: 'extended',
			}}
		>
			{actions.map((action) => (
				!(action.name === 'Mark' &&  loc === 'section') &&
				!(action.name === 'Add' &&  loc === 'subtask') &&
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					FabProps={{
						size: 'small',
						sx: {
							width: '1vw'
						},
						variant: 'extended',
					}}
					onClick={action.method}
				/>
			))}
		</StyledSpeedDial>
		<Dialog open={open} onClose={handleClose} fullWidth PaperProps={{
			variant: 'outlined',
			elevation: 0
		}}>
        <DialogTitle>Add a subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
						name={loc}
						value={dialogContent.subtaskName}
						onChange={handleDialogSubtask}
						autoComplete='off'
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          <Button onClick={add}>Add</Button>
        </DialogActions>
      </Dialog>
		</React.Fragment>
  );
}
