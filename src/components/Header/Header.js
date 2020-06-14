import React from 'react';


const nameStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
}

const nameBlock = {
    marginLeft: '30px',
    marginRight: '50px'
}

class Header extends React.Component {
    
  render() {
    
    return (
        <div>
            <h1><strong>Correlation Analysis and Visualization of COVID-19</strong></h1>
            <a href={process.env.PUBLIC_URL + '/report.pdf'}>
                Correlation Analysis of Fatality Rate through COVID-19 Data Visualization [pdf] 
            </a> 

            <div style = {nameStyle}>
                
                <div style = {nameBlock}>
                    <ul><b>Yuho Jeong</b></ul>
                    <ul>yuho8437@unist.ac.kr</ul>
                    <ul>School of Mechanical, Aerospace and Nuclear Engineering</ul>
                    <ul>Ulsan, Republic of Korea</ul>
                </div>
                
                <div style = {nameBlock}>
                    <ul><b>Daehyeon Nam</b></ul>
                    <ul>ndh8392@unist.ac.kr</ul>
                    <ul>School of Electrical and Computing Engineering</ul>
                    <ul>Ulsan, Republic of Korea</ul>
                </div>
                
            </div>
        </div>
      );
  }
}

export default Header