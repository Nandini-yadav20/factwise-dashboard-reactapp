import { useState } from "react";
import { processedData } from "../Data/processedData";

// 📊 Rechart Imports
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function AnalyticsDashboard() {
  const [data] = useState(processedData);

  // Graph Data Transformations
  const performanceGraph = data.map(e => ({ name: e.firstName, rating: e.performanceRating }));
  const salaryGraph = data.map(e => ({ name: e.firstName, salary: e.salary }));
  const departmentCount = Object.values(
    data.reduce((acc, e) => ({ ...acc, [e.department]: (acc[e.department] || 0) + 1 }), {})
  ).map((count, i) => ({
    name: Object.keys(
      data.reduce((acc, e) => ({ ...acc, [e.department]: (acc[e.department] || 0) + 1 }), {})
    )[i],
    value: count
  }));
  const promotionGraph = data.map(e => ({ name: e.firstName, promotion: e.promotionScore }));

  // Insights (auto calculated KPIs)
  const avgPerformance = (data.reduce((a,b)=>a+b.performanceRating,0)/data.length).toFixed(2);
  const avgSalary = (data.reduce((a,b)=>a+b.salary,0)/data.length).toFixed(0);
  const topPerformer = data.reduce((a,b)=> a.performanceRating> b.performanceRating?a:b);
  const highValue = data.reduce((a,b)=> a.costEfficiency> b.costEfficiency?a:b);

  return (
    <div style={{ padding:"20px", background:"#0d1117", color:"#fff", minHeight:"100vh" }}>
      <h1 style={{ textAlign:"center", fontSize:"28px", marginBottom:"20px" }}>📈 Employee Analytics Dashboard</h1>

      {/*  🔥 INSIGHTS PANEL */}
      <div style={{
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"15px", marginBottom:"30px"
      }}>
        <InsightCard title="Avg Performance Rating" value={avgPerformance} />
        <InsightCard title="Average Salary" value={`₹${avgSalary}`} />
        <InsightCard title="Top Performer" value={`${topPerformer.firstName} (${topPerformer.performanceRating})`} />
        <InsightCard title="Best Cost Efficiency (ROI)" value={`${highValue.firstName} (${highValue.costEfficiency})`} />
      </div>

      {/* 📊 GRAPHS SECTION */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"30px" }}>

        {/* Performance Bar Chart */}
        <ChartCard title="Performance Rating Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
              <Bar dataKey="rating" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Salary Line Chart */}
        <ChartCard title="Salary Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
              <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Strength Pie */}
        <ChartCard title="Employees per Department">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={departmentCount} outerRadius={120} label>
                {departmentCount.map((_, index)=> <Cell key={index} fill={`hsl(${index*50},70%,50%)`} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Promotion Readiness */}
        <ChartCard title="Promotion Readiness Score">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={promotionGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
              <Line type="monotone" dataKey="promotion" stroke="#ffb347" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

// COMPONENTS

function InsightCard({ title, value }) {
  return (
    <div style={{
      background:"#161b22", padding:"20px", borderRadius:"10px",
      textAlign:"center", fontSize:"18px", boxShadow:"0 0 10px rgba(255,255,255,.1)"
    }}>
      <p style={{ margin:0, opacity:.8 }}>{title}</p>
      <h2 style={{ marginTop:"10px", fontSize:"26px", color:"#00eaff" }}>{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={{ background:"#161b22", padding:"20px", borderRadius:"12px" }}>
      <h3 style={{ marginBottom:"10px" }}>{title}</h3>
      {children}
    </div>
  );
}
