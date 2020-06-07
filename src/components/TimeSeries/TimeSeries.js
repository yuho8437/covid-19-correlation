/* Data load */
import Daytime from '../../seriesData/daytime.json';
import Temperature from '../../seriesData/temperature.json';
import Humidity from '../../seriesData/humidity.json';
import Ozone from '../../seriesData/ozone.json';
import Windspeed from '../../seriesData/windspeed.json';
import Pressure from '../../seriesData/pressure.json';
import Precipitation from '../../seriesData/precipitation.json';
import UV from '../../seriesData/UV.json';

import fatalityDict from '../../seriesData/fatalityDict.json';

/* Module load */
import React from 'react';
import './TimeSeries.css';
import 'antd/dist/antd.css';
import Plot from 'react-plotly.js';
import { Select, Button, Slider } from 'antd';
const { Option } = Select;

const initialPlotStyle = {
  width: '533px',
  height: '450px',
  backgroundColor: 'rgb(240, 240, 240)',
  borderRadius: '1rem',
  margin: '0 0 0 0',
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  marginLeft: '20px'
}

const factorList = [
  <Option key={'Daytime'}>{'1. Daytime'}</Option>,
  <Option key={'Temperature (°F)'}>{'2. Temperature'}</Option>,
  <Option key={'Humidity'}>{'3. Humidity'}</Option>,
  <Option key={'Ozone concentration'}>{'4. Ozone concentration'}</Option>,
  <Option key={'Wind speed'}>{'5. Wind speed'}</Option>,
  <Option key={'Atmospheric pressure'}>{'6. Atmospheric pressure'}</Option>,
  <Option key={'Precipitation'}>{'7. Precipitation'}</Option>,
  <Option key={'UV Radiation'}>{'8. UV Radiation'}</Option>
]

function setData(value){

  let data;

  if(value === 'Daytime')
    data = Daytime;
  else if(value === 'Temperature (°F)')
    data = Temperature;
  else if(value === 'Humidity')
    data = Humidity;
  else if(value === 'Ozone concentration')
    data = Ozone;
  else if(value === 'Wind speed')
    data = Windspeed;
  else if(value === 'Atmospheric pressure')
    data = Pressure;
  else if(value === 'Precipitation')
    data = Precipitation;
  else if(value === 'UV Radiation')
    data = UV;

  return data;
};

function getMinValue(data) {
  return Object.keys(data)[0];
};

function getMaxValue(data){
  return Object.keys(data)[Object.keys(data).length - 1];
};

function getCountries(data, currentValue){

  let rows = data[currentValue];
  let currentCountryList = []

  for(let i = 0; i<Object.keys(rows).length; i++){
    if(!currentCountryList.includes(rows[i]['iso'])){
      currentCountryList.push(rows[i]['iso']);
    }
  }

  return currentCountryList;
};

function getDataZ(currentCountryList){

  let fatalityList = [];

  for (let i = 0; i < currentCountryList.length; i++){
    fatalityList[i] = fatalityDict[currentCountryList[i]];
  }

  return fatalityList;
};

function getDataText(data, currentCountryList, currentValue){
  
  let textList = [];
  let currentData = data[currentValue];
  let counter = 0;
  console.log(currentData);

  for (let i = 0; i < currentCountryList.length; i++){
    for(let j = 0; j < currentData.length; j++){
      if (currentData[j]['iso'] === currentCountryList[i]){
        if (textList[i]){
          textList[i] = textList[i] + '<br>' + 
            currentData[j]['date'] + ': ' + currentData[j]['fatality rate'];
        }
        else{
          textList[i] = '[Death/Confirmed] <br>' + currentData[j]['date'] + ': ' + currentData[j]['fatality rate'];
        }
        counter++;
      }

      if (counter > 19){
        textList[i] = textList[i] + '<br> ...too many'
        break;
      }
    }
    counter = 0;
  }

  return textList;
};

class TimeSeries extends React.Component {

    state = {
        data: [],
        selectedFactor: "None",
        minValue: 0, maxValue:100,
        is_clicked: false
    };

    formatter = (value) => {

      let currentValue = this.state.currentValue;
      let data = this.state.data;
      let result;
    
      if(data === Daytime){
        result = currentValue;
      }
      else if (data === Temperature || data === Humidity || data === Ozone || data === Windspeed || data === Pressure){
        currentValue = Number(currentValue);
        result = currentValue.toFixed(2);
      }
      else if (data === Precipitation){
        currentValue = Number(currentValue);
        result = currentValue.toFixed(4);
      }
    
      return `${result}`;
    }

    sliderChange = (value) => {
      if (Object.keys(this.state.data)[0]){
        let currentValue = Object.keys(this.state.data)[Math.round(value/2.5)];
        let currentCountryList = getCountries(this.state.data, currentValue);

        let dataLocations = currentCountryList;
        let dataZ = getDataZ(currentCountryList);
        let dataText = getDataText(this.state.data, currentCountryList, currentValue);

        this.setState({
          currentValue: currentValue,
          dataLocations: dataLocations, 
          dataZ: dataZ,
          dataText: dataText,
        })
      }
    };

    handleChange = (value) => {
    
        if(value.length === 1){

          let data = setData(value[0]);
          let minValue = getMinValue(data);
          let maxValue = getMaxValue(data);

          console.log(data);
          this.setState({
            ...this.state,
            data: data,
            minValue: minValue, maxValue: maxValue,
            selectedFactor: value[0],
          })
        }
    
        else if(value.length > 1){
          alert("Please select only one factor.");
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

    render(){

        const { 
            dataLocations, dataZ, dataText,
            selectedFactor,
            minValue, maxValue,
            is_clicked 
        } = this.state;

        return(
            <div>
                <div className = "TitleBox">
                    <h2>2. Time-series data type factors</h2>
                </div>

                <div className = "ContainerBox">

                  <div className = "SelectBox" style={{marginRight: '20px'}}>
                    <h3>Select one factor</h3>
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
                        <h3 style = {{marginTop:'20px'}}>Back to choropleth map</h3>
                        <Button 
                          style={{width:"200px"}}
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
                            style = {{height: '480px', marginLeft: '20px'}}
                            src={process.env.PUBLIC_URL + '/corr_result_ser.png'}
                          />
                        </div>:
                        (selectedFactor === 'None')?
                          <div>
                            <div style={initialPlotStyle}>
                              <h3>You didn't select factor yet.</h3>
                            </div>
                          </div>:
                          <Plot
                          data={[
                              {
                                  type: 'choropleth',
                                  locationmode: 'ISO-3',
                                  locations: dataLocations,
                                  z: dataZ,
                                  zmin: 0,
                                  zmax: 20,
                                  text: dataText,
                                  hoverinfo: "location+text",
                                  autocolorscale: true,
                                  marker: {
                                      line:{
                                          color: 'rgb(255,255,255)',
                                          width: 1
                                      }
                                  },
                                  colorbar: {
                                      autotic: false,
                                      tickprefix: '%',
                                      title: 'Fatality rate',
                                  }
                              }
                          ]}
                          layout={
                              {
                                  geo:{
                                      countrycolor: 'rgb(255, 255, 255)',
                                      showland: true,
                                      landcolor: 'rgb(230, 230, 230)',
                                      subunitcolor: 'rgb(255, 255, 255)',
                                      showcoastlines: false,
                                      showframe: false,
                                      lonaxis: {},
                                      lataxis: {},
                                      projection:{
                                          type: 'mercator'
                                      }
                                  },
                                  width: 650, height: 500, margin: {t: 0, b: 0, l: 0}
                              }
                          }
                          />
                    }
                  </div>
                  
                </div>

                <div className = "FooterBox">
                    {
                        (is_clicked)?
                            <div/>:
                            <div>
                                <Slider 
                                    style={{ width: '400px', margin: "20px auto"}}
                                    marks={{0: minValue, 100: maxValue}}
                                    tipFormatter={this.formatter}
                                    onChange={this.sliderChange}
                                />
                                <h3>[{selectedFactor}]</h3>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default TimeSeries;