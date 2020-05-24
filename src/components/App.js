import React from 'react';
import './App.css';

import Point from './Point'

const App = () => {
    return (
        <div>
            <h1 style={{textDecoration: "underline"}}>Infomation visualization: alpha release</h1>
            <ul>Team name: UHO (unist health organization)</ul>
            <ul>Team members: 남대현 (ndh8392@unist.ac.kr), 정유호 (yuho8437@unist.ac.kr)</ul>
            <Point/>
        </div>
    )
}

export default App;