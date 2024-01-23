import * as React from 'react';
import Box from '@mui/material/Box';
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

export const mainListItems = (
  <React.Fragment>
    <Box
    sx={{ color: '#979797' }}
    >
    <ListItemButton>
      <ListItemIcon
      sx={{ color: '#979797' }}
      >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText
        primary="Dashboard"
        sx={{ color: '#09feee' }}
      />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon
      sx={{ color: '#979797' }}
      >
        <StorageIcon />
      </ListItemIcon>
      <ListItemText
        primary="Transactions"
        sx={{ color: '#979797' }}
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

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader
    sx={{ color: '#0af29c' }}
    component="div" inset>
    Key Transactions
    </ListSubheader>
    <Box
    sx={{ color: '#979797' }}
    >
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Get Account" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Send Transfer" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon
        sx={{ color: '#979797' }}
        >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="List Transactions" />
      </ListItemButton>
    </Box>
  </React.Fragment>
);
