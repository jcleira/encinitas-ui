import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ApdexChart: React.FC = () => {
  function generateApdexData() {
    const data = [];
    const now = new Date();
    const threeDaysAgoTimestamp = new Date().setDate(now.getDate() - 3);
    const threeDaysAgo = new Date(threeDaysAgoTimestamp);

    for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) {
      const apdexScore = Math.random() * (1 - 0.78) + 0.78;
      data.push([time, apdexScore]);
    }

    return data;
  }

  const data = generateApdexData();

  const option = {
    color: ['#0af29c'],
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
    },
    yAxis: {
      type: 'value',
      min: 0.78,
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
        data: data,
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
