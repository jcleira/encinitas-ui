import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';

const ChartPerformance: React.FC = () => {
function generateHourlyDataForLastThreeDays() {
  const data1 = [];
  const data2 = [];
  const now = new Date();
  const threeDaysAgoTimestamp = new Date().setDate(now.getDate() - 3);
  const threeDaysAgo = new Date(threeDaysAgoTimestamp);

  for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) { // 3600000ms = 1 hour
    const loadTime1 = Math.random() * (1500 - 400) + 400; // Data for series 1
    const percentage = 0.10 + Math.random() * 0.30; // Random percentage between 10% to 20%
    const loadTime2 = loadTime1 * percentage; // Data for series 2 as a percentage of series 1

    data1.push([time, loadTime1]);
    data2.push([time, loadTime2]);
  }

  return [data1, data2];
}

  const [data1, data2] = generateHourlyDataForLastThreeDays();

  const option = {
    color: ['#09feee'],
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '3%',
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
          return new Date(value).toLocaleTimeString();
        }
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
      name: 'Series 1',
      type: 'bar',
      stack: 'total',
      data: data1,
      itemStyle: {
        color: '#09feee' // Color for series 1
      }
    },
    {
      name: 'Series 2',
      type: 'bar',
      stack: 'total',
      data: data2,
      itemStyle: {
        color: '#c262ed' // Color for series 2
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
