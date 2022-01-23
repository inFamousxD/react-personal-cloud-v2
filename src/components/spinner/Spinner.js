import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Spinner = () => {
	return (
		<Box sx={{ display: 'flex', m: 8 }}>
      <CircularProgress color='success' />
    </Box>
	)
}

export default Spinner
