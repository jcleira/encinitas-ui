import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper,
  LinearProgress,
  Typography,
  Box,
  styled
} from '@mui/material';

interface TransactionsTableProps {
  transactions: Array<{
    name: string;
    percentage: number;
  }>;
  onSelectProgram: (programId: string) => void;
  selectedProgramId: string | null;
}

const ColorLinearProgress = styled(LinearProgress)(({ value }: { value: number }) => ({
  '& .MuiLinearProgress-bar': {
      backgroundColor: value <= 10 ? '#0ee8db' : '#c735f6', // Light Blue for <=50%, Purple for >50%
  },
}));

const TransactionsTable: React.FC<TransactionsTableProps> = (
{ transactions, onSelectProgram, selectedProgramId }
) => {
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
          {transactions.map((row) => (
            <TableRow
              key={row.name}
              onClick={() => onSelectProgram(row.name)}
              style={{
                cursor: 'pointer',
                backgroundColor: row.name === selectedProgramId ? '#121212' : 'transparent',
              }}
            >
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
