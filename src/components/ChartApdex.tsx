import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

// ChartDataType is a type for the data that will be used in the chart. It will
// be parsed from the data fetched from the API.
type ChartDataType = {
  apdex: [string, number][];
};

const ApdexChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataType>({ apdex: [] });
  useEffect(() => {
    fetch('http://localhost:3001/metrics/query')
      .then(response => response.json())
      .then((data: ChartDataType) => {
        setChartData(data);
      })
      .catch(error => console.error("Failed to fetch data", error));
  }, []);

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
