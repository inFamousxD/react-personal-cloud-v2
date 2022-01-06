import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = createTheme({
  palette: {
    mode: "dark",
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

