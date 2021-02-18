import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => (
  <div id="chart">
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: "Bitcoin Price",
          fontSize: 20
        },
        legend: {
          display: false,
          position: "right"
        },
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: "month"
            }
          }]
        }
      }}
    />
  </div>
)

export default Chart;