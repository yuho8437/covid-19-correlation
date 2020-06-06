/* Data load */
import TEST from '../data/TEST.json';

/* Module load */
import React from 'react';
import './TimeSeries.css';
import 'antd/dist/antd.css';
import Plot from 'react-plotly.js';
import { Select, Button, Slider } from 'antd';
const { Option } = Select;

const factorList = [
  <Option key={'UV Radaition'}>{'1. UV Radaition'}</Option>,
  <Option key={'Temperature'}>{'2. Temperature'}</Option>,
  <Option key={'Humidity'}>{'3. Humidity'}</Option>,
  <Option key={'Ozone concentration'}>{'4. Ozone concentration'}</Option>
]

function unpack(rows, key) {

    console.log(rows);

    return rows.map(
        function(row) { 
            console.log(row);
            return row[key]; 
        }
    );
}

class TimeSeries extends React.Component {

    state = {
        selectedFactor: "None",
        minValue: 0, maxValue:100,
        is_clicked: false
    };

    handleChange = (value) => {
    
        if(value.length === 1){
          this.setState({
            ...this.state,
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
                            src={process.env.PUBLIC_URL + '/corr_result_ser.png'}
                          />
                        </div>:
                        <Plot
                        data={[
                            {
                                type: 'choropleth',
                                locationmode: 'ISO-3',
                                locations: unpack(TEST, 'location'),
                                z: unpack(TEST, 'value'),
                                text: unpack(TEST, 'text'),
                                hoverinfo: "location+text",
                                autocolorscale: true,
                                marker: {
                                    line:{
                                        color: 'rgb(255,255,255)',
                                        width: 1
                                    }
                                },
                                showscale: false,
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