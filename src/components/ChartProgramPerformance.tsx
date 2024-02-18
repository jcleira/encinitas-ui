import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';

// ChartDataType is a type for the data that will be used in the chart. It will
// be parsed from the data fetched from the API.
type PerformanceData = {
  rpc: [string, number][];
  solana: [string, number][];
};

type ChartDataType = {
  performance: PerformanceData;
};

const ChartProgramPerformance: React.FC<{ programId: string | null }> = ({ programId }) => {
  const [chartData, setChartData] = useState<ChartDataType>({ performance: { rpc: [], solana: [] } });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!programId) return;

    setIsLoading(true);
    fetch(`http://localhost:3001/metrics/programs/query?program_id=${programId}`)
      .then(response => response.json())
        .then((data: ChartDataType) => {
          setChartData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch data", error);
          setIsLoading(false);
        });
  }, [programId]);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  const option = {
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      show: true,
      data: ['RPC', 'Solana Program'],
      textStyle: {
        color: '#fff'
      },
      left: 'left',
      bottom: 'bottom',
      padding: [0, 30],
    },
    xAxis: [
      {
        type: 'time',
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
    series: [
    {
      barGap: '0%',
      barCategoryGap: '0%',
      symbolSize: 0,
      type: 'line',
      name: 'Solana Program',
      stack: 'total',
      data: chartData.performance.solana,
      itemStyle: {
        color: '#c734f6'
      },
      areaStyle: {
        color: '#c734f6'
      }
    },
    {
      name: 'RPC',
      type: 'line',
      stack: 'total',
      symbolSize: 0,
      data: chartData.performance.rpc,
      itemStyle: {
        color: '#06f39c'
      },
      areaStyle: {
        color: '#08ffee'
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

export default ChartProgramPerformance;
