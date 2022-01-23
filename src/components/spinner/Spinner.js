import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Spinner = () => {
	return (
		<Box sx={{ display: 'flex', m: 8 }}>
      <CircularProgress color='primary' />
    </Box>
	)
}

export default Spinner
