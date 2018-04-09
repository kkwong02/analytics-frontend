import React, { Component } from 'react';
import ToolFrame from '../../components/Tools/'


class Dashboard extends Component {
  render() {
    let frames;
    if (this.props.toolFrames) {
      frames = this.props.toolFrames.map(frame => {
        return <ToolFrame key={frame.id} tool={frame}/>
      });
    }

    return (
      <div className="animated fadeIn">
      {frames}
      </div>
    )
  }
}

export default Dashboard;
