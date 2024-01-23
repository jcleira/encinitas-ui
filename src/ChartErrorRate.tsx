import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ChartErrorRate: React.FC = () => {
  function generateApdexData() {
    const data = [];
    const now = new Date();
    const threeDaysAgoTimestamp = new Date().setDate(now.getDate() - 3);
    const threeDaysAgo = new Date(threeDaysAgoTimestamp);

    let i = 0;
    for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) {
      let errorRate = 0.01;
      errorRate += Math.random() * (0.02 - 0.008) + 0.008;

      if (i > 30) {
        errorRate += Math.random() * (0.2 - 0.1) + 0.1;
      }

      data.push([time, errorRate]);
      i++;
    }

    return data;
  }

  const data = generateApdexData();

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
        data: data,
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
