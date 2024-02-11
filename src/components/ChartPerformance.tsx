import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';

// ChartDataType is a type for the data that will be used in the chart. It will
// be parsed from the data fetched from the API.
type ChartDataType = {
  performance: {
    rpc: [string, number][];
    solana: [string, number][];
  }
};

const ChartPerformance: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataType>({ performance: { rpc: [], solana: [] } });

  useEffect(() => {
    fetch('http://localhost:3001/metrics/query')
      .then(response => response.json())
      .then((data: ChartDataType) => {
        setChartData(data);
      })
      .catch(error => console.error("Failed to fetch data", error));
  }, []);

  const option = {
    color: ['#09feee'],
    legend: {
      show: true,
      data: ['Solana Program', 'RPC'],
      textStyle: {
        color: '#fff'
      },
      left: 'left',
      bottom: 'bottom',
      padding: [0, 30],
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#323334',
          type: 'dashed',
        },
      },
      axisLabel: {
        formatter: function (value: number) {
          return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      }
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#323334',
          type: 'dashed',
        },
      },
      axisLabel: {
        formatter: '{value} ms'
      },
    },
    series: [
    {
      name: 'Solana Program',
      type: 'bar',
      stack: 'total',
      data: chartData.performance.solana,
      itemStyle: {
        color: '#08ffee'
      }
    },
    {
      name: 'RPC',
      type: 'bar',
      stack: 'total',
      data: chartData.performance.rpc,
      itemStyle: {
        color: '#06f39c'
      }
    }
  ]
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactECharts echarts={echarts} option={option} />
    </div>
  );
};

export default ChartPerformance;
