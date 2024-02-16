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

import ChartThroughput from '../../components/ChartThroughput';
import TransactionsTable from '../../components/TransactionsTable';

const Transactions = () => {
  const transactionsChartData = {
    names: [
      'Index/getProgramAccount',
      'Phone/Register/sendTransaction',
      'Phone/Settings/sendTransaction'
    ],
    times: [
      '01:50 PM',
     '01:55 PM',
     '02:00 PM',
     '02:05 PM',
     '02:10 PM',
     '02:15 PM',
     '02:20 PM',
     '02:25 PM',
     '02:30 PM',
     '02:35 PM',
     '02:40 PM',
     '02:45 PM',
     '02:50 PM',
     '02:55 PM',
     '03:00 PM',
     '03:05 PM',
     '03:10 PM',
     '03:15 PM',
     '03:20 PM',
     '03:25 PM',
     '03:30 PM',
     '03:35 PM',
     '03:40 PM',
     '03:45 PM',
     '03:50 PM',
     '03:55 PM',
     '04:00 PM',
     '04:05 PM',
     '04:10 PM',
     '04:15 PM',
     '04:20 PM',
     '04:25 PM',
     '04:30 PM',
     '04:35 PM',
     '04:40 PM',
     '04:45 PM',
     '04:50 PM',
     '04:55 PM',
     '05:00 PM',
     '05:05 PM',
     '05:10 PM',
     '05:15 PM',
     '05:20 PM',
     '05:25 PM',
     '05:30 PM',
     '05:35 PM',
     '05:40 PM',
     '05:45 PM',
     '05:50 PM',
     '05:55 PM'
    ],
    series: [
    [400.0, 414.79, 443.37, 437.33, 449.07, 439.81, 469.37, 478.18, 483.31, 491.44, 493.87, 498.74, 499.93, 499.34, 497.49, 493.83, 488.66, 484.04, 474.03, 464.84, 434.33, 443.39, 431.31, 419.14, 406.41, 193.39, 180.88, 168.49, 136.61, 143.43, 133.18, 143.97, 117.98, 111.34, 106.13, 104.31, 100.46, 100.03, 101.48, 104.13, 108.36, 114.49, 141.84, 130.43, 140.19, 130.93, 164.47, 174.63, 187.41, 400.0],
    [200.0, 212.79, 223.37, 237.33, 229.07, 239.81, 269.37, 278.18, 283.31, 291.22, 293.87, 298.72, 299.93, 299.32, 297.29, 293.83, 288.66, 282.02, 272.03, 262.82, 232.33, 223.39, 231.31, 219.12, 206.21, 193.39, 180.88, 168.29, 136.61, 123.23, 133.18, 123.97, 117.98, 111.32, 106.13, 102.31, 100.26, 100.03, 101.28, 102.13, 108.36, 112.29, 121.82, 130.23, 120.19, 130.93, 162.27, 172.63, 187.21, 200.0],
    [100.0, 111.79, 115.37, 137.53, 149.07, 159.81, 169.57, 178.18, 185.51, 191.44, 195.87, 198.71, 199.95, 199.54, 197.49, 193.85, 188.66, 181.01, 174.03, 164.81, 154.55, 143.39, 131.51, 119.11, 106.41, 193.59, 180.88, 168.49, 156.61, 145.45, 135.18, 115.97, 117.98, 111.34, 106.15, 101.51, 100.46, 100.05, 101.18, 104.13, 108.56, 114.49, 111.81, 130.43, 140.19, 150.93, 161.47, 174.63, 187.11, 100.0],
    ],
  };

  const transactionsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: transactionsChartData.names,
      textStyle: {
        color: '#fff'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: transactionsChartData.times,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#323334',
            type: 'dashed',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#323334',
            type: 'dashed',
          },
        },
      },
    ],
    series: transactionsChartData.names.map((name, i) => ({
      name: name,
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: transactionsChartData.series[i],
      lineStyle: {
        color: [`#0ee8db`, `#06f39c`, `#c735f6`][i % 3],
      },
      itemStyle: {
        color: [`#0ee8db`, `#06f39c`, `#c735f6`][i % 3],
      },
    })),
  };

  return (
    <Container maxWidth={false} sx={{ mt: 6, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={5}>
        <TransactionsTable />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Card>
            <CardHeader title="Top web transactions by percent of wall clock time" />
            <CardContent>
              <ReactECharts echarts={echarts} option={transactionsChartOption} style={{ height: '400px' }} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Throughput by requests per minute" />
            <CardContent>
              <ChartThroughput />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transactions;
