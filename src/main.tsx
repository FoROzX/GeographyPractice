import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
        <React.StrictMode>
            <Router />
        </React.StrictMode>
    </ThemeProvider>,
);