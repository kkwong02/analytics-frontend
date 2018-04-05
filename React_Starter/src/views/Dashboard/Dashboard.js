import React, { Component } from 'react';
import ToolFrame from '../../components/Tools/'


class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
      <ToolFrame toolType='plot' />
      </div>
    )
  }
}

export default Dashboard;
