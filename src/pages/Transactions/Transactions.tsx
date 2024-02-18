import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

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

const Transactions = () => {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/transactions/query')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => { // Use the ApiResponse interface here
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
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <Container maxWidth={false} sx={{ mt: 6, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={5}>
          <TransactionsTable
            transactions={transactionsData}
            onSelectProgram={setSelectedProgramId}
            selectedProgramId={selectedProgramId}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Card>
            <CardHeader title="Top web transactions by percent of wall clock time" />
            <CardContent>
            <ChartProgramPerformance programId={selectedProgramId} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Throughput by requests per minute" />
            <CardContent>
              <ChartProgramThroughput programId={selectedProgramId}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transactions;
