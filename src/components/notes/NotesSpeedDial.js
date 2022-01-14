import { Add, Delete, Edit } from '@mui/icons-material'
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotesSpeedDial = ({ takeTo }) => {
	const navigate = useNavigate();
	const [state, setState] = React.useState(false);
	const handleOpen = () => setState(true);
	const handleClose = () => {
		setState(false)
	};

	const handleCreateNew = () => {navigate(takeTo); handleClose()};

	return (
		<div>
			<Backdrop open={state} />
			<SpeedDial
				ariaLabel='SpeedDial'
				sx={{ position: 'absolute', bottom: '10vh', right: '5vw' }}
				icon={ <SpeedDialIcon openIcon={<Edit />} /> }
				open={state}
				onOpen={handleOpen}
				onClose={handleClose}
				FabProps={{
					sx: {
						bgcolor: '#222',
						color: 'primary.main',
						'&:hover': {
							bgcolor: '#222',
							color: 'primary.main'
						}
					}
				}}
			>
				<SpeedDialAction
				icon={<Add />}
				tooltipTitle={'Add'}
				tooltipOpen
				onClick={handleCreateNew}/>

				<SpeedDialAction
				icon={<Delete />}
				tooltipTitle={'Delete'}
				tooltipOpen
				onClick={handleClose}/>
			</SpeedDial>
		</div>
	)
}

export default NotesSpeedDial
