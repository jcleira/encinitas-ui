import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';

// ChartDataType is a type for the data that will be used in the chart. It will
// be parsed from the data fetched from the API.
type PerformanceData = {
  solana: [string, number][];
};

type ChartDataType = {
  performance: PerformanceData;
};

const ChartProgramPerformance: React.FC<{ programId: string | null }> = ({ programId }) => {
  const [chartData, setChartData] = useState<ChartDataType>({ performance: { solana: [] } });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!programId) return;

    setIsLoading(true);
    fetch(`https://api.encinitas.xyz/metrics/programs/query?program_id=${programId}`)
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
      data: ['Solana'],
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
