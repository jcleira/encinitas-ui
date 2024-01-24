import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import InfoIcon from '@mui/icons-material/Info';

import ChartPerformance from '../../components/ChartPerformance';
import ChartApdex from '../../components/ChartApdex';
import ChartThroughput from '../../components/ChartThroughput';
import ChartErrorRate from '../../components/ChartErrorRate';

export default function Dashboard() {
  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, maxWidth: '100%', mb: 3 }}>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  dApp Application Performance
                  <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} /> {}
                </Typography>
              }
            />
            <CardContent>
              <ChartPerformance />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, maxWidth: '100%'}}>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  User Satisfaction - Apdex Score
                  <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} /> {}
                </Typography>
              }
            />
            <CardContent>
              <ChartApdex />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, maxWidth: '100%', mb: 3}}>
          <CardHeader
            title={
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                Throughput
                <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} /> {}
              </Typography>
            }
          />
            <CardContent>
              <ChartThroughput />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, maxWidth: '100%'}}>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  Error Rate
                  <InfoIcon sx={{ fontSize: '1.0em', ml: 1 }} /> {}
                </Typography>
              }
            />
            <CardContent>
              <ChartErrorRate />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

