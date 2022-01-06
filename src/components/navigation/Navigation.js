import { Book, Note, FactCheck, Devices } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const Navigation = ({ value, handleChange }) => {
	return (
		<div>
			<BottomNavigation value={value} onChange={handleChange}>
				<BottomNavigationAction component={Link} to='/notes' value={'Notes'} icon={<Note />} />
				<BottomNavigationAction value={'Tasks'} icon={<FactCheck />} />
				<BottomNavigationAction value={'Diary'} icon={<Book />} />
				<BottomNavigationAction value={'Watchlist'} icon={<Devices />} />
			</BottomNavigation>
		</div>
	)
}

export default Navigation
