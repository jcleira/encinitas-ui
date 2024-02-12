import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import theme from './theme';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';

import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';

export default function App() {
  const [open, setOpen] = React.useState(true);
  const [showDrawer, setShowDrawer] = React.useState(true);
  const toggleDrawer = () => setOpen(!open);
  const handleDrawerVisibility = (isVisible: boolean) => setShowDrawer(isVisible);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {showDrawer && <Drawer open={open} toggleDrawer={toggleDrawer} />}
          <Box> {showDrawer && <AppBar open={open} toggleDrawer={toggleDrawer} />}
          </Box>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              overflow: 'auto',
              height: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={
                <Home adjustDrawerVisibility={handleDrawerVisibility.bind(null, false)} />
              } />
              <Route path="/dashboard" element={
                <Dashboard adjustDrawerVisibility={handleDrawerVisibility.bind(null, true)} />
              } />
              <Route path="/transactions" element={
                <Transactions adjustDrawerVisibility={handleDrawerVisibility.bind(null, true)} />
              } />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
