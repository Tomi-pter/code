import React, { Component } from 'react';
import Chart from 'chart.js';

export default class DoughnutChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        ...this.props.data,
      },
      options: {
        ...this.props.options,
      },
    });
  }

  render() {
    return (
      <>
        <div className='chart chart-append'>
          <canvas
            id='myChart'
            ref={this.chartRef}
            className='chart-canvas'
            data-toggle='legend'
            data-target='#trafficChartLegend'
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className='chart-legend' id='trafficChartLegend'></div>
      </>
    );
  }
}
