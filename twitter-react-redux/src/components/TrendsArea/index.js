import React, { Component } from 'react'
import './trendsArea.css'

const trends = [
    'bagulhos',
    'bagulheiros',
    'boloDeMaracujá',
    'sucoDeMaracujá',
    'guerraMemeal',
    'BRWins'
];

class TrendsArea extends Component {
    render() {
        return (
            <div className="trendsArea">
                <h2 className="trendsArea__titulo widget__titulo">Trends Brasil</h2>
                <ol className="trendsArea__lista">
                    {trends.map((trendItem, index) => (
                        <li key={index}><a href="/">#{trendItem}</a></li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default TrendsArea