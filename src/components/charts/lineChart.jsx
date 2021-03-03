import React, { Component } from 'react';
import Chart from 'chart.js';

export default class LineChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
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
      <div
        className='chart chart-append'
        style={{ width: '100%', height: '100%' }}
      >
        <canvas id='myChart' ref={this.chartRef} />
      </div>
    );
  }
}
