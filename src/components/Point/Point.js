import React from 'react';
import Plot from 'react-plotly.js';
import './Point.css';
import 'antd/dist/antd.css';

import { Select } from 'antd';
const { Option } = Select;

const factorList = [
  <Option key={'PD'}>{'1. Population density'}</Option>,
  <Option key={'GDP'}>{'2. GDP per capita'}</Option>,
  <Option key={'CVD'}>{'3. Cardiovascular death rate'}</Option>,
  <Option key={'HW'}>{'4. Handwashing facilities'}</Option>,
  <Option key={'HB'}>{'5. Hospital beds'}</Option>,
  <Option key={'ND'}>{'6. Doctors total'}</Option>,
  <Option key={'DC'}>{'7. Doctor consultations'}</Option>,
  <Option key={'HS'}>{'8. Health spending'}</Option>,
  <Option key={'SEX'}>{'9. Gender ratio (confirmed)'}</Option>,
  <Option key={'BCG'}>{'10. BCG'}</Option>,
  <Option key={'AIR'}>{'11. Air pollution'}</Option>,
  <Option key={'A65'}>{'12. Age over 65'}</Option>,
  <Option key={'A70'}>{'13. Age over 70'}</Option>,
  <Option key={'FSM'}>{'14. Female smokers'}</Option>,
  <Option key={'MSM'}>{'15. Male smokers '}</Option>,
]

function getCountryList(value){

  let CountryList = [];


  return CountryList
}

class Point extends React.Component {

  state = {
    Xdata: [0],
    Ydata: [0],
    Zdata: [0]
  };

  loadXdata = ()=>{
    this.setState({
      ...this.state,
      Xdata: []
    })
  }
  
  loadYdata = ()=>{
    this.setState({
      ...this.state,
      Ydata: []
    })
  }
  
  loadZdata = ()=>{
    this.setState({
      ...this.state,
      Zdata: []
    })
  }
  
  handleChange = (value) => {
    if(value.length === 3){
      getCountryList(value);
    }
    else if(value.length > 3){
      alert("Please select factors under three.");
      value.pop()
    }
  }

  render() {

    const { Xdata, Ydata, Zdata } = this.state;
    
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
              onChange={this.handleChange}
            >
              {factorList}
            </Select>
          </div>

          <div className = "PlotBox">
            <Plot
              data={[
                {
                    x: Xdata,
                    y: Ydata,
                    z: Zdata,
                    type: 'scatter3d',
                    mode: 'markers',
                    marker: {
                      size: 8,
                      line: { color: 'rgba(217, 217, 217, 0.14)', width: 0.5 },
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