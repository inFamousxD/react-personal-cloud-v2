import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Add, ArrowLeft, ArrowRight, Check, DeleteOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { SpeedDialIcon } from '@mui/material';

export default function StyledSpeedDialComponent({ loc, index, folderId }) {
	const add = () => {
		console.log('Add to ' + loc);
	}
	const del = () => {
		console.log('Delete to ' + loc);
	}
	const mark = () => {
		console.log('Mark to ' + loc);
	}

	const actions = [
		{ icon: <Check />, name: 'Mark', method: mark },
		{ icon: <DeleteOutline />, name: 'Delete', method: del },
		{ icon: <Add />, name: 'Add', method: add },
	];
	
	const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
		position: 'absolute',
		right: 0
	}));

  return (
		<StyledSpeedDial
			ariaLabel="SpeedDial playground example"
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
  );
}
