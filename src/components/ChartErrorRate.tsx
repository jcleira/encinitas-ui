import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

interface ChartErrorProps {
  chartData: {
    errors: [string, number][];
  }
}

const ChartErrorRate: React.FC<ChartErrorProps> = ({ chartData }) => {
  const option = {
    color: ['#c734f6'],
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      show: true,
      data: ['Error Rate %'],
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
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#323334',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        type: 'line',
        name: 'Error Rate %',
        data: chartData.errors,
        smooth: true,
      }
    ],
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactECharts echarts={echarts} option={option} />
    </div>
  );
};

export default ChartErrorRate;
