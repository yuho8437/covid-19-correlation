/* Data load */
import A65 from '../data/A65.json';
import A70 from '../data/A70.json';
import BCG from '../data/BCG.json';
import CVD from '../data/CVD.json';
import DC from '../data/DC.json';
import FSM from '../data/FSM.json';
import GDP from '../data/GDP.json';
import HB from '../data/HB.json';
import HS from '../data/HS.json';
import HW from '../data/HW.json';
import MSM from '../data/MSM.json';
import ND from '../data/ND.json';
import PD from '../data/PD.json';
import SEX from '../data/SEX.json';

import iso from '../data/countryList.json';

/* Module load */
import React from 'react';
import Plot from 'react-plotly.js';
import './Point.css';
import 'antd/dist/antd.css';
import { Select, Button, Spin, Space } from 'antd';
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

  let highCountryList = [];
  let lowCountryList = [];
  let data = [];

  for(let i = 0; i < 3; i++){
    if(value[i] === 'A65')
      data[i] = A65;
    else if(value[i] === 'A70')
      data[i] = A70;
    else if(value[i] === 'BCG')
      data[i] = BCG;
    else if(value[i] === 'CVD')
      data[i] = CVD;
    else if(value[i] === 'DC')
      data[i] = DC;
    else if(value[i] === 'FSM')
      data[i] = FSM;
    else if(value[i] === 'GDP')
      data[i] = GDP;
    else if(value[i] === 'HB')
      data[i] = HB;
    else if(value[i] === 'HS')
      data[i] = HS;
    else if(value[i] === 'HW')
      data[i] = HW;
    else if(value[i] === 'MSM')
      data[i] = MSM;
    else if(value[i] === 'ND')
      data[i] = ND;
    else if(value[i] === 'PD')
      data[i] = PD;
    else if(value[i] === 'SEX')
      data[i] = SEX;
  }

  for (let i = 0; i < iso.iso.length; i++){
    if(Object.keys(data[0].low).includes(iso.iso[i])){
      if(Object.keys(data[1].low).includes(iso.iso[i])){
        if(Object.keys(data[2].low).includes(iso.iso[i])){
          lowCountryList.push(iso.iso[i]);
        }
      }
    }
  }

  for (let i = 0; i < iso.iso.length; i++){
    if(Object.keys(data[0].high).includes(iso.iso[i])){
      if(Object.keys(data[1].high).includes(iso.iso[i])){
        if(Object.keys(data[2].high).includes(iso.iso[i])){
          highCountryList.push(iso.iso[i]);
        }
      }
    }
  }

  return {high: highCountryList, low: lowCountryList};
}

function setData(value){

  let data;

  if(value === 'A65')
    data = A65;
  else if(value === 'A70')
    data = A70;
  else if(value === 'BCG')
    data = BCG;
  else if(value === 'CVD')
    data = CVD;
  else if(value === 'DC')
    data = DC;
  else if(value === 'FSM')
    data = FSM;
  else if(value === 'GDP')
    data = GDP;
  else if(value === 'HB')
    data = HB;
  else if(value === 'HS')
    data = HS;
  else if(value === 'HW')
    data = HW;
  else if(value === 'MSM')
    data = MSM;
  else if(value === 'ND')
    data = ND;
  else if(value === 'PD')
    data = PD;
  else if(value === 'SEX')
    data = SEX;

  return data;
}

class Point extends React.Component {

  componentWillMount(){

      return (
        <div>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      )
  }


  state = {is_clicked: false};

  loadXdata = (value, CountryList)=>{

    let data = setData(value);
    let highXdata = [];
    let lowXdata = [];

    for (let i = 0; i < CountryList.high.length; i++){
      highXdata[i] = data.high[CountryList.high[i]];
    }

    for (let i = 0; i < CountryList.low.length; i++){
      lowXdata[i] = data.low[CountryList.low[i]];
    }

    return {
      highXdata: highXdata,
      lowXdata: lowXdata
    }
  }
  
  loadYdata = (value, CountryList)=>{

    let data = setData(value);

    let highYdata = [];
    let lowYdata = [];

    for (let i = 0; i < CountryList.high.length; i++){
      highYdata[i] = data.high[CountryList.high[i]];
    }

    for (let i = 0; i < CountryList.low.length; i++){
      lowYdata[i] = data.low[CountryList.low[i]];
    }

    return{
      highYdata: highYdata,
      lowYdata: lowYdata,
    }
  }
  
  loadZdata = (value, CountryList)=>{

    let data = setData(value);

    let highZdata = [];
    let lowZdata = [];

    for (let i = 0; i < CountryList.high.length; i++){
      highZdata[i] = data.high[CountryList.high[i]];
    }

    for (let i = 0; i < CountryList.low.length; i++){
      lowZdata[i] = data.low[CountryList.low[i]];
    }

    return{
      highZdata: highZdata,
      lowZdata: lowZdata
    }
  }
  
  handleChange = (value) => {
    
    if(value.length === 3){
      let CountryList = getCountryList(value);
      console.log(CountryList);
      let Xdata = this.loadXdata(value[0], CountryList);
      let Ydata = this.loadYdata(value[1], CountryList);
      let Zdata = this.loadZdata(value[2], CountryList);
      
      this.setState({
        ...this.state,
        xaxis: value[0],
        yaxis: value[1],
        zaxis: value[2],
        highCountryList: CountryList.high,
        lowCountryList: CountryList.low,
        highXdata: Xdata.highXdata,
        lowXdata: Xdata.lowXdata,
        highYdata: Ydata.highYdata,
        lowYdata: Ydata.lowYdata,
        highZdata: Zdata.highZdata,
        lowZdata: Zdata.lowZdata
      })
    }

    else if(value.length > 3){
      alert("Please select factors under three.");
      value.pop()
    }
  }
  
  handleClick = (value) => {

    this.setState({
      ...this.state,
      is_clicked: true
    })

  }

  handleRefresh = (value) => {

    this.setState({
      ...this.state,
      is_clicked: false
    })

  }

  render() {

    const { xaxis, yaxis, zaxis,
            highCountryList, lowCountryList,
            highXdata, highYdata, highZdata, 
            lowXdata, lowYdata, lowZdata,
            is_clicked } = this.state;
    
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

            <h3 style = {{marginTop:'20px'}}>Check the answers</h3>
            <Button 
              style={{width:"200px"}}
              onClick={this.handleClick}
            >
              Correlation result >
            </Button>
            {
              (is_clicked)?
              <div>
                <h3 style = {{marginTop:'20px'}}>Back to scatter plot</h3>
                <Button 
                  style={{width:"195px"}}
                  type="primary"
                  onClick={this.handleRefresh}
                >
                  Refresh
                </Button>
              </div>:
              <div/>
            }
          </div>

          <div className = "PlotBox">
            {
              (is_clicked)?
                <div>
                  <img 
                    style = {{height: '480px'}}
                    src={process.env.PUBLIC_URL + '/corr_result.png'}
                  />
                </div>:
                <div>
                  <Plot
                    data={[
                      {
                        hovertext: highCountryList,
                        x: highXdata,
                        y: highYdata,
                        z: highZdata,
                        type: 'scatter3d',
                        mode: 'markers',
                        name: 'over 7.5% (CFR)',
                        marker: {
                          color: 'rgba(246, 71, 71, 1)',
                          size: 8,
                          line: { color: 'rgba(217, 217, 217, 0.14)', width: 0.5 },
                          opacity: 0.8
                        },
                      },
                      {
                        hovertext: lowCountryList,
                        x: lowXdata,
                        y: lowYdata,
                        z: lowZdata,
                        type: 'scatter3d',
                        mode: 'markers',
                        name: 'under 7.5% (CFR)',
                        marker: {
                          color: 'rgba(44, 130, 201, 1)',
                          size: 8,
                          line: { color: 'rgba(217, 217, 217, 0.14)', width: 0.5 },
                          opacity: 0.8
                        },
                    }
                    ]}
                    layout={{margin: {l: 0, r: 0, b: 0, t: 0 }}}
                  />
                </div>
            }
          </div>
        </div>

        {
          (is_clicked)?
          <div/>:
          <h3> x = {xaxis} &nbsp;&nbsp;&nbsp; y = {yaxis} &nbsp;&nbsp;&nbsp; z = {zaxis} </h3>
        }

      </div>
      );
  }
}

export default Point