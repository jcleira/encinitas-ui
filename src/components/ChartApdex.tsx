import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

interface ChartApdexProps {
  chartData: {
    apdex: [string, number][];
  }
}

const ApdexChart: React.FC<ChartApdexProps> = ({ chartData }) => {
  const option = {
    color: ['#0af29c'],
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      show: true,
      data: ['Apdex Score'],
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
      min: 0,
      max: 1,
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
        type: 'bar',
        name: 'Apdex Score',
        data: chartData.apdex,
        markArea: {
          silent: true,
          data: [
            [{
              yAxis: 0.78,
              itemStyle: {
                color: 'rgba(177, 76, 237, 0.2)'
              }
            }, {
              yAxis: 0.85
            }],
            [{
              yAxis: 0.85,
              itemStyle: {
                color: 'rgba(9, 254, 238, 0.2)'
              }
            }, {
              yAxis: 1
            }]
          ]
        }
      }
    ],
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactECharts echarts={echarts} option={option} />
    </div>
  );
};

export default ApdexChart;
