import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper,
  LinearProgress,
  Typography,
  Box,
  styled
} from '@mui/material';

interface TransactionData {
  name: string;
  percentage: number;
}

const createData = (name: string, percentage: number): TransactionData => {
  return { name, percentage };
};
const rows = [
  createData('Index/getProgramAccount', 14.74 ),
  createData('Phone/MobileData/ndTransaction', 14.78 ),
  createData('Phone/Bluetooth/sendTransaction', 11.19 ),
  createData('Phone/Register/sendTranstion', 10.43 ),
  createData('Phone/Settings/sendTransaion', 8.12 ),
  createData('Phone/Notications/sendTransaction', 7.65 ),
  createData('Phone/Hotspot/sendTransaction', 6.34 ),
  createData('Phone/Sound/sendTransaction', 6.21 ),
  createData('Phone/General/sendTransaction', 3.19 ),
  createData('Phone/Control/sendTransaction', 1.77 ),
];

const ColorLinearProgress = styled(LinearProgress)(({ value }: { value: number }) => ({
  '& .MuiLinearProgress-bar': {
      backgroundColor: value <= 10 ? '#0ee8db' : '#c735f6', // Light Blue for <=50%, Purple for >50%
  },
}));

const TransactionsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Type</TableCell>
            <TableCell align="right">Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <ColorLinearProgress variant="determinate" value={row.percentage} />
                  </Box>
                  <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${row.percentage}%`}</Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
