import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ChartThroughput: React.FC = () => {
  function generateApdexData() {
    const data = [];
    const now = new Date();
    const threeDaysAgoTimestamp = new Date().setDate(now.getDate() - 3);
    const threeDaysAgo = new Date(threeDaysAgoTimestamp);

    let i = 0;
    for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) {
      let throughput = 20000;
      throughput += Math.random() * (1000 - 500) + 500;

      if (i > 30) {
        throughput += Math.random() * (10000 - 5000) + 5000;
      }

      data.push([time, throughput]);
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
      data: ['Request per second'],
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
      min: 15000,
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
        data: data,
        name: 'Request per second',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(199,52,246)'
            },
            {
              offset: 1,
              color: 'rgb(98,156,204)'
            }
          ])
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

export default ChartThroughput;
