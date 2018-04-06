import React, { Component } from 'react';
import DataField from '../../components/Data/';

class Aside extends Component {
  render() {
    let fields;
    if (this.props.data.fields) {
      fields = this.props.data.fields.map(field => {
        return <DataField key={field} fieldName={field}/>
      });
    }

    return (
      <aside className="aside-menu">
        <div>
          {fields}
        </div>
      </aside>
    )
  }
}

export default Aside;
