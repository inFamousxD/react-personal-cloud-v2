import { createTheme } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
import App from './App';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) 

export default function ThemeParent() {
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
				<App />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}