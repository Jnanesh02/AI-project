import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

const weeklyUserData = [
  { week: 1, users: 100 },
  { week: 2, users: 120 },
  { week: 3, users: 110 },
  { week: 4, users: 90 },
  { week: 5, users: 40 },
  { week: 6, users: 110 },
  // Add more weekly data here...
];

const webCostPlanData = [
  { plan: 'Basic', users: 50 },
  { plan: 'Standard', users: 100 },
  { plan: 'Premium', users: 75 },
  // Add more plan data here...
];

const calculateWeeklyChange = (data) => {
  const weeklyChangeData = [];
  for (let i = 1; i < data.length; i++) {
    const change = data[i].users - data[i - 1].users;
    weeklyChangeData.push({ week: data[i].week, change });
  }
  return weeklyChangeData;
};

const WeeklyUserChangeChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="change" stroke="#0d0d0d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const WebCostPlanChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="plan" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#333333" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const AdminHomePage = () => {
  const weeklyChangeData = calculateWeeklyChange(weeklyUserData);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Weekly User Change</h2>
          <WeeklyUserChangeChart data={weeklyChangeData} />
        </div>
        <div className="col">
          <h2>Web Cost Plan Details</h2>
          <WebCostPlanChart data={webCostPlanData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
