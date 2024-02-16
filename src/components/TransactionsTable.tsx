import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper,
  LinearProgress,
  Typography,
  Box,
  styled
} from '@mui/material';

interface ApiResponse {
  transactions: Array<{
    program_address: string;
    percentage: number;
  }>;
}

interface TransactionData {
  name: string;
  percentage: number;
}

const ColorLinearProgress = styled(LinearProgress)(({ value }: { value: number }) => ({
  '& .MuiLinearProgress-bar': {
      backgroundColor: value <= 10 ? '#0ee8db' : '#c735f6', // Light Blue for <=50%, Purple for >50%
  },
}));

const TransactionsTable = () => {
  const [rows, setRows] = useState<TransactionData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/transactions/query')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        const transactionsData = data.transactions.map(transaction => ({
          name: transaction.program_address,
          percentage: parseFloat(transaction.percentage.toFixed(2)),
        }));
        setRows(transactionsData);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Program</TableCell>
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
