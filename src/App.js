import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard';
import Breadcrumb from './components/breadcrumb/Breadcrumb';
import NotesDashboard from './components/notes/NotesDashboard';
import Navigation from './components/navigation/Navigation';
import NotesList from './components/notes/NotesList';
import NoteExpanded from './components/notes/NoteExpanded';
import CreateNote from './components/notes/CreateNote';
// import { getAuth } from 'firebase/auth';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
	const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
		<React.Fragment>
			<Router>
				<Box sx={{ width: '100vw', minHeight: '7vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', position: 'sticky', top: '0'}}>
					<Breadcrumb />
				</Box>
				<Box sx={{ alignItems: 'center', width: '100vw', minHeight: '86vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper'}}>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/home' element={<Dashboard />} />
						<Route path='/notes' element={<NotesDashboard />} />
						<Route path='/notes/:folder' element={<NotesList />} />
						<Route path='/notes/:folder/:note' element={<NoteExpanded />} />
						<Route path='/notes/:folder/create' element={<CreateNote />} />
					</Routes>
				</Box>
				<Box sx={{ width: '100vw', minHeight: '7vh', display: 'flex', flexDirection: 'column', bgcolor: '#222', position: 'sticky', top: '0'}}>
					<Navigation value={value} handleChange={handleChange} />
				</Box>
			</Router>
		</React.Fragment>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
					primary: {
						main: '#4caf50'
					}
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

