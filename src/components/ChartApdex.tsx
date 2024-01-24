import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ApdexChart: React.FC = () => {
  function generateApdexData() {
    const data = [];
    const now = new Date();
    const threeDaysAgoTimestamp = new Date().setDate(now.getDate() - 3);
    const threeDaysAgo = new Date(threeDaysAgoTimestamp);

    let i = 0;
    for (let time = threeDaysAgo; time <= now; time = new Date(time.getTime() + 3600000)) {
      let apdexScore = 1;
      apdexScore -= Math.random() * (0.02 - 0.008) + 0.008;

      if (i > 30) {
        apdexScore -= Math.random() * (0.2 - 0.1) + 0.1;
      }

      data.push([time, apdexScore]);
      i++;
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
        name: 'Apdex Score',
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
