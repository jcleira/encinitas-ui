import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Container
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useNavigate } from 'react-router-dom';

import mascotImage from './images/mascot.png';

interface HomeProps {
  adjustDrawerVisibility: (isVisible: boolean) => void;
}

interface Program {
  program_address: string;
  program_name: string;
}

function Home({ adjustDrawerVisibility }: HomeProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programAddress, setProgramAddress] = useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    adjustDrawerVisibility(false);
    return () => adjustDrawerVisibility(true);
  }, [adjustDrawerVisibility]);

  React.useEffect(() => {
    adjustDrawerVisibility(false);
    fetchPrograms();
    return () => adjustDrawerVisibility(true);
  }, [adjustDrawerVisibility]);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('http://localhost:3001/manager/programs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Program[] = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Failed to fetch programs", error);
    }
  };

  const handleProgramClick = (programAddress: string) => {
    navigate(`/dashboard/${programAddress}`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/manager/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ program_address: programAddress }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProgramAddress('');
      fetchPrograms();
    } catch (error) {
      console.error("Failed to create program", error);
    }
  };

  return (
    <Container maxWidth={false} sx={{
      mt: 0,
      backgroundColor: '#131313',
      height: '100vh',
      }} >
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
        Encinitas
        </Typography>
      </Toolbar>
      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={6}>
        <Box className="leftbox">
          <img src={ mascotImage } alt="Mascot" style={{ width: '700px', height: 'auto' }} />
        </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                mb: 2, color: 'white',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 'bold'
              }}>
              All-in-one observability tool for Solana dApps
            </Typography>
            <br/>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mb: 1, color: 'white' }}>Encinitas is an observability platform that helps you build better dApps. At the moment, for any given Solana Program, it will provide information about how the Solana Network execution affected the User Experience. So you can get a glimpse of how the UX experience feels for your dApp and eventually respond to incidents before they become problems.
            </Typography>
            <br/>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, color: 'white' }}>Here, you will be able to specify your Program Address:</Typography>
            <Box
              component="form"
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
              }}
              noValidate
              autoComplete="off"
            >
              <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column' }} noValidate autoComplete="off">
                <TextField
                  margin="normal"
                  disabled={true}
                  required
                  fullWidth
                  id="program_address"
                  label="Program Address"
                  name="program_address"
                  autoComplete="program address"
                  autoFocus
                  value={programAddress}
                  onChange={(e) => setProgramAddress(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={true}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
                >
                  Continue
                </Button>
              </Box>
              <Typography variant="h6" sx={{ mt: 4, mb: 2, color: 'white' }}>
              For the moment you can select our demo over testnet for the Pyth Oracle Program:
              </Typography>
                <Button
                  onClick={() => navigate('/dashboard')}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
                >
                  See Pyth Oracle Program Demo
                </Button>
            </Box>
          </Box>
      </Grid>
    </Grid>
  </Container>
  );
};

export default Home;
