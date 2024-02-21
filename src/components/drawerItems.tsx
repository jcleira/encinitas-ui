import * as React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StorageIcon from '@mui/icons-material/Storage';

export const MainListItems = () => {
  const location = useLocation();
  const isSelected = (path: string) => location.pathname === path;

  return (
    <React.Fragment>
      <Box
      sx={{ color: '#979797' }}
      >
      <ListItemButton component={Link} to="/dashboard" selected={isSelected('/dashboard')}>
        <ListItemIcon sx={{
          color: isSelected('/dashboard') ? '#09feee' : '#979797' }}
        >
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary="Dashboard"
          sx={{ color: isSelected('/dashboard') ? '#09feee' : '#979797' }}
        />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/transactions"
        selected={isSelected('/transactions')
      }>
        <ListItemIcon sx={{
          color: isSelected('/transactions') ? '#09feee' : '#979797' }}
        >
          <StorageIcon />
        </ListItemIcon>
        <ListItemText
          primary="Transactions"
          sx={{ color: isSelected('/transactions') ? '#09feee' : '#979797' }}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <ReportProblemIcon />
        </ListItemIcon>
        <ListItemText primary="Errors" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
      </Box>
    </React.Fragment>
  );
}
