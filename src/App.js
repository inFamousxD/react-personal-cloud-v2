import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard';
import Breadcrumb from './components/breadcrumb/Breadcrumb';
import NotesDashboard from './components/notes/NotesDashboard';
import Navigation from './components/navigation/Navigation';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
	const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
		<React.Fragment>
			<Router basename={process.env.PUBLIC_URL}>
				<Box sx={{ width: '100vw', minHeight: '7vh', display: 'flex', flexDirection: 'column', bgcolor: '#222', position: 'sticky', top: '0'}}>
					<Breadcrumb />
				</Box>
				<Box sx={{ alignItems: 'center', width: '100vw', minHeight: '86vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default'}}>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/home' element={<Dashboard />} />
						<Route path='/notes' element={<NotesDashboard />} />
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

