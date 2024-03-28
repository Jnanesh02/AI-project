

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './CustomerGraph.css';

const data = [
  { name: 'Positive', value: 300, color: '#008000' },
  { name: 'Neutral', value: 200, color: '#696880' },
  { name: 'Negative', value: 200, color: '#FF0000' },
];

const CustomerGraph = () => {
  return (
    <div className="chart-wrapper ">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={50} // Adjusted innerRadius
              outerRadius={100}
              paddingAngle={0} // No padding angle
              fill="#ffffff"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend align="center" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
      </div>
      <button className='btn-btn-primary sent-anyl'> Sentiment Analysis </button>
    </div>
  );
};

export default CustomerGraph;
