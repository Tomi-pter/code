import React, { Component } from 'react';
import Chart from 'chart.js';

export default class BarChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'bar',
      options: {
        ...this.props.options,
      },
      data: {
        ...this.props.data,
      },
    });
  }
  render() {
    return (
      <div className='chart' style={{ width: '100%', height: '100%' }}>
        <canvas id='myChart' ref={this.chartRef} className='chart-canvas' />
      </div>
    );
  }
}
