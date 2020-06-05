import React from 'react';
import './App.css';

import Point from './Point'
import TimeSeries from './TimeSeries'
import Header from './Header'

const App = () => {
    return (
        <div>
            <Header/>
            <Point/>
            <TimeSeries/>
        </div>
    )
}

export default App;