import { Book, Note, FactCheck, Devices, Settings } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const Navigation = ({ value, handleChange }) => {
	return (
		<div>
			<BottomNavigation value={value} onChange={handleChange}>
				<BottomNavigationAction component={Link} to='/notes' value={'Notes'} icon={<Note />} />
				<BottomNavigationAction component={Link} to='/tasks' value={'Tasks'} icon={<FactCheck />} />
				<BottomNavigationAction component={Link} to='/diary' value={'Diary'} icon={<Book />} />
				<BottomNavigationAction component={Link} to='/watchlist' value={'Watchlist'} icon={<Devices />} />
				<BottomNavigationAction component={Link} to='/settings' value={'Settings'} icon={<Settings />} />
			</BottomNavigation>
		</div>
	)
}

export default Navigation
