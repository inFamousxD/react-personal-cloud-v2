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
import Settings from './components/settings/Settings';
import ThemeSettings from './components/settings/ThemeSettings';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase-config';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

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

						<Route path='/settings' element={<Settings />} />
						<Route path='/settings/theme' element={<ThemeSettings />} />
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
	const [accent, setAccent] = React.useState('#4CAF50');

	const auth = getAuth();
	onAuthStateChanged(auth, async user => {
		const docRef = await getDoc(doc(db, "users", user.uid));
		setMode(docRef.data().colourMode);
		setAccent(docRef.data().accent);
	})

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
					primary: {
						main: accent
					}
        },
      }),
    [mode, accent],
  );

  return (
    <ColorModeContext.Provider value={{mode, setMode, accent, setAccent}}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

