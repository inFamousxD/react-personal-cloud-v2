import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard';
import Note from './components/notes/Note';
import Breadcrumb from './components/breadcrumb/Breadcrumb';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {

  return (
		<React.Fragment>
			<Router>
				<Box sx={{ width: '100vw', height: '7vh', display: 'flex', flexDirection: 'column', bgcolor: '#222', position: 'sticky', top: '0'}}>
					<Breadcrumb />
				</Box>
				<Box sx={{ alignItems: 'center', width: '100vw', minHeight: '93vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default'}}>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/notetest' element={<Note />} />
					</Routes>
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

