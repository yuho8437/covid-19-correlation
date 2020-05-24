import React from 'react';
import Plot from 'react-plotly.js';
import './Point.css';
import 'antd/dist/antd.css';

import { Select } from 'antd';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{"factor: " + i.toString(36)}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

class Point extends React.Component {
  render() {
    
    return (
      <div style = {{marginTop: "50px"}}>

        <div className = "TitleBox">
          <h2>1. Point data type factors</h2>
        </div>

        <div className = "ContainerBox">

          <div className = "SelectBox">
            <h3>Select the three factors</h3>
            <Select
              style={{width:"200px"}}
              mode="multiple"
              placeholder="Please select"
              defaultValue={[ ]}
              onChange={handleChange}
            >
              {children}
            </Select>
          </div>

          <div className = "PlotBox">
            <Plot
              data={[
                {
                    x: [1, 2, 1.5, 1.3],
                    y: [2, 2, 1, 2.5],
                    z: [1, 2, 2, 1.5],
                    type: 'scatter3d',
                    mode: 'markers',
                    marker: {
                      size: 8,
                      line: {
                      color: 'rgba(217, 217, 217, 0.14)',
                      width: 0.5},
                      opacity: 0.8
                    },
                }, 
                {
                  x: [3.5, 3, 3, 2.5],
                  y: [3, 4, 4, 2.5],
                  z: [3, 3.5, 3, 3.5],
                  type: 'scatter3d',
                  mode: 'markers',
                  marker: {
                    size: 8,
                    line: {
                    color: 'rgb(204, 204, 204)',
                    width: 0.5},
                    opacity: 0.8
                  },
              }
              ]}
              layout={{margin: {l: 0, r: 0, b: 0, t: 0 }}}
            />
          </div>
        </div>
      </div>
      );
  }
}

export default Point