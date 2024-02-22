import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

import ChartProgramThroughput from '../../components/ChartProgramThroughput';
import ChartProgramPerformance from '../../components/ChartProgramPerformance';
import TransactionsTable from '../../components/TransactionsTable';

interface ApiResponse {
  transactions: Array<{
    program_address: string;
    percentage: number;
  }>;
}

interface Transaction {
  name: string;
  percentage: number;
}

interface TransactionsProps {
  adjustDrawerVisibility: (isVisible: boolean) => void;
}

function Transactions({ adjustDrawerVisibility }: TransactionsProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    adjustDrawerVisibility(false);
    return () => adjustDrawerVisibility(true);
  }, [adjustDrawerVisibility]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.encinitas.xyz/transactions/query')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => { // Use the ApiResponse interface here
        setIsLoading(false);
        const formattedData = data.transactions.map(transaction => ({
          name: transaction.program_address,
          percentage: parseFloat(transaction.percentage.toFixed(2)),
        }));

        if (formattedData.length > 0) {
        setSelectedProgramId(formattedData[0].name);
        }

        setTransactionsData(formattedData);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <Container maxWidth={false} sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={5}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  Transaction instructions breakdown
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: '1.0rem' }}>List of the top 10 transaction instructions and their impact (percentage) on the Transaction execution.
                      </Typography>
                    }
                    >
                    <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} />
                  </Tooltip>
                </Typography>
              }
            />
            <CardContent sx={{
              minHeight: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isLoading ? (
                  <CircularProgress />
                ) : (
                  <TransactionsTable
                    transactions={transactionsData}
                    onSelectProgram={setSelectedProgramId}
                    selectedProgramId={selectedProgramId}
                  />
                )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  Instruction's performance
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: '1.0rem' }}>Performance for the selected instruction within the Transaction execution.
                      </Typography>
                    }
                    >
                    <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} />
                  </Tooltip>
                </Typography>
              }
            />
            <CardContent sx={{
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {isLoading ? (
                <CircularProgress />
              ) : (
                <ChartProgramPerformance programId={selectedProgramId} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  Instruction's throughput
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: '1.0rem' }}>Throughput for the selected instruction within the Transaction execution.
                      </Typography>
                    }
                    >
                    <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} />
                  </Tooltip>
                </Typography>
              }
            />
            <CardContent sx={{
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {isLoading ? (
                <CircularProgress />
              ) : (
                <ChartProgramThroughput programId={selectedProgramId} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transactions;
