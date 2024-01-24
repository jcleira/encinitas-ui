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

  let i = 0;
  for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) {
    let load1 = 400;
    load1 += Math.random() * (100 - 50) + 5;

    if (i > 30) {
      load1 += Math.random() * (1000 - 50) + 50;
      load1 += i;
    }

    data1.push([time, load1]);
    data2.push([time, 50]);
    i++;
  }

  console.log(i);

  return [data1, data2];
}

  const [data1, data2] = generateHourlyDataForLastThreeDays();

  const option = {
    color: ['#09feee'],
    legend: {
      show: true,
      data: ['dApp', 'Program'],
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
      name: 'Program',
      type: 'bar',
      stack: 'total',
      data: data1,
      itemStyle: {
        color: '#09feee' // Color for series 1
      }
    },
    {
      name: 'dApp',
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
