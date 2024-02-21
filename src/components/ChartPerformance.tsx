import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

interface ChartPerformanceProps {
  chartData: {
    performance: {
      solana: [string, number][];
    }
  }
}

const ChartPerformance: React.FC<ChartPerformanceProps> = ({ chartData }) => {
  const option = {
    color: ['#09feee'],
    grid: {
      top: '5%',
      left: '3%',
      right: '3%',
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
    xAxis: {
      type: 'time',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#323334',
          type: 'dashed',
        },
      },
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
      barGap: '0%',
      barCategoryGap: '0%',
      type: 'bar',
      name: 'Solana Program',
      stack: 'total',
      data: chartData.performance.solana,
      itemStyle: {
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

export default ChartPerformance;
